import Canvas3D from "./components/Canvas3D"
import GenreDropdown from "./components/GenreDropdown"
import VersionDropdown from "./components/VersionDropdown"
import { useProductState } from "./state/useProductState"

export default function App() {
  const {
    category,
    genre,
    version,
    params,
    setGenre,
    setVersion
  } = useProductState()

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Controls */}
      <div style={{ padding: "1rem", background: "#f5f5f5", display: "flex", gap: "1rem" }}>
        <GenreDropdown value={genre} onChange={setGenre} />
        <VersionDropdown value={version} onChange={setVersion} />
      </div>

      {/* 3D Viewer */}
      <div style={{ flex: 1 }}>
        <Canvas3D category={category} params={params} />
      </div>
    </div>
  )
}