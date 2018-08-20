import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as cameraHandler from '../helper/cameraHandler'
import { connect } from 'react-redux'
import { getDoc } from '../actions/queryActions'

class Camera extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.videoSelect = React.createRef()
    this.state = {
      qrValue: ''
    }
  }

  componentDidMount() {
    cameraHandler.init(
      this.video.current,
      this.videoSelect.current,
      this.handleQrContent.bind(this)
    )
  }

  handleQrContent(content) {
    this.props.getDoc(content)
  }

  render() {
    const container = {
      position: 'relative',
      paddingTop: '100%',
      overflow: 'hidden'
    }

    const video = {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    }

    const select = {
      display: 'block',
      margin: '0 auto'
    }

    return (

      <div>
        <div style={container}>
          <video autoPlay ref={this.video} style={video}></video>
        </div>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.videoSelect}
            onChange={() => cameraHandler.handleSelect()}
            style={select}>
          </select>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  getDoc: PropTypes.func.isRequired
}

export default connect(null, { getDoc })(Camera)