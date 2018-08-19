import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MapContainer extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.showMarker()
  }

  showMarker = () => {
    this.setState({ isMarkerShown: true })
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    const slopeData = this.props.slopeData
    const lat = ((slopeData || {}).location || {})._lat
    const long = ((slopeData || {}).location || {})._long

    return (
      <Map
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        latitude={lat}
        longitude ={long}
      />
    )
  }
}

MapContainer.propTypes = {
  slopeData: PropTypes.object
}

const mapStateToProps = state => ({
  slopeData: state.slope.slopeData,
})

export default connect(mapStateToProps, null)(MapContainer)

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBz6gogiyHqpgK2xTIV9YOstUDIHU8t0KE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const lat = (props || {}).latitude || -34.397
  const long = (props || {}).longitude || 150.644

  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: lat, lng: long }}
    center={{ lat: lat, lng: long }}
  >
    {props.isMarkerShown && <Marker position={{ lat: lat, lng: long }} />}
  </GoogleMap>}
)

Map.propTypes = {
  isMarkerShown: PropTypes.bool.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number  
}

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBz6gogiyHqpgK2xTIV9YOstUDIHU8t0KE'
// })(MapContainer)

// class Map extends Component {
//   constructor(props) {
//     super(props)
//     this.map = React.createRef()
//   }
//   componentDidMount() {
//     window.initMap = this.initMap
//     this.loadMapScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBz6gogiyHqpgK2xTIV9YOstUDIHU8t0KE&callback=initMap')
//   }

//   initMap() {
//     this.map = new google.maps.Map(this.map)
//   }

//   loadMapScript(src) {
//     const script = document.createElement('script')
//     script.src = src
//     script.async = true
//     document.head.appendChild(script)
//   }

//   render() {
//     const slopeData = this.props.slopeData
//     const date = ((slopeData || {}).date || {}).seconds
//     const lat = ((slopeData || {}).location || {})._lat
//     const long = ((slopeData || {}).location || {})._long

//     return (
//       <div>
//         <h1>Map</h1>
//         <div ref={this.map} style='height: 500px, width: 500px'></div>
//       </div>
//     )
//   }
// }

// Map.propTypes = {
//   slopeData: PropTypes.object,
// }

// const mapStateToProps = state => ({
//   slopeData: state.slope.slopeData,
// })

// export default connect(null, null)(Map)