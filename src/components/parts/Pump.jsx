export default function Pump({ params }) {
  const { diameter, height, color } = params
  const radius = diameter / 2

  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}