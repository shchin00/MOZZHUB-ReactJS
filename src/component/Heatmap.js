import React from 'react'
import { Map, TileLayer, Tooltip,Popup,Circle} from 'react-leaflet'

const Heatmap = ({lat,lng,ranking=[], height}) => (
    <Map center={[lat, lng]} zoom={13}  style={{ width: '100%', height: height, margin:'auto' }}>
        <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={16}
            minZoom={6}
        />
        {ranking.map((elem, i) => {
            var l = (0.9 - (ranking[i].ranking)*0.9) * 255
            //var l = (ranking[i].ranking)*50
            var h = (0.9- (ranking[i].ranking)*0.9) * 240
            var a = (ranking[i].ranking)*0.9
            var hsl = "hsl(" + h + ", 100%, 50%)"
            /*  0    : blue   (hsl(240, 100%, 50%))
            0.25 : cyan   (hsl(180, 100%, 50%))
            0.5  : green  (hsl(120, 100%, 50%))
            0.75 : yellow (hsl(60, 100%, 50%))
            1    : red    (hsl(0, 100%, 50%)) */
            var rgb = "rgb(255,"+l+","+l+")"
            return (
                
                <Circle 
                    center={{lat:ranking[i].lat, lng:ranking[i].lng}}
                    color='red'
                    fillColor={rgb}
                    fillOpacity={a}
                    //fillOpacity={parseFloat(ranking[i][2])*0.7}  
                    radius={400}>
                    <Tooltip><h3>Ranking:#{i+1}</h3></Tooltip>
                </Circle>
            )
})}
    </Map>
)

export default Heatmap

// import { data } from 'browserslist';
// import React, {useState} from 'react';
// import { Map, TileLayer, Tooltip, Circle, Polyline, Popup } from 'react-leaflet';

// const dummyRanking = [
//     { lat: 1.462251, lng:  110.413307, ranking: 0.8 }, // London
//     { lat: 1.468643, lng: 110.428541, ranking: 0.6 }, // New York
//     { lat: 1.467907, lng: 110.413067, ranking: 0.4 }, // Los Angeles
//     // { lat: 41.8781, lng: -87.6298, ranking: 0.5 }, // Chicago
//     // { lat: 37.7749, lng: -122.4194, ranking: 0.7 } // San Francisco
// ];

// const Heatmap = () => {
//     const lat = 1.462251; // Initial map center latitude
//     const lng = 110.413307; // Initial map center longitude

//     const[hideLine, setHideLine] = useState(false)
//     const [popupData, setPopupData] = useState(null); 

//     const handleClick = ()=>{
//         setHideLine(!hideLine);
//         setPopupData(data)

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
//         <Map center={[lat, lng]} zoom={16} style={{ width: '100%', height: '820px', margin: 'auto' }}>
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
//     )
// }

// export default Heatmap;
