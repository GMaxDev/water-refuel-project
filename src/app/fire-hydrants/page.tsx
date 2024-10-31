"use client"

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Define types for our fire hydrants
interface FireHydrant {
  id: number
  name: string
  lat: number
  lng: number
}

// List of fire hydrants (example data for Lyon)
const fireHydrants: FireHydrant[] = [
  { id: 1, name: "Hydrant 1", lat: 45.7640, lng: 4.8357 },
  { id: 2, name: "Hydrant 2", lat: 45.7680, lng: 4.8320 },
  { id: 3, name: "Hydrant 3", lat: 45.7620, lng: 4.8390 },
  { id: 4, name: "Hydrant 4", lat: 45.7600, lng: 4.8400 },
  { id: 5, name: "Hydrant 5", lat: 45.7660, lng: 4.8370 },
  { id: 6, name: "Hydrant 6", lat: 45.7630, lng: 4.8410 },
  { id: 7, name: "Hydrant 7", lat: 45.7610, lng: 4.8330 },
  { id: 8, name: "Hydrant 8", lat: 45.7650, lng: 4.8340 },
  { id: 9, name: "Hydrant 9", lat: 45.7670, lng: 4.8380 },
  { id: 10, name: "Hydrant 10", lat: 45.7690, lng: 4.8360 },
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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Fire Hydrants List</h2>
        <ul>
          {fireHydrants.map((hydrant) => (
            <li
              key={hydrant.id}
              className={`cursor-pointer p-2 mb-2 rounded ${selectedHydrant?.id === hydrant.id ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
              onClick={() => handleHydrantClick(hydrant)}
            >
              <h3 className="font-semibold">{hydrant.name}</h3>
              <p className="text-sm text-gray-600">Lat: {hydrant.lat}, Lng: {hydrant.lng}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-2/3 h-[50vh] md:h-full">
        <MapContainer center={[45.7640, 4.8357]} zoom={14} style={{ height: '100%', width: '100%' }}>
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
                <h3>{hydrant.name}</h3>
                <p>Latitude: {hydrant.lat}</p>
                <p>Longitude: {hydrant.lng}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
