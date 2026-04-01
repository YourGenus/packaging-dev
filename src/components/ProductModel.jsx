import Body from "./parts/Body"
import Pump from "./parts/Pump"
import Cap from "./parts/Cap"
import Shell from "./parts/Shell"

export default function ProductModel({ category, params }) {
  const shell = params.shell
  const body = params.body
  const pump = params.pump
  const cap = params.cap

  // Total heights
  const bodyTotal = body.height + body.neckHeight

  // Stack positions
  const shellTop = shell.height
  const bodyTop = shellTop + bodyTotal
  const pumpTop = bodyTop + pump.height
  const capTop = pumpTop + cap.height

  // Centering
  const totalHeight = capTop

  return (
    <group position={[0, -totalHeight / 2, 0]}>

      {/* Shell */}
      <group position={[0, shell.height / 2, 0]}>
        <Shell params={shell} />
      </group>

      {/* Body */}
      <group position={[0, shellTop + bodyTotal / 2, 0]}>
        <Body params={body} />
      </group>

      {/* Pump */}
      <group position={[0, bodyTop + pump.height / 2, 0]}>
        <Pump params={pump} />
      </group>

      {/* Cap */}
      <group position={[0, pumpTop + cap.height / 2, 0]}>
        <Cap params={cap} />
      </group>

    </group>
  )
}