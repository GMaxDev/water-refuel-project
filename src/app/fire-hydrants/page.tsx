import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet'

export default function DashboardPage() {
  return (
    <div className="fire-hydrants">
      <p>fire-hydrants</p>
      <MapContainer center={[45.686947, 5.320453]} zoom={13}>

      </MapContainer>
    </div>
  )
}
