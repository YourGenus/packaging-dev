export default function Body({ params }) {
  const { diameter, height, neckDiameter, neckHeight, color } = params

  const radius = diameter / 2
  const neckRadius = neckDiameter / 2

  const totalHeight = height + neckHeight

  return (
    <group position={[0, -totalHeight / 2, 0]}>
      {/* Main body */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, height + neckHeight / 2, 0]}>
        <cylinderGeometry args={[neckRadius, neckRadius, neckHeight]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}