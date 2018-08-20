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
    return (
      <div>
        <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
          <video autoPlay ref={this.video}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}></video>
        </div>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.videoSelect} onChange={() => cameraHandler.handleSelect()}></select>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  getDoc: PropTypes.func.isRequired
}

export default connect(null, { getDoc })(Camera)