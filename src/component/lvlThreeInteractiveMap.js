import React, { useState } from 'react';
import { Map, TileLayer, Circle, Polyline, Tooltip } from 'react-leaflet';
import MenuBar from './MenuBar';
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

const LvlThreeInteractiveMap = ({lat1,lng1,ranking=[], height}) => {
    const [selectedHotspot, setSelectedHotspot] = useState(null); // State to track selected hotspot
    const [clickedPatient, setClickedPatient] = useState(null); // State to track clicked patient
    const lat = 1.472967; // Default latitude for map center
    const lng = 110.429711; // Default longitude for map center

    // Patient data with unique locations for each patient's position and visits
    const patientData = [
        { id: 1, position: [1.46492, 110.427], visits: [[1.46553, 110.433], [40.4429, -79.885], [3.21622, 101.729], [1.46843, 110.428], [ 1.46816, 110.429], [47.882, 106.852], [1.46149, 110.451]] },
        { id: 2, position: [1.3621, 103.8298], visits: [[1.3521, 103.8298], [1.3821, 103.8298]] },
        { id: 3, position: [1.3721, 103.8398], visits: [[1.3621, 103.8398], [1.3521, 103.8398]] },
        { id: 4, position: [1.3821, 103.8498], visits: [[1.3721, 103.8498], [1.3621, 103.8498]] },
        { id: 5, position: [1.3921, 103.8598], visits: [[1.3821, 103.8598], [1.3721, 103.8598]] },
        { id: 6, position: [1.361388, 103.830701], visits: [[1.3721, 103.8498], [1.3621, 103.8498]]},
        {id: 7, position: [1.466374, 110.426093], visits: [[1.458614, 110.423143], [1.455406, 110.427726]]},
        // {id: 8, position: [1.466258, 110.429779], visits: [[1.460552, 110.419952], [1.460595, 110.450893]]},
        // {id: 9, position: [1.465743, 110.413600], visits: [[1.454375, 110.408794], [1.455276, 110.413686]]},
        // {id: 10, position: [1.472951, 110.419780], visits: [[1.468360, 110.427848], [1.480544, 110.414973]]},
        // {id: 11, position: [1.452573, 110.431195], visits: [[1.455361, 110.445229], [1.454632, 110.459348]]},
        // {id: 12, position: [1.467717, 110.435701], visits: [[1.468189, 110.443641], [1.461368, 110.436002]]},
        // {id: 13, position: [1.472222, 110.429693], visits: [[1.479697, 110.425349], [1.472265, 110.415786], [1.513441, 110.388858]]}
    ];

    // Hotspot data with center coordinates, radius, and ranking
    const hotspots = [
        { id: 1, center: [1.46553, 110.433], radius: 400, ranking: 0.2 },
        { id: 2, center: [1.46843, 110.428], radius: 400, ranking: 0.5 },
        { id: 3, center: [1.46149, 110.451], radius: 400, ranking: 0.8 },
        {id: 4, center: [1.46492, 110.427], radius: 400, ranking: 0.5},
        {id: 5, center: [1.45292, 110.457], radius: 400, ranking: 0.3},
        // {id: 6, center: [1.466315, 110.428255], radius: 400, ranking: 0.8},
        // {id: 7, center: [1.453455, 110.431043], radius: 400, ranking: 0.1}
    ];

    // Function to handle hotspot click
    const handleHotspotClick = (id) => {
        setSelectedHotspot(id); // Set the selected hotspot ID
        setClickedPatient(null);
    };

    // Function to handle patient location click
    const handlePatientClick = (id) => {
        setClickedPatient(id === clickedPatient ? null : id); // Toggle the clicked patient ID
    };

    // Find the data for the selected hotspot
    const selectedHotspotData = hotspots.find(hotspot => hotspot.id === selectedHotspot);

    // Find the patients within the selected hotspot
    const patientsInSelectedHotspot = selectedHotspotData ? patientData.filter(patient =>
        isWithinCluster(patient.position, selectedHotspotData.center, selectedHotspotData.radius)
    ) : [];

    console.log(ranking)

    return (
    <div>
    <MenuBar style={{margin: '0px 0px 0px'}}/>
        <Map center={[lat, lng]} zoom={13} style={{ width: '100%', height: '630px', margin: 'auto' }}>
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

            {/* Display polylines between each patient's location and their visited locations */}
            {patientData.map(patient => (
                patient.visits.map((visit, index) => (
                    // Conditionally render polylines if patient is clicked or within selected hotspot
                    (patient.id === clickedPatient || (selectedHotspot && patientsInSelectedHotspot.some(p => p.id === patient.id))) && (
                        <Polyline
                            key={`line-${patient.id}-${index}`}
                            positions={[patient.position, visit]}
                            color="black"
                        />
                    )
                ))
            ))}

                {/* Display all hotspot circles with rankings
                {ranking.map((hotspot, i) => {
                const l = (0.9 - (hotspot.ranking) * 0.9) * 255;
                const h = (0.9 - (hotspot.ranking) * 0.9) * 240;
                const a = (hotspot.ranking) * 0.9;
                const rgb = `rgb(255,${l},${l})`; // Convert ranking to RGB color
                return (
                    <Circle
                        key={hotspot.id}
                        center={{lat:ranking[i].lat, lng:ranking[i].lng}}
                        radius={400}
                        color='red'
                        fillColor={rgb}
                        fillOpacity={a}
                        onClick={() => handleHotspotClick(hotspot.id)} // Using onClick directly
                    >
                        <Tooltip><h3>Ranking: #{i + 1}</h3></Tooltip>
                    </Circle>
                );
            })} */}
                
                {hotspots.map((hotspot, i) => {
                const l = (0.9 - (hotspot.ranking) * 0.9) * 255;
                const h = (0.9 - (hotspot.ranking) * 0.9) * 240;
                const a = (hotspot.ranking) * 0.9;
                const rgb = `rgb(255,${l},${l})`; // Convert ranking to RGB color
                return (
                    <Circle
                        key={hotspot.id}
                        center={hotspot.center}
                        radius={400}
                        color='red'
                        fillColor={rgb}
                        fillOpacity={a}
                        onClick={() => handleHotspotClick(hotspot.id)} // Using onClick directly
                    >
                        <Tooltip><h3>Ranking: #{i + 1}</h3></Tooltip>
                    </Circle>
                );
            })}

            {/* Display all hotspot circles with rankings */}
            {ranking.map((hotspot, i) => {
                const l = (0.9 - (ranking[i].ranking) * 0.9) * 255;
              //  const h = (0.9 - (ranking[i].ranking) * 0.9) * 240;
                const a = (ranking[i].ranking) * 0.9;
             // const hsl = `hsl(${h}, 100%, 50%)`; // Convert ranking to HSL color
                var rgb = "rgb(255,"+l+","+l+")" // Convert ranking to RGB color
                return (
                    <Circle
                        key={hotspot.id}
                        center={{lat:ranking[i].lat, lng:ranking[i].lng}}
                        radius={400}
                        color='red'
                        fillColor={rgb}
                        fillOpacity={a}
                        onClick={() => handleHotspotClick(hotspot.id)} // Using onClick directly
                    >
                        <Tooltip><h3>Ranking: #{i + 1}</h3></Tooltip>
                    </Circle>
                );
            })}

            {/* Highlight patient and visited locations within the selected hotspot's radius */}
            {selectedHotspotData && (
                <>
                    {patientsInSelectedHotspot.map(patient => (
                        <Circle
                            key={`highlight-patient-${patient.id}`}
                            center={patient.position}
                            radius={50} // Adjust radius for Circle (radius in meters)
                            color="orange"
                            fillColor="orange"
                            fillOpacity={1}
                            onClick={() => handlePatientClick(patient.id)}
                        />
                    ))}

                    {patientsInSelectedHotspot.map(patient =>
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
        </div>
    );
};

export default LvlThreeInteractiveMap;

