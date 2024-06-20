// import React, { useState } from 'react';
// import { Map, TileLayer, Marker, Circle, Polyline } from 'react-leaflet';
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
//     const withinCluster = distance <= clusterRadius;
//     console.log(`Patient at ${patientCoords} is ${withinCluster ? "within" : "not within"} the cluster (distance: ${distance.toFixed(2)} meters)`);
//     return withinCluster;
// };

// // Custom icons for patient locations (black circles)
// const patientIcon = new L.DivIcon({
//     html: `<div style="background-color: #000000; width: 10px; height: 10px; border-radius: 50%;"></div>`,
//     className: '',
//     iconSize: [10, 10]
// });

// // Custom icon for visited locations (blue circles)
// const visitIcon = new L.DivIcon({
//     html: `<div style="background-color: #0000FF; width: 10px; height: 10px; border-radius: 50%;"></div>`,
//     className: '',
//     iconSize: [10, 10]
// });

// // Custom icon for visited locations within hotspot (red circles)
// const hotspotVisitIcon = new L.DivIcon({
//     html: `<div style="background-color: #FF0000; width: 10px; height: 10px; border-radius: 50%;"></div>`,
//     className: '',
//     iconSize: [10, 10]
// });

// const TestFunc = () => {
//     const [selectedDot, setSelectedDot] = useState(null);
//     const [selectedHotspot, setSelectedHotspot] = useState(null);
//     const lat = 1.3521;
//     const lng = 103.8198;

//     // Updated patient data structure with more locations
//     const patientData = [
//         { id: 1, position: [1.3521, 103.8198], visits: [[1.3621, 103.8198], [1.3721, 103.8198]] },
//         // { id: 2, position: [1.3621, 103.8298], visits: [[1.3521, 103.8198], [1.3821, 103.8198]] },
//         // { id: 3, position: [1.3721, 103.8398], visits: [[1.3621, 103.8298], [1.3521, 103.8198]] },
//         // { id: 4, position: [1.3821, 103.8498], visits: [[1.3721, 103.8398], [1.3621, 103.8298]] },
//         // { id: 5, position: [1.3921, 103.8598], visits: [[1.3821, 103.8498], [1.3721, 103.8398]] }
//     ];

//     const hotspots = [
//         { id: 1, center: [1.3521, 103.8198], radius: 400 },
//         { id: 2, center: [1.3621, 103.8298], radius: 400 },
//         { id: 3, center: [1.3721, 103.8398], radius: 400 }
//     ];

//     // Function to handle marker click
//     const handleMarkerClick = (id) => {
//         setSelectedDot(id);
//     };

//     // Function to handle hotspot click
//     const handleHotspotClick = (id) => {
//         setSelectedDot(null);
//         setSelectedHotspot(id);

//         const hotspotData = hotspots.find(hotspot => hotspot.id === id);
//         if (hotspotData) {
//             console.log(`Hotspot ${id} selected`);
//             patientData.forEach(patient => {
//                 const isPatientWithinCluster = isWithinCluster(patient.position, hotspotData.center, hotspotData.radius);
//                 if (isPatientWithinCluster) {
//                     console.log(`Patient ${patient.id} is within the cluster at ${hotspotData.center}`);
//                 }
//                 patient.visits.forEach((visit, index) => {
//                     const isVisitWithinCluster = isWithinCluster(visit, hotspotData.center, hotspotData.radius);
//                     if (isVisitWithinCluster) {
//                         console.log(`Patient ${patient.id}'s visit ${index + 1} at ${visit} is within the cluster at ${hotspotData.center}`);
//                     }
//                 });
//             });
//         }
//     };

//     const selectedHotspotData = hotspots.find(hotspot => hotspot.id === selectedHotspot);

//     return (
//         <Map center={[lat, lng]} zoom={13} style={{ width: '100%', height: '600px', margin: 'auto' }}>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />

//             {patientData.map(patient => (
//                 <Marker key={patient.id} position={patient.position} icon={patientIcon} eventHandlers={{ click: () => handleMarkerClick(patient.id) }}>
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

//             {selectedHotspotData && (
//                 <>
//                     {patientData.map(patient => (
//                         isWithinCluster(patient.position, selectedHotspotData.center, selectedHotspotData.radius) && 
//                         <Marker key={`patient-${patient.id}`} position={patient.position} icon={patientIcon} />
//                     ))}

//                     {patientData.map(patient => (
//                         patient.visits.map((visit, index) => (
//                             isWithinCluster(visit, selectedHotspotData.center, selectedHotspotData.radius) && 
//                             <Marker key={`visit-${patient.id}-${index}`} position={visit} icon={visitIcon} />
//                         ))
//                     ))}
//                 </>
//             )}

//             {hotspots.map(hotspot => (
//                 patientData.map(patient => (
//                     isWithinCluster(patient.position, hotspot.center, hotspot.radius) && 
//                     <Polyline key={`connection-${patient.id}-${hotspot.id}`} positions={[patient.position, hotspot.center]} color='blue' />
//                 ))
//             ))}
//         </Map>
//     );
// };

// export default TestFunc;
import React, { useState } from 'react';
import { Map, TileLayer, Circle, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Haversine distance function to calculate distance between two coordinates
const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => x * Math.PI / 180; // Convert degrees to radians
    const R = 6371e3; // Earth radius in meters

    const lat1 = coords1[0];
    const lon1 = coords1[1];
    const lat2 = coords2[0];
    const lon2 = coords2[1];

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Return distance in meters
};

// Function to check if a patient's location is within a cluster's radius
const isWithinCluster = (coords1, coords2, radius) => {
    const distance = haversineDistance(coords1, coords2);
    console.log(`Distance between ${coords1} and ${coords2}: ${distance} meters`);
    return distance <= radius;
};

const TestFunc = () => {
    const [selectedHotspot, setSelectedHotspot] = useState(null); // State to track selected hotspot
    const lat = 1.3521; // Default latitude for map center
    const lng = 103.8198; // Default longitude for map center

    // Updated patient data structure with one patient location inside a cluster and their visits outside the cluster
    const patientData = [
        { id: 1, position: [1.3521, 103.8198], visits: [[1.3621, 103.8198], [1.3721, 103.8198]] },
        { id: 2, position: [1.3621, 103.8298], visits: [[1.3521, 103.8198], [1.3821, 103.8198]] },
        { id: 3, position: [1.3521, 103.8198], visits: [[1.3421, 103.8098], [1.3321, 103.7998]] }, // Patient within the cluster
        { id: 4, position: [1.3821, 103.8498], visits: [[1.3721, 103.8398], [1.3621, 103.8298]] },
        { id: 5, position: [1.3921, 103.8598], visits: [[1.3821, 103.8498], [1.3721, 103.8398]] }
    ];

    // Hotspot data with center coordinates and radius
    const hotspots = [
        { id: 1, center: [1.3521, 103.8198], radius: 400 },
        { id: 2, center: [1.3621, 103.8298], radius: 400 },
        { id: 3, center: [1.3721, 103.8398], radius: 400 }
    ];

    // Function to handle hotspot click
    const handleHotspotClick = (id) => {
        setSelectedHotspot(id); // Set the selected hotspot ID
    };

    // Find the data for the selected hotspot
    const selectedHotspotData = hotspots.find(hotspot => hotspot.id === selectedHotspot);

    return (
        <Map center={[lat, lng]} zoom={13} style={{ width: '100%', height: '600px', margin: 'auto' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Display all patient locations */}
            {patientData.map(patient => (
                <CircleMarker
                    key={patient.id}
                    center={patient.position}
                    radius={5}
                    color="black"
                    fillColor="black"
                    fillOpacity={1}
                />
            ))}

            {/* Display all visited locations */}
            {patientData.map(patient =>
                patient.visits.map((visit, index) => (
                    <CircleMarker
                        key={`visit-${patient.id}-${index}`}
                        center={visit}
                        radius={5}
                        color="#0000FF"
                        fillColor="#0000FF"
                        fillOpacity={1}
                    />
                ))
            )}

            {/* Display all polylines between patient locations and their visited locations */}
            {patientData.map(patient => (
                patient.visits.map((visit, index) => (
                    <Polyline key={`line-${patient.id}-${index}`} positions={[patient.position, visit]} color='black' />
                ))
            ))}

            {/* Display all hotspot circles */}
            {hotspots.map(hotspot => (
                <Circle
                    key={hotspot.id}
                    center={hotspot.center}
                    radius={hotspot.radius}
                    color="red"
                    fillColor="red"
                    fillOpacity={0.3}
                    eventHandlers={{ click: () => handleHotspotClick(hotspot.id) }}
                />
            ))}

            {/* Highlight patient and visited locations within the selected hotspot's radius */}
            {selectedHotspotData && (
                <>
                    {patientData.map(patient => (
                        isWithinCluster(patient.position, selectedHotspotData.center, selectedHotspotData.radius) && (
                            <CircleMarker
                                key={`highlight-patient-${patient.id}`}
                                center={patient.position}
                                radius={5}
                                color="yellow"
                                fillColor="yellow"
                                fillOpacity={1}
                            />
                        )
                    ))}

                    {patientData.map(patient =>
                        patient.visits.map((visit, index) => (
                            isWithinCluster(visit, selectedHotspotData.center, selectedHotspotData.radius) && (
                                <CircleMarker
                                    key={`highlight-visit-${patient.id}-${index}`}
                                    center={visit}
                                    radius={5}
                                    color="orange"
                                    fillColor="orange"
                                    fillOpacity={1}
                                />
                            )
                        ))
                    )}
                </>
            )}
        </Map>
    );
};

export default TestFunc;
