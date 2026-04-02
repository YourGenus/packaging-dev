import * as THREE from "three"

export default function Cap({ params }) {
  const {
    diameter,
    height,
    color,
    topFillet = 2,
    bottomFillet = 2
  } = params

  const radius = diameter / 2
  const h2 = height / 2

  const pts = []

  //
  // BOTTOM OUTER FILLET (convex, tangent to bottom + wall)
  //
  {
    const cx = radius - bottomFillet
    const cy = -h2 + bottomFillet

    // Sweep from bottom → wall (270° → 360°)
    for (let i = 0; i <= 16; i++) {
      const t = (i / 16) * (Math.PI / 2) // 0 → 90
      const angle = (3 * Math.PI) / 2 + t // 270 → 360
      const x = cx + Math.cos(angle) * bottomFillet
      const y = cy + Math.sin(angle) * bottomFillet
      pts.push(new THREE.Vector2(x, y))
    }
  }

  //
  // STRAIGHT WALL
  //
  pts.push(new THREE.Vector2(radius, h2 - topFillet))

  //
  // TOP ROUNDED CORNER (quarter circle, tangent to side + top)
  //
  {
    const cx = radius - topFillet
    const cy = h2 - topFillet

    // from side → top center
    for (let i = 0; i <= 16; i++) {
      const t = (i / 16) * (Math.PI / 2) // 0 → 90°
      const x = cx + Math.cos(t) * topFillet
      const y = cy + Math.sin(t) * topFillet
      pts.push(new THREE.Vector2(x, y))
    }
  }

  //
  // *** ADD: top center point to close top ***
  //
  pts.push(new THREE.Vector2(0, h2))


  const geometry = new THREE.LatheGeometry(pts, 64)

  return (
    <mesh castShadow geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.6}
      />
    </mesh>
  )
}