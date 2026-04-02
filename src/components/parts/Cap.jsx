export default function Cap({ params }) {
  const { diameter, height, color } = params
  const radius = diameter / 2

  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}     // high metalness = metal
        roughness={0.6}     // higher roughness = satin finish
      />
    </mesh>
  )
}