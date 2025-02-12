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


