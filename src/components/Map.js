import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MapContainer extends Component {
  state = {
    isMapShown: false
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.slopeData) {
      this.setState({ isMapShown: true })
    }
  }

  render() {
    const slopeData = this.props.slopeData
    const lat = ((slopeData || {}).location || {})._lat
    const long = ((slopeData || {}).location || {})._long

    return this.state.isMapShown ? (
      <Map
        latitude={lat}
        longitude ={long}
      />
    ) : null
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
  const lat = (props || {}).latitude || 0
  const long = (props || {}).longitude || 0

  return <GoogleMap
    defaultZoom={8}
    center={{ lat: lat, lng: long }}
  >
    <Marker position={{ lat: lat, lng: long }} />
  </GoogleMap>}
)

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number  
}