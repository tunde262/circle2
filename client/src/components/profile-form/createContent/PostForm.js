import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const PostForm = ({ addPost }) => {
  const [postData, setPostData] = useState({
      title: '',
      text: ''
  });

  const { title, text } = postData;

  const onChange = e => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  } 

  return (
        <MuiThemeProvider>
            <main id="home">
                <div className='post-form'>
                <div className='bg-primary p'>
                    <h3>Say Something...</h3>
                </div>
                <form
                    className='form my-1'
                    onSubmit={e => {
                    e.preventDefault();
                    addPost({ title, text });
                    setPostData({title: '', text: ''});
                    }}
                >
                    <TextField 
                        hintText="Enter A Title For This Post"
                        floatingLabelText="Title of Post"
                        name='title'
                        onChange={e => onChange(e)}
                        defaultValue={title}
                        required
                        style={{marginBottom: "1rem"}}
                    />
                    <textarea
                    name='text'
                    style={{width: "100%"}}
                    rows='5'
                    placeholder='Tell a story'
                    value={text}
                    onChange={e => onChange(e)}
                    required
                    />
                    <input type='submit' className='btn btn-dark my-1' value='Submit' />
                </form>
                </div>
            </main>
    </MuiThemeProvider>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);