import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as cameraHandler from '../helper/cameraHandler'
import { connect } from 'react-redux'
import { getDoc } from '../actions/queryActions'
import { showLoader } from '../actions/loadActions'
import '../css/Camera.css'

const Div = (props) => {
  return props.loading ?
    <div className={props.class}></div> : null
}

class Camera extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.videoSelect = React.createRef()
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
        <div className='container'>
          <Div loading={this.props.loading} class='cover'/>
          <Div loading={this.props.loading} class='loader'/>
          <video className='video' autoPlay ref={this.video}></video>
        </div>

        <br />
        <div>
          <select className='select' ref={this.videoSelect}
            onChange={() => cameraHandler.handleSelect()}>
          </select>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  getDoc: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.loader.loading
})

export default connect(mapStateToProps, { getDoc, showLoader })(Camera)