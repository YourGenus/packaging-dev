// src/components/Canvas3D.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import ProductModel from './ProductModel'

export default function Canvas3D({ category, params }) {
  return (
    <Canvas
      camera={{ position: [0, 40, 80], fov: 35 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />

      <ProductModel category={category} params={params} />

      <OrbitControls enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  )
}