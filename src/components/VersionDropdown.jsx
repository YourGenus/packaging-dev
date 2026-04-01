import { VERSION_PARAMS } from "../data/versionParams"

export default function VersionDropdown({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>Version:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(VERSION_PARAMS).map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
    </div>
  )
}