import React, { Component } from 'react'
import { Map, TileLayer, Marker, VideoOverlay } from 'react-leaflet'
import Viewer from './Viewer'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet';

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
      resourceToShow: null,
      isresourceshown: true,
      resources: [],
      lat: 49.606059,
      lng: 0.901217,
      zoom: 11,
    }
  }

  componentWillMount = () => {
    fetch('http://localhost:9000/resources', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(resources => {
      this.setState({
        resources: resources,
      })
    })
  }

  handleMarkerClick = (resource) => {
    this.setState({ resourceToShow: resource })
  }

  hideViewer = () => {
    this.setState({ resourceToShow: null })
  }

  render = () => {
    const position = [this.state.lat, this.state.lng]
    const resources = this.state.resources
    const resourceToShow = this.state.resourceToShow

    return (
      <>
        <Map center={position} zoom={this.state.zoom} styles={{height: "100%"}}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {resources.map(resource =>
            <Marker key={resource.uuid} position={[resource.lat, resource.lng]} onClick={() => this.handleMarkerClick(resource)} />
          )}
          <VideoOverlay
            bounds={[[32, -130], [13, -100]]}
            play={this.state.play}
            url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
          />
        </Map>

        {resourceToShow ? <Viewer resource={resourceToShow} /> : null}
      </>
    )
  }
}

export default FloodHistoryMap