import { PRODUCT_CATEGORIES } from "../data/productCategories"
import Body from "./parts/Body"
import Pump from "./parts/Pump"
import Cap from "./parts/Cap"
import Shell from "./parts/Shell"

export default function ProductModel({ category, params }) {
  const body = params.body
  const pump = params.pump
  const cap = params.cap
  const shell = params.shell

  // Heights
  const shellTop = shell.height
  const bodyTop = shellTop + body.height + body.neckHeight
  const pumpTop = bodyTop + pump.height
  const capTop = pumpTop + cap.height

  // Total height for centering
  const totalHeight = capTop

  return (
    <group position={[0, -totalHeight / 2, 0]}>

      {/* Shell (bottom part) */}
      <group position={[0, shell.height / 2, 0]}>
        <Shell params={shell} />
      </group>

      {/* Body sits on top of shell */}
      <group position={[0, shellTop + body.height / 2, 0]}>
        <Body params={body} />
      </group>

      {/* Pump sits on top of body + neck */}
      <group position={[0, bodyTop + pump.height / 2, 0]}>
        <Pump params={pump} />
      </group>

      {/* Cap sits on top of pump */}
      <group position={[0, pumpTop + cap.height / 2, 0]}>
        <Cap params={cap} />
      </group>

    </group>
  )
}