import React, { Component } from 'react';

import { Map, TileLayer, Marker/*, VideoOverlay*/, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'

import Viewer from './Viewer';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

/*          <VideoOverlay
            bounds={[[32, -130], [13, -100]]}
            play={this.state.play}
            url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
          />*/
const WrappedLeafletZoomIndicator = withLeaflet(ReactLeafletZoomIndicator);
const WrappedLeafletSearchIndicator = withLeaflet(ReactLeafletSearch);

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class FloodHistoryMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resourcesToShow: null,
      resourcesGroupedByCoordinates: null,
      lat: 49.606059,
      lng: 0.901217,
      zoom: 11,
    }
  }

  componentWillMount = () => {
    fetch(process.env.REACT_APP_SMBVAS_API_URL + 'resources/validated', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(resourcesGroupedByCoordinates => {
      this.setState({
        resourcesGroupedByCoordinates: resourcesGroupedByCoordinates,
      })
    })
  }

  handleMarkerClick = (resources) => this.setState({ resourcesToShow: resources })

  hideViewer = () => this.setState({ resourcesToShow: null })

  render = () => {
    const position = [this.state.lat, this.state.lng]
    const resourcesGroupedByCoordinates = this.state.resourcesGroupedByCoordinates
    const resourcesToShow = this.state.resourcesToShow

    return (
      <>
        <Map center={position} zoom={this.state.zoom} styles={{height: "100%"}}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {resourcesGroupedByCoordinates ? resourcesGroupedByCoordinates.map((resources, index) =>
            <Marker key={index} position={[resources[0].lat, resources[0].lng]} onClick={() => this.handleMarkerClick(resources)} />
          ) : null}
          <WrappedLeafletZoomIndicator head='zoom:' position='topright' />
          <WrappedLeafletSearchIndicator
            provider="OpenStreetMap"
            position="topleft"
            inputPlaceholder="Rechercher..."
            showMarker={true}
            zoom={11}
            showPopup={true}
            popUp={this.customPopup}
            closeResultsOnClick={true}
            openSearchOnLoad={true}
          />
        </Map>

        {resourcesToShow ? <Viewer hideViewer={this.hideViewer} resources={resourcesToShow} /> : null}
      </>
    )
  }
}

export default FloodHistoryMap
