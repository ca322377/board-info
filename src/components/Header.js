import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fireauth } from '../config/firebase'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../css/Header.css'
const SCAN_QR = 'Scan a QR code'
const INVALID_SCAN = 'Invalid QR code'
const LOADING = 'Loading...'

class Header extends Component {
  state = {
    text: SCAN_QR
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading && !nextProps.isError) {
      this.setState({ text: LOADING })
    } else if (!nextProps.loading && nextProps.isError) {
      this.setState({ text: INVALID_SCAN })
    } else {
      this.setState({ text: SCAN_QR })
    }
  }

  signOut() {
    fireauth.signOut()
  }

  render() {
    const { text } = this.state

    return (
      <div>
        <h4 className='header-text'>
          {text === INVALID_SCAN ?
            <span style={{ color: 'red' }}>{text}</span> :
            text}
        </h4>
        <div className='header-select'>
          <DropdownButton pullRight
            bsStyle='info'
            title=''
            key='0'
            id='dropdown-basic-0'
            onSelect={this.signOut.bind(this)}
          >
            <MenuItem eventKey='1'>Sign out</MenuItem>
          </DropdownButton>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.loader.loading,
  isError: state.loader.isError
})

export default connect(mapStateToProps, null)(Header)