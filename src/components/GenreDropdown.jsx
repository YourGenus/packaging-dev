import { GENRE_STYLES } from "../data/genreStyles"

export default function GenreDropdown({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>Genre:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(GENRE_STYLES).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}