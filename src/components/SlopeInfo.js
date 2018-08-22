import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SlopeInfo extends Component {
  constructor(props) {
    super(props)
    this.info = React.createRef()
    this.state = {
      isInfoShown: false
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.slopeId || nextProp.slopeData) {
      this.setState({ isInfoShown: true }, () => {
        this.scrollToTarget(this.info.current)
      })
    }
  }

  scrollToTarget(target) {
    setTimeout(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }, 500)
  }

  formatDate = (date) => {
    var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  render() {
    const slopeData = this.props.slopeData
    const timestamp = (slopeData || {}).date
    const date = timestamp ? this.formatDate(timestamp.toDate()) : ''
    const lat = ((slopeData || {}).location || {})._lat
    const long = ((slopeData || {}).location || {})._long

    const styles = {
      list: {
        listStyle: 'none',
        textAlign: 'left',
        display: 'inline-block'
      },
      leftPad: {
        padding: 0
      },
      rightPad: {
        padding: '0 0 0 10px'
      },
      container: {
        width: '100%',
        textAlign: 'center'
      }
    }

    return this.state.isInfoShown ? (
      <div>
        <h3 style={styles.container} ref={this.info}>Slope Info</h3>
        <div style={styles.container}>
          <ul style={Object.assign(styles.list, styles.leftPad)}>
            <li>Slope ID:</li>
            <li>Latitude:</li>
            <li>Longitude:</li>
            <li>Road:</li>
            <li>Date:</li>
            <li>Angle:</li>
            <li>Height:</li>
          </ul>
          <ul style={Object.assign(styles.list, styles.rightPad)}>
            <li>{this.props.slopeId}</li>
            <li>{lat}</li>
            <li>{long}</li>
            <li>{slopeData.road}</li>
            <li>{date}</li>
            <li>{slopeData.angle}</li>
            <li>{slopeData.height}</li>
          </ul>
        </div>
      </div>
    ) : null
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