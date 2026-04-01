import Shell from "./parts/Shell"
import Body from "./parts/Body"
import Cap from "./parts/Cap"
import Pump from "./parts/Pump"

import { PRODUCT_CATEGORIES } from "../data/productCategories"

const PART_COMPONENTS = {
  shell: Shell,
  "insert-body": Body,
  "insert-cartridge": Body, // placeholder
  "insert-dispenser": Pump,
  cap: Cap
}

export default function ProductModel({ category, params }) {
  const parts = PRODUCT_CATEGORIES[category].parts

  return (
    <group>
      {parts.map((partId) => {
        const Part = PART_COMPONENTS[partId]
        if (!Part) return null
        return <Part key={partId} params={params[partId]} />
      })}
    </group>
  )
}