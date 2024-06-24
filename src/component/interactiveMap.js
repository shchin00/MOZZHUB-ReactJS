// import React, {useState} from 'react';
// import { Map, TileLayer, Tooltip, Circle, Polyline } from 'react-leaflet';
// import { Button } from 'semantic-ui-react';

// const dummyRanking = [
//     { lat: 1.462251, lng:  110.413307, ranking: 0.8 }, // London
//     { lat: 1.468643, lng: 110.428541, ranking: 0.6 }, // New York
//     { lat:  1.472410, lng: 110.420440, ranking: 0.4 }, // Los Angeles
//     // { lat: 41.8781, lng: -87.6298, ranking: 0.5 }, // Chicago
//     // { lat: 37.7749, lng: -122.4194, ranking: 0.7 } // San Francisco
// ];

// // const url = "http://mozzhub.fcsit.unimas.my/mozzhubAPI/mobMapData/T1369";

// // async function fetchData() {
// //     try {
// //         const response = await fetch(url);
// //         if (!response.ok) {
// //             throw new Error('Network response was not ok ' + response.statusText);
// //         }
// //         const data = await response.json();

// //         data.forEach(item => {
// //             console.log(`Case ID: ${item.Case_id}, Latitude: ${item.lat}, Longitude: ${item.lng}`);
// //         });
// //     } catch (error) {
// //         console.error('There was a problem with the fetch operation:', error);
// //     }
// // }

// // fetchData();


// const interactiveMap = () => {
//     const lat = 1.462251; // Initial map center latitude
//     const lng = 110.413307; // Initial map center longitude

//     const[hideLine, setHideLine] = useState(false)

//     const handleClick = ()=>{
//         setHideLine(!hideLine);
//     }

//     const controlPoints = []; // Array to store control points for curves

//     // Calculate control points
//     for (let i = 0; i < dummyRanking.length - 1; i++) {
//         const p1 = [dummyRanking[i].lat, dummyRanking[i].lng];
//         const p2 = [dummyRanking[i + 1].lat, dummyRanking[i + 1].lng];

//         const controlPoint = [
//             (p1[0] + p2[0]) / 2, // Midpoint of latitudes
//             (p1[1] + p2[1]) / 2, // Midpoint of longitudes
//         ];

//         controlPoints.push(controlPoint);
//     }

//     return (
//         <div>
//         <Map center={[lat, lng]} zoom={13} style={{ width: '100%', height: '620px', margin: 'auto' }}>
//             <TileLayer
//                 attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 maxZoom={16}
//                 minZoom={2}
//             />
//             {dummyRanking.map((elem, i) => {
//                 var l = (0.9 - dummyRanking[i].ranking * 0.9) * 255;
//                 var h = (0.9 - dummyRanking[i].ranking * 0.9) * 240;
//                 var a = dummyRanking[i].ranking * 0.9;
//                 var rgb = "rgb(255," + l + "," + l + ")";
//                 return (
//                     <Circle
//                         key={i}
//                         center={{ lat: dummyRanking[i].lat, lng: dummyRanking[i].lng }}
//                         color='red' 
//                         fillColor={rgb}
//                         fillOpacity={a}
//                         radius={50}
//                         onClick={handleClick}
//                         >
//                         <Tooltip><h3>Ranking:#{i + 1}</h3></Tooltip>
//                     </Circle>
//                 )
//             })}
//             {/* Render curved lines between circles */}
//             {!hideLine && dummyRanking.length > 1 && controlPoints.map((controlPoint, i) => (
//                 <Polyline
//                     key={i}
//                     positions={[
//                         [dummyRanking[i].lat, dummyRanking[i].lng], // Start point
//                         controlPoint, // Control point
//                         [dummyRanking[i + 1].lat, dummyRanking[i + 1].lng], // End point
//                     ]}
//                     color="blue"
//                 />
//             ))}
//         </Map>
//         <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
//         <div style={{margin: "2px", border: "2px solid black"}}>
//                 <p style={{margin: "2px"}}>Map Legend:</p>
//                 <p style={{margin: "2px"}}>Circle: Data points</p>
//                 <p style={{margin: "2px"}}>Polyline: Connections</p>
//             </div>
//             <div style={{position: "absolute", right: "10px"}}>
//         <Button style={{marginTop: "10px"}}>Close</Button>
//         </div>
//             </div>
//         </div>
//     )
// }

// export default interactiveMap;

import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import { Map, TileLayer, Tooltip, Circle, Polyline } from 'react-leaflet';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const InteractiveMap = (props) => {
    const initialLat = 1.462251; // Fallback latitude
    const initialLng = 110.413307; // Fallback longitude

    const [hideLine, setHideLine] = useState(false);
    const [data, setData] = useState([]);
    const [mapCenter, setMapCenter] = useState([initialLat, initialLng]);

    const { case_id } = (props.location && props.location.state) || {};

    useEffect(() => {
        const url = `http://mozzhub.fcsit.unimas.my/mozzhubAPI/mobMapData/${case_id}`;

        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setData(data);
                if (data.length > 0) {
                    setMapCenter([data[0].lat, data[0].lng]);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        fetchData();
    }, [case_id]);

    console.log(case_id, "Testing")

    const handleClick = () => {
        setHideLine(!hideLine);
    }

    const handleCloseButton = () => {
        props.history.push('/record');
    }

    return (
        <div style={{ backgroundColor: '', width: '100%' }}>
            <MenuBar />
            <div>
                <Map center={mapCenter} zoom={15} style={{ width: '100%', height: '580px', zIndex: '0' }}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={16}
                        minZoom={2}
                    />
                    {data.map((elem, i) => {
                        const isResidentialLocation = i === 0;
                        const circleColor = isResidentialLocation ? '#FFA500' : 'blue';
                        return (
                            <Circle
                                key={i}
                                center={{ lat: data[i].lat, lng: data[i].lng }}
                                color={circleColor}
                                fillColor={circleColor}
                                fillOpacity='1.0'
                                radius={30}
                                onClick={handleClick}
                            >
                                <Tooltip style={{ maxWidth: "150px", wordWrap: "break-word" }}>
                                    <h3>Case ID: {data[i].Case_id}</h3>
                                    <p>Location: {data[i].Location}</p>
                                </Tooltip>
                            </Circle>
                        );
                    })}
                    {!hideLine && data.length > 1 && data.slice(1).map((elem, i) => {
                        const p1 = [data[0].lat, data[0].lng]; // Residential location
                        const p2 = [data[i + 1].lat, data[i + 1].lng]; // Visited locations
                        const controlPoint = [
                            (p1[0] + p2[0]) / 2,
                            (p1[1] + p2[1]) / 2,
                        ];
                        return (
                            <Polyline
                                key={i}
                                positions={[
                                    p1,
                                    controlPoint,
                                    p2,
                                ]}
                                color="black"
                            />
                        );
                    })}
                </Map>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0px' }}>
                    <div style={{ margin: "2px", border: "2px solid black", height: '50px'}}>
                        <p style={{ margin: "2px" }}>Case ID:{case_id}</p>
                        {/* <p style={{ margin: "2px" }}>Location: </p> */}
                    </div>
                    <div style={{ position: "absolute", right: "10px" }}>
                        <Button style={{ marginTop: "10px" }} onClick={handleCloseButton}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(InteractiveMap);


