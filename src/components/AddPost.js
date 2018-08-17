import React, { Component } from 'react'
import { addPost } from '../actions/postActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const post = {
      title: this.state.title,
      body: this.state.body
    }
    this.props.addPost(post)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type='text' name='title' onChange={this.onChange.bind(this)} value={this.state.title}/>
        <br/>
        <textarea name='body' onChange={this.onChange.bind(this)} value={this.state.body}></textarea>
        <br/>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(AddPost)