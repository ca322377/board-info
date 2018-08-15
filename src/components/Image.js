import React, { Component } from 'react'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png',
      qrValue: ''
    }
  }

  onClick(e) {

    this.setState({
      qrValue: ''
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.imageUrl} alt="test" />
        <br />
        <button onClick={this.onClick.bind(this)}>Read QR Code</button>
        <br />
        <div>
          {this.state.qrValue}
        </div>
      </div>
    )
  }
}