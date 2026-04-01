// src/components/parts/Shell.jsx

export default function Shell({ params }) {
  const { radius, height, color } = params

  return (
    <mesh position={[0, height / 2, 0]}>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}