import { FETCH_POSTS, NEW_POST } from './types'
import { firestore } from '../config/firebase'

export const fetchPost = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }))
}

export const addPost = (post) => (dispatch) => {
  firestore.collection('users').add({
    title: post.title,
    body: post.body
  }).then(doc => console.log(doc.value))
}