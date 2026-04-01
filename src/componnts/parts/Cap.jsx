// src/components/parts/Cap.jsx
export default function Cap({ params }) {
  const { diameter, height, color, offset } = params
  const radius = diameter / 2

  return (
    <mesh position={[0, offset + height / 2, 0]}>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}