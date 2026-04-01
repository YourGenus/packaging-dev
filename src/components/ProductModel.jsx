import { PRODUCT_CATEGORIES } from "../data/productCategories"
import Body from "./parts/Body"
import Pump from "./parts/Pump"
import Cap from "./parts/Cap"
import Shell from "./parts/Shell"

export default function ProductModel({ category, params }) {
  const parts = PRODUCT_CATEGORIES[category].parts

  const body = params.body
  const pump = params.pump
  const cap = params.cap

  // Compute heights
  const bodyTotal = body.height + body.neckHeight
  const pumpTop = bodyTotal + pump.height
  const capTop = pumpTop + cap.height

  // Compute total height for centering
  const totalHeight = capTop

  return (
    <group position={[0, -totalHeight / 2, 0]}>
      {/* Body */}
      <Body params={body} />

      {/* Pump */}
      <group position={[0, bodyTotal + pump.height / 2, 0]}>
        <Pump params={pump} />
      </group>

      {/* Cap */}
      <group position={[0, pumpTop + cap.height / 2, 0]}>
        <Cap params={cap} />
      </group>
    </group>
  )
}