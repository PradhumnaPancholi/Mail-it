import axios from 'axios';
import {FETCH_USER} from './types';

const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/currentuser');
          then(res => dispatch({type: FETCH_USER, payload:res}))    
  }
}
