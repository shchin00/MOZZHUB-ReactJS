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

