import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as cameraHandler from '../helper/cameraHandler'
import { connect } from 'react-redux'
import { getDoc } from '../actions/queryActions'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import '../css/Camera.css'

const Div = (props) => {
  return props.loading ?
    <div className={props.class}></div> : null
}

class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoadingCamera: true }
    this.video = React.createRef()
    this.handleCameraSelect = this.handleCameraSelect.bind(this)
  }

  componentDidMount() {
    cameraHandler.init(
      this.video.current,
      this.handleQrContent.bind(this)
    ).then(() => this.setState({ isLoadingCamera: false }))
  }

  handleQrContent(content) {
    this.props.getDoc(content)
  }

  handleCameraSelect(e) {
    this.setState({ isLoadingCamera: true })
    cameraHandler.handleSelect(e)
      .then(() => this.setState({ isLoadingCamera: false }))
  }

  render() {
    const cameras = cameraHandler.getCameras()

    return (
      <div>
        <div className='container'>
          <Div loading={this.props.loading} class='cover' />
          <Div loading={this.props.loading} class='loader' />
          <video className='video' autoPlay ref={this.video}></video>
        </div>

        <br />
        <div className='camera-select'>
          <DropdownButton
            bsStyle='primary'
            title='Select camera'
            key='0'
            id='dropdown-basic-0'
            onSelect={e => this.handleCameraSelect(e)}
          >
            {cameras.map((obj, index) => <MenuItem key={index} eventKey={index} active={obj.isActive}>{obj.label}</MenuItem>)}
          </DropdownButton>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  getDoc: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.loader.loading
})

export default connect(mapStateToProps, { getDoc })(Camera)