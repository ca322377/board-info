import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SlopeInfo extends Component {
  formatDate = (date) => {
    var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  render() {
    const slopeData = this.props.slopeData
    const timestamp = (slopeData || {}).date
    const date = timestamp ? this.formatDate(timestamp.toDate()) : ''
    const lat = ((slopeData || {}).location || {})._lat
    const long = ((slopeData || {}).location || {})._long

    return (
      <div>
        <h1>Slope</h1>
        <div>{this.props.slopeId}</div>
        <br/>
        <div>Latitude: {lat}</div>
        <div>Longitude: {long}</div>
        <div>Road: {slopeData.road}</div>
        <div>Date: {date}</div>
        <div>Angle: {slopeData.angle}</div>
        <div>Height: {slopeData.height}</div>
      </div>
    )
  }
}

SlopeInfo.propTypes = {
  slopeId: PropTypes.string,
  slopeData: PropTypes.object
}

const mapStateToProps = state => ({
  slopeId: state.slope.slopeId,
  slopeData: state.slope.slopeData
})

export default connect(mapStateToProps, null)(SlopeInfo)