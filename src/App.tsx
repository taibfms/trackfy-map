import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, LayersControl } from "react-leaflet";
import './App.css';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet'

const { BaseLayer } = LayersControl;

const Clock = ({ className }: { className: string }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  return (
    <div className={className}>
      <div>{formattedTime}</div>
      <div>{formattedDate}</div>
    </div>
  );
};

function App() {

  const geoCoordsOne = [
    [-13.01000, -38.5340],
    [-13.0092, -38.5326],
    [-13.0106, -38.5315],
    [-13.0116, -38.5324],
  ]

  const geoCoordsTwo = [
    [-13.0112, -38.5254],
    [-13.0116, -38.5226],
    [-13.0092, -38.5222],
    [-13.0088, -38.5246],
  ]

  return (
    <div>
      <Clock className="clock-top" />
      
      <MapContainer center={[-13.0097, -38.5284]} zoom={17}>
        
        <LayersControl position="topright">
         
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
            />
          </BaseLayer>

        </LayersControl>

        <Marker position={[-13.010285, -38.532668]} icon={new Icon({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        })}>

          <Marker position={[-13.0102, -38.5242]} icon={new Icon({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
          })}>

            <Popup>

              <Clock className="clock=popup" />
              <p>Morro do Cristo - Salvador, Bahia <br />
                Ótimo lugar para relaxar com a familia, <br />
                Gramado verde, uma grande estátua de Jesus Cristo <br /></p>
              <img className='img-popup' src='https://cronicasmacaenses.files.wordpress.com/2021/02/salvador-morro-do-cristo-02.jpg' />

            </Popup>
          
          </Marker>
          
          <Polygon pathOptions={{ fillColor: 'blue', fillOpacity: 0.4 }} positions={geoCoordsOne} />
          
          <Polygon pathOptions={{ fillColor: 'green', fillOpacity: 0.4 }} positions={geoCoordsTwo} />
          
          <Popup>
            
            <Clock className="clock=popup" />
            <p>Farol da Barra - Salvador, Bahia <br />
              Ótimo lugar para relaxar com a familia e curtir o por do sol. <br />
              Gramado verde, um farol histórico com muitas memórias da nossa cidade. <br /></p>
            <img className='img-popup' src='https://tourb.com.br/img/lugares/salvador/farol-da-barra.jpg' />
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}

export default App;
