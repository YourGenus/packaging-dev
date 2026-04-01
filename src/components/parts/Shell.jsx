// src/components/parts/Shell.jsx

export default function Shell({ params }) {
  const { diameter, height, color } = params
  const radius = diameter / 2

  return (
    <mesh position={[0, height / 2, 0]}>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}