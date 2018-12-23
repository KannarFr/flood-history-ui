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
      resources: [],
      lat: 49.606059,
      lng: 0.901217,
      zoom: 11,
    }
  }

  /*componentWillMount = () => {
    fetch('http://localhost:9000/resources', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(resources => {
      this.setState({
        resources: resources,
      })
    })
  }*/

  componentWillMount = () => {
    this.setState({
      resources: [
        {
          "uuid": "1f5306ff-81a8-419d-a188-a79a8e5288a4",
          "category": "image",
          "lat": 49.6178,
          "lng": 0.7552,
          "creation_date": "1970-01-01T01:00:02.345+01:00[Europe/Paris]",
          "edition_date": "1970-01-01T20:47:40.151+01:00[Europe/Paris]",
          "validator": {
            "uuid": "6fc29ce8-a3f4-4cab-b7eb-6ea8921e644e",
            "email": "alexanduval@wanahahfr",
            "password": "",
            "creation_date": 1518279168
          }
        },
        {
          "uuid": "2f5306ff-81a8-419d-a188-a79a8e5288a4",
          "category": "image",
          "lat": 49.6178,
          "lng": 0.7552,
          "creation_date": "1970-01-01T01:00:02.345+01:00[Europe/Paris]",
          "edition_date": "1970-01-01T21:28:36.514+01:00[Europe/Paris]",
          "validator": {
            "uuid": "6fc29ce8-a3f4-4cab-b7eb-6ea8921e644e",
            "email": "alexanduval@wanahahfr",
            "password": "",
            "creation_date": 1518279168
          }
        },
        {
          "uuid": "3f5306ff-81a8-419d-a188-a79a8e5288a4",
          "category": "image",
          "lat": 49.6178,
          "lng": 0.7552,
          "creation_date": "1970-01-01T01:00:02.345+01:00[Europe/Paris]",
          "edition_date": "1970-01-01T21:32:47.459+01:00[Europe/Paris]",
          "validator": {
            "uuid": "6fc29ce8-a3f4-4cab-b7eb-6ea8921e644e",
            "email": "alexanduval@wanahahfr",
            "password": "",
            "creation_date": 1518279168
          }
        }
      ]
    })
  }

  handleMarkerClick = (resource) => this.setState({ resourceToShow: resource })

  hideViewer = () => this.setState({ resourceToShow: null })

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

        {resourceToShow ? <Viewer hideViewer={this.hideViewer} {...resourceToShow} /> : null}
      </>
    )
  }
}

export default FloodHistoryMap
