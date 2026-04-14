import { useEffect, useRef } from "react"
import Body from "./parts/Body"
import Pump from "./parts/Pump"
import Cap from "./parts/Cap"
import Shell from "./parts/Shell"

export default function ProductModel({ category, params }) {
  const group = useRef()

  const shell = params.shell
  const body = params.body
  const pump = params.pump
  const cap = params.cap

  const bodyTotal = body.height + body.neckHeight
  const shellTop = shell.height
  const bodyTop = shellTop + bodyTotal
  const pumpTop = bodyTop + pump.height
  const capTop = pumpTop + cap.height

  // Enable shadows on all meshes
  useEffect(() => {
    group.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [])

  return (
    <group ref={group} position={[0, 0, 0]}>
      <group position={[0, shell.height / 2, 0]}>
        <Shell params={shell} />
      </group>

      <group position={[0, shellTop + bodyTotal / 2, 0]}>
        <Body params={body} />
      </group>

      <group position={[0, bodyTop + pump.height / 2, 0]}>
        <Pump params={pump} />
      </group>

      <group position={[0, pumpTop + cap.height / 2, 0]}>
        <Cap params={cap} />
      </group>
    </group>
  )
}