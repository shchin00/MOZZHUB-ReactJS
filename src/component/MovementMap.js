import React from 'react'
import { Map, TileLayer, Marker, Popup, WMSTileLayer,Circle} from 'react-leaflet'

const Heatmap = ({ranking=[]}) => (
    <Map center={[1.5436,110.3584]} zoom={15}  style={{ width: '100%', height: ' 100vh', margin:'0' }}>
        <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={16}
            minZoom={6}
        />
        {ranking.map((elem, i) => {
            var l = (1.0 - ranking[i][2]) * 255
            var h = (1.0 - ranking[i][2]) * 240
            var hsl = "hsl(" + h + ", 100%, 50%)"
            var rgb = "rgb(255,"+l+","+l+")"
            //console.log(hsl)
            return (
                <Circle
                    key={i}
                    center={{lat:ranking[i][0], lng:ranking[i][1]}}
                    radius={6}>
                <Popup>
                    <span>
                        <strong>Address:</strong><br/>{ranking[i][3]}
                        {ranking[i][0]}{ ranking[i][1]}
                    </span>
                </Popup>
                <Circle 
                    center={{lat:ranking[i][0], lng:ranking[i][1]}}
                    color='orange'
                    fillColor={hsl}
                    //fillColor={"rgb("+(parseFloat(ranking[i][2])*255)+", 0, 0)"}
                    opacity={0}
                    fillOpacity={0.75}  
                    //fillOpacity={parseFloat(ranking[i][2])*0.7}  
                    radius={400}/>
                </Circle>
            )
          })}
    

       
    </Map>
)

export default Heatmap