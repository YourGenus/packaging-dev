import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import ProductModel from "./ProductModel"

export default function Canvas3D({ category, params }) {
  return (
    <Canvas camera={{ position: [0, 120, 180], fov: 30 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />

      <ProductModel category={category} params={params} />

      <OrbitControls target={[0, 0, 0]} />

      <Environment preset="city" />
    </Canvas>
  )
}