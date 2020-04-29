import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  UPDATE_PROJECT_LIKES,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_PROJECT,
  ADD_PROJECT_COMMENT,
  REMOVE_PROJECT_COMMENT
} from './types';

// Get projects
export const getProjects = () => async dispatch => {
  try {
    const res = await axios.get('/api/projects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/like/${id}`);

    dispatch({
      type: UPDATE_PROJECT_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/unlike/${id}`);

    dispatch({
      type: UPDATE_PROJECT_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete project
export const deleteProject = id => async dispatch => {
  try {
    await axios.delete(`/api/projects/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });

    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add project
export const addProject = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/projects', formData, config);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });

    dispatch(setAlert('Project Created', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get project
export const getProject = id => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${id}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (projectId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/projects/comment/${projectId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_PROJECT_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (projectId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/projects/comment/${projectId}/${commentId}`);

    dispatch({
      type: REMOVE_PROJECT_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};