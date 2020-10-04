import React, {useState} from 'react'
import {
  Map,
  TileLayer,
  GeoJSON
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import geojsonSource from '../assets/geojson/bidang.json';
import { useRef } from 'react';
import L from 'leaflet'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const defaultFeatureStyle = {
  fillColor: '#00FF00',
  fillOpacity: 1,
  color: "black",
  weight: 0.8,
  clickable: true
};

function LeafletMap () {
  const [geojsonData, setGeojsonData] = useState(geojsonSource);
  const [position] = useState({
    lat: -7.63,
    lng: 110.71,
  });
  const [zoom] = useState(18);
  const [activeModalFeature, setActiveModalFeature] = useState(null);
  const geoJsonRef = useRef(null)
  const mapRef = useRef(null)

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: function(e){
        var layer = e.target;
        layer.bindTooltip(feature.properties.kk_1).openTooltip();
        layer.setStyle({
          weight: 1,
          color: "#00FFFF",
          opacity: 1,
          fillColor: "yellow",
          fillOpacity: 1
        })
      },
      mouseout: function(e){
        geoJsonRef.current.leafletElement.resetStyle()
      },
      click: function(e){
        setActiveModalFeature(feature)
        var layer = e.target;
        var centroid = layer.getBounds().getCenter();
        mapRef.current.leafletElement.flyTo(new L.LatLng(centroid.lat, centroid.lng), 17);
      }
    });
  }

  function createFeatureStyle(feature) {
    if (feature.properties.kk_1 === null) {
      return {...defaultFeatureStyle, fillColor: '#FF0000'};
    }
    return defaultFeatureStyle;
  }

  const center = [position.lat, position.lng];
  return (
    <React.Fragment>
      <Map ref={mapRef} center={center} zoom={zoom} style={{ width: '100vw', height: '100vh' }}>
        <TileLayer url={'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'} subdomains={['mt0','mt1','mt2','mt3']}/>
        <GeoJSON
          ref={geoJsonRef}
          key="geojson-bidang"
          data={geojsonData}
          style={createFeatureStyle}
          onEachFeature={onEachFeature}
        ></GeoJSON>
      </Map>
      <Modal isOpen={Boolean(activeModalFeature)} toggle={() => setActiveModalFeature(null)}>
        {activeModalFeature &&
          <FeatureModalForm
            feature={activeModalFeature}
            toggle={() => setActiveModalFeature(null)}
            onSubmitted={(updatedFeature) => {
              const newGeojsonData = {...geojsonData};
              const shouldUpdateIndex = newGeojsonData.features.findIndex(feature => {
                return updatedFeature.properties.centroid === feature.properties.centroid && updatedFeature.properties.centroid_y === feature.properties.centroid_y
              })
              newGeojsonData.features[shouldUpdateIndex] = updatedFeature;
              setGeojsonData(newGeojsonData);
              setActiveModalFeature(null);
            }}
          />
        }
      </Modal>

      </React.Fragment>

  )
}

function FeatureModalForm({ feature, toggle, onSubmitted }){
  const [kk1Value, setKk1Value] = useState(feature.properties.kk_1)
  function onSubmit(event) {
    event.preventDefault();
    const updatedFeature = {...feature};
    updatedFeature.properties.kk_1 = kk1Value;
    onSubmitted(updatedFeature)
  }

  return (<form onSubmit={onSubmit}>
    <ModalHeader toggle={toggle}>
      X: {feature.properties.centroid} Y: {feature.properties.centroid_y}
    </ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label htmlFor="kk_1">KK_1</label>
        <input id="kk_1" name="kk_1" value={kk1Value} onChange={(e) => setKk1Value(e.target.value)} type="text" className="form-control"/>
      </div>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary">Simpan</button>
    </ModalFooter>
  </form>)
}


export default LeafletMap
