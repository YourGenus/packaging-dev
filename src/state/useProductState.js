import { useState } from 'react'
import { PRODUCT_CATEGORIES } from '../data/productCategories'
import { GENRE_STYLES } from '../data/genreStyles'
import { VERSION_PARAMS } from '../data/versionParams'
import { BASE_PARAMS } from '../data/baseParams'

export function useProductState() {
  const [category, setCategory] = useState('Cleanser')
  const [genre, setGenre] = useState('CITIZEN')
  const [version, setVersion] = useState('standard')

  const params = buildParams(category, genre, version)

  return {
    category,
    genre,
    version,
    params,
    setCategory,
    setGenre,
    setVersion
  }
}

function buildParams(category, genre, version) {
  const categoryDef = PRODUCT_CATEGORIES[category]
  if (!categoryDef) {
    console.error("❌ ERROR: Category not found:", category)
    return {}
  }

  const base = BASE_PARAMS[category]
  const genreStyle = GENRE_STYLES[genre]
  const versionMods = VERSION_PARAMS[version]

  const result = {}

  for (const part of categoryDef.parts) {
    result[part] = {
      ...base[part],
      ...(versionMods[part] || {}),
      ...(genreStyle[part] || {})
    }
  }

  return result
}