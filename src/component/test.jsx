// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Circle, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix for default marker icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// // Haversine distance function to calculate distance between two coordinates
// const haversineDistance = (coords1, coords2) => {
//     const toRad = (x) => x * Math.PI / 180;
//     const R = 6371e3; // Earth radius in meters

//     const lat1 = coords1[0];
//     const lon1 = coords1[1];
//     const lat2 = coords2[0];
//     const lon2 = coords2[1];

//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
// };

// // Function to check if a patient's location is within a cluster's radius
// const isWithinCluster = (patientCoords, clusterCenter, clusterRadius) => {
//     const distance = haversineDistance(patientCoords, clusterCenter);
//     return distance <= clusterRadius;
// };

// const TestFunc = () => {
//     const [selectedDot, setSelectedDot] = useState(null);
//     const lat = 1.3521;
//     const lng = 103.8198;

//     // Example data structure
//     const patientData = [
//         { id: 1, position: [1.3521, 103.8198], visits: [[1.3621, 103.8198], [1.3721, 103.8198]] },
//         { id: 2, position: [1.3621, 103.8298], visits: [[1.3521, 103.8198], [1.3821, 103.8198]] }
//     ];

//     const hotspots = [
//         { id: 1, center: [1.3521, 103.8198], radius: 400 },
//         { id: 2, center: [1.3621, 103.8298], radius: 400 }
//     ];

//     // Function to handle marker click
//     const handleMarkerClick = (id) => {
//         setSelectedDot(id);
//     };

//     // Function to handle hotspot click
//     const handleHotspotClick = (id) => {
//         setSelectedDot(null);
//     };

//     // Logging data for debugging
//     console.log("Patient Data:", patientData);
//     console.log("Hotspots:", hotspots);

//     return (
//         <MapContainer center={[lat, lng]} zoom={13} style={{ width: '100%', height: '600px', margin: 'auto' }}>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />

//             {patientData.map(patient => (
//                 <Marker key={patient.id} position={patient.position} eventHandlers={{ click: () => handleMarkerClick(patient.id) }}>
//                     {console.log("Marker position for patient:", patient.position)}
//                     {selectedDot === patient.id && patient.visits.map((visit, index) => (
//                         <Polyline key={index} positions={[patient.position, visit]} color='black' />
//                     ))}
//                 </Marker>
//             ))}

//             {hotspots.map(hotspot => (
//                 <Circle
//                     key={hotspot.id}
//                     center={hotspot.center}
//                     radius={hotspot.radius}
//                     color="red"
//                     fillColor="red"
//                     fillOpacity={0.3}
//                     eventHandlers={{ click: () => handleHotspotClick(hotspot.id) }}
//                 />
//             ))}

//             {hotspots.map(hotspot => (
//                 patientData.map(patient => (
//                     isWithinCluster(patient.position, hotspot.center, hotspot.radius) && 
//                     <Polyline key={`connection-${patient.id}-${hotspot.id}`} positions={[patient.position, hotspot.center]} color='blue' />
//                 ))
//             ))}
//         </MapContainer>
//     );
// };

// export default TestFunc;
