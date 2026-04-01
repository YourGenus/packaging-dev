export default function Cap({ params }) {
  const { diameter, height, offset, color } = params
  const radius = diameter / 2

  return (
    <mesh position={[0, offset + height / 2, 0]}>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}