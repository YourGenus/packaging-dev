import Canvas3D from "./components/Canvas3D"
import { useProductState } from "./state/useProductState"

export default function App() {
  const { category, params } = useProductState()

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas3D category={category} params={params} />
    </div>
  )
}