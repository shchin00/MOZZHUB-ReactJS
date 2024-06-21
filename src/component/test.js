import React, { useState } from 'react';
import { Map, TileLayer, Circle, Polyline } from 'react-leaflet';
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
    const [clickedPatient, setClickedPatient] = useState(null); // State to track clicked patient
    const lat = 1.3521; // Default latitude for map center
    const lng = 103.8198; // Default longitude for map center

    // Patient data with unique locations for each patient's position and visits
    const patientData = [
        { id: 1, position: [1.3521, 103.8198], visits: [[1.3601, 103.8198], [1.3701, 103.8198]] },
        { id: 2, position: [1.3621, 103.8298], visits: [[1.3521, 103.8298], [1.3821, 103.8298]] },
        { id: 3, position: [1.3721, 103.8398], visits: [[1.3621, 103.8398], [1.3521, 103.8398]] },
        { id: 4, position: [1.3821, 103.8498], visits: [[1.3721, 103.8498], [1.3621, 103.8498]] },
        { id: 5, position: [1.3921, 103.8598], visits: [[1.3821, 103.8598], [1.3721, 103.8598]] }
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

    // Function to handle patient location click
    const handlePatientClick = (id) => {
        setClickedPatient(id === clickedPatient ? null : id); // Toggle the clicked patient ID
    };

    // Find the data for the selected hotspot
    const selectedHotspotData = hotspots.find(hotspot => hotspot.id === selectedHotspot);

    return (
        <Map center={[lat, lng]} zoom={13} style={{ width: '100%', height: '680px', margin: 'auto' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Display all patient locations */}
            {patientData.map(patient => (
                <Circle
                    key={patient.id}
                    center={patient.position}
                    radius={50} // Adjust radius for Circle (radius in meters)
                    color="#FFA500"
                    fillColor="#FFA500"
                    fillOpacity={1}
                    onClick={() => handlePatientClick(patient.id)} // Using onClick directly
                />
            ))}

            {/* Display all visited locations */}
            {patientData.map(patient =>
                patient.visits.map((visit, index) => (
                    <Circle
                        key={`visit-${patient.id}-${index}`}
                        center={visit}
                        radius={50} // Adjust radius for Circle (radius in meters)
                        color="blue"
                        fillColor="blue"
                        fillOpacity={1}
                    />
                ))
            )}

            {/* Display polylines between the clicked patient's location and their visited locations */}
            {patientData.map(patient => (
                patient.id === clickedPatient && (
                    patient.visits.map((visit, index) => (
                        <Polyline
                            key={`line-${patient.id}-${index}`}
                            positions={[patient.position, visit]}
                            color="black"
                        />
                    ))
                )
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
                    onClick={() => handleHotspotClick(hotspot.id)} // Using onClick directly
                />
            ))}

            {/* Highlight patient and visited locations within the selected hotspot's radius */}
            {selectedHotspotData && (
                <>
                    {patientData.map(patient => (
                        isWithinCluster(patient.position, selectedHotspotData.center, selectedHotspotData.radius) && (
                            <Circle
                                key={`highlight-patient-${patient.id}`}
                                center={patient.position}
                                radius={50} // Adjust radius for Circle (radius in meters)
                                color="yellow"
                                fillColor="yellow"
                                fillOpacity={1}
                                onClick={() => handlePatientClick(patient.id)}
                            />
                        )
                    ))}

                    {patientData.map(patient =>
                        patient.visits.map((visit, index) => (
                            isWithinCluster(visit, selectedHotspotData.center, selectedHotspotData.radius) && (
                                <Circle
                                    key={`highlight-visit-${patient.id}-${index}`}
                                    center={visit}
                                    radius={50} // Adjust radius for Circle (radius in meters)
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
