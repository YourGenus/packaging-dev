// src/components/parts/Body.jsx
import { useMemo } from 'react'

export default function Body({ params }) {
  const { diameter, height, neckDiameter, neckHeight, color } = params

  const radius = diameter / 2
  const neckRadius = neckDiameter / 2

  return (
    <group>
      {/* Neck */}
      <mesh position={[0, height / 2 - neckHeight / 2, 0]}>
        <cylinderGeometry args={[neckRadius, neckRadius, neckHeight]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Main Body */}
      <mesh position={[0, (height - neckHeight) / 2 - height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height - neckHeight]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}
