import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import ProductModel from "./ProductModel"

export default function Canvas3D({ category, params }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 600], fov: 20 }}
      shadows
    >
      {/* Ambient fill */}
      <ambientLight intensity={0.4} />

      {/* Key light from the left */}
      <directionalLight
        position={[-100, 150, 200]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim/fill light */}
      <directionalLight
        position={[100, 50, 100]}
        intensity={0.5}
      />

      {/* Ground shadow plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -200, 0]}
        receiveShadow
      >
        <planeGeometry args={[2000, 2000]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <ProductModel category={category} params={params} />

      <OrbitControls target={[0, 0, 0]} />

      <Environment preset="city" />
    </Canvas>
  )
}