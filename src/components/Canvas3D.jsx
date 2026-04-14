import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import ProductModel from "./ProductModel"

export default function Canvas3D({ category, params }) {
  return (
    <Canvas
      camera={{ position: [0, 40, 960], fov: 16 }}
      shadows
    >
      {/* Global ambient fill */}
      <ambientLight intensity={0.6} />

      {/* Main key light */}
      <directionalLight
        position={[-200, 40, 200]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-normalBias={0.2}
      />


      {/* Rim light */}
      <directionalLight
        position={[-200, 150, -200]}
        intensity={0.3}
      />

      {/* Soft contact shadow under product */}
      <ContactShadows
        position={[-2, 0, 1]}
        opacity={0.2}
        width={40}
        height={40}
        blur={3}
        far={500}
      />

      {/* Curved cyclorama background */}
      <mesh position={[0, -200, -800]} receiveShadow>
        <sphereGeometry args={[2000, 64, 64]} />
        <meshStandardMaterial
          color="#eeeeee"
          side={THREE.BackSide}
        />
      </mesh>

      {/* Your product */}
      <ProductModel category={category} params={params} />

      <OrbitControls target={[0, 0, 0]} />

      {/* Studio HDRI */}
      <Environment preset="studio" environmentIntensity={0.5} />
    </Canvas>
  )
}