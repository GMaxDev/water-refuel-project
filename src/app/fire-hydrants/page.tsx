"use client"

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Define types for our fire hydrants
type FireHydrant = {
  id: number
  name: string
  lat: number
  lng: number
}

// List of fire hydrants (example data for Trept)
const fireHydrants: FireHydrant[] = [
  { id: 1, name: "Hydrant 1", lat: 45.68701, lng: 5.32058 },
  { id: 2, name: "Hydrant 2", lat: 45.68801, lng: 5.32158 },
  { id: 3, name: "Hydrant 3", lat: 45.68601, lng: 5.31958 },
  { id: 4, name: "Hydrant 4", lat: 45.68901, lng: 5.32258 },
  { id: 5, name: "Hydrant 5", lat: 45.68501, lng: 5.32358 },
  { id: 6, name: "Hydrant 6", lat: 45.68751, lng: 5.31858 },
  { id: 7, name: "Hydrant 7", lat: 45.68651, lng: 5.32458 },
  { id: 8, name: "Hydrant 8", lat: 45.69001, lng: 5.32058 },
  { id: 9, name: "Hydrant 9", lat: 45.68551, lng: 5.31758 },
  { id: 10, name: "Hydrant 10", lat: 45.68851, lng: 5.32558 },
]

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Icon for selected marker
const selectedIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function FireHydrantsMap() {
  const [selectedHydrant, setSelectedHydrant] = useState<FireHydrant | null>(null)

  const handleHydrantClick = (hydrant: FireHydrant) => {
    setSelectedHydrant(hydrant)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-white">Fire Hydrants List - Trept, France</h2>
        <ul>
          {fireHydrants.map((hydrant) => (
            <li
              key={hydrant.id}
              className={`cursor-pointer p-2 mb-2 rounded ${selectedHydrant?.id === hydrant.id ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleHydrantClick(hydrant)}
            >
              <h3 className="font-semibold text-white">{hydrant.name}</h3>
              <p className="text-sm text-gray-300">Lat: {hydrant.lat}, Lng: {hydrant.lng}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-2/3 h-[50vh] md:h-full">
        <MapContainer center={[45.68701957793472, 5.3205829858407805]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {fireHydrants.map((hydrant) => (
            <Marker
              key={hydrant.id}
              position={[hydrant.lat, hydrant.lng]}
              icon={selectedHydrant?.id === hydrant.id ? selectedIcon : customIcon}
            >
              <Popup>
                <div className="text-gray-900">
                  <h3 className="font-semibold">{hydrant.name}</h3>
                  <p>Latitude: {hydrant.lat}</p>
                  <p>Longitude: {hydrant.lng}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
