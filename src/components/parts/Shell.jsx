export default function Shell({ params }) {
  const { diameter, height, color } = params
  const radius = diameter / 2

  return (
    <mesh castShadow>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.6}
      />
    </mesh>
  )
}