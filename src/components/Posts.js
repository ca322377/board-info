import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions/postActions'
import PropTypes from 'prop-types'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPost()
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.post) {
      this.props.posts.unshift(nextProp.post)
    }
  }

  render() {
    const posts = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
    return (
      <div>
        <h1>Posts</h1>
        {posts}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  post: PropTypes.object
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  post: state.posts.item
})

export default connect(mapStateToProps, { fetchPost })(Posts)