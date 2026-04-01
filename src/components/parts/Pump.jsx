export default function Pump({ params }) {
  const { diameter, height, color } = params
  const radius = diameter / 2

  return (
    <group position={[0, -height / 2, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}