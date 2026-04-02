import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import shieldIcon from "@/assets/shield-icon.png";
import worldMapImg from "@/assets/world_map_india.png";

const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  // Calibration offsets to match the world_map_india.png texture projection
  const calibratedLat = lat - 10; 
  const calibratedLon = lon - 110;

  const phi = (90 - calibratedLat) * (Math.PI / 180);
  const theta = (calibratedLon) * (Math.PI / 180);

  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return [x, y, z] as [number, number, number];
};

const Globe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const worldTexture = useTexture(worldMapImg);

  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const locations = useMemo(() => [
    { lat: 28.61, lon: 77.21, label: "Delhi" },
    { lat: 19.07, lon: 72.87, label: "Mumbai" },
    { lat: 22.57, lon: 88.36, label: "Kolkata" },
    { lat: 12.97, lon: 77.59, label: "Bangalore" },
    { lat: 13.08, lon: 80.27, label: "Chennai" },
    { lat: 17.38, lon: 78.48, label: "Hyderabad" },
    { lat: 23.02, lon: 72.57, label: "Ahmedabad" },
    { lat: 26.91, lon: 75.78, label: "Jaipur" },
    { lat: 26.84, lon: 80.94, label: "Lucknow" },
    { lat: 25.59, lon: 85.13, label: "Patna" },
    { lat: 20.29, lon: 85.82, label: "Bhubaneswar" },
    { lat: 23.25, lon: 77.41, label: "Bhopal" },
    { lat: 21.25, lon: 81.62, label: "Raipur" },
    { lat: 23.34, lon: 85.30, label: "Ranchi" },
    { lat: 30.73, lon: 76.77, label: "Chandigarh" },
    { lat: 34.08, lon: 74.79, label: "Srinagar" },
    { lat: 27.08, lon: 93.60, label: "Itanagar" },
    { lat: 26.14, lon: 91.78, label: "Dispur" },
    { lat: 15.49, lon: 73.82, label: "Panaji" },
    { lat: 31.10, lon: 77.17, label: "Shimla" },
    { lat: 24.81, lon: 93.93, label: "Imphal" },
    { lat: 25.57, lon: 91.89, label: "Shillong" },
    { lat: 23.72, lon: 92.71, label: "Aizawl" },
    { lat: 25.67, lon: 94.1, label: "Kohima" },
    { lat: 27.33, lon: 88.61, label: "Gangtok" },
    { lat: 23.83, lon: 91.28, label: "Agartala" },
    { lat: 30.31, lon: 78.03, label: "Dehradun" },
    { lat: 16.5, lon: 80.64, label: "Amaravati" },
    { lat: 8.52, lon: 76.93, label: "Trivandrum" },
  ], []).map(loc => ({ ...loc, pos: latLongToVector3(loc.lat, loc.lon, 2.8) }));

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <group rotation={[0, -Math.PI / 1.5, 0]}>
        {/* Main Sphere */}
        <Sphere args={[2.8, 64, 64]} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial
            map={worldTexture}
            color="#f8fafc"
            roughness={0.6}
            metalness={0.2}
            emissive="#94a3b8"
            emissiveIntensity={0.25}
          />
        </Sphere>

        {/* Location Shields */}
        {locations.map((loc, i) => (
          <group key={i} position={loc.pos}>
            <Html distanceFactor={10} occlude>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <Shield className="w-2.5 h-2.5 text-[#d4af37] fill-[#d4af37]/40 drop-shadow-gold group-hover:scale-125 transition-transform" />
                <span className="text-[6px] md:text-[7px] font-display text-white/90 uppercase tracking-tighter bg-black/60 px-1 py-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {loc.label}
                </span>
              </motion.div>
            </Html>
          </group>
        ))}
      </group>

      {/* Atmospheric Glow */}
      <Sphere args={[2.82, 64, 64]}>
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {hovered && (
        <Html center distanceFactor={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center pointer-events-none"
          >
            <img src={shieldIcon} alt="Guardian Orbit" className="w-16 h-16 drop-shadow-lg" />
            <span className="font-display text-xs uppercase tracking-widest text-primary mt-2 whitespace-nowrap bg-background/95 px-6 py-2 rounded-full border border-primary/20 shadow-2xl backdrop-blur-md">
              National Security Network
            </span>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

const GlobeSection = () => {
  return (
    <section id="coverage" className="relative py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground">
            Pan-India <span className="text-gradient-gold">Coverage</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
            Hover over our interactive globe to see our nationwide security network.
            Each <Shield className="inline w-4 h-4 text-primary" /> represents a regional security hub.
          </p>
        </motion.div>

        <div className="h-[500px] md:h-[600px] w-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={2} color="#3b82f6" />
            <Suspense fallback={null}>
              <Globe />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { num: "95%", label: "Residential Security" },
            { num: "85%", label: "Industrial Security" },
            { num: "75%", label: "Female Security" },
            { num: "65%", label: "Personal Security" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card border border-border rounded-sm"
            >
              <div className="font-display text-3xl md:text-4xl text-primary">{stat.num}</div>
              <div className="text-sm text-muted-foreground mt-2 font-body uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;
