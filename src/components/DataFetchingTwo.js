import axios from 'axios';
import React, { useEffect, useReducer } from 'react'

const initialState = {
  loading: true,
  error: '',
  post: {}
}

const reducer = (state, action)=> {
  switch(action.type){
    case 'FETCH_SUCCESSFULLY':
      return{
        loading: false,
        error: '',
        post: action.payload
      }
    case 'FETCH_ERROR':
      return{
        loading: false,
        error: 'Something went wrong!',
        post: {}
      }
    default:
      return state;
  }
}

function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      dispatch({type:'FETCH_SUCCESSFULLY', payload: response.data})
    })
    .catch(error => {
      dispatch({type: "FETCH_ERROR"})
    })
  }, [])
  
  return (
    <div>
      {state.loading ? "Loading" : <h1> {state.post.title} </h1> }
      {state.error ? state.error : null}
    </div>
  )
}

export default DataFetchingTwo