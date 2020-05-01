import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const PostForm = ({ addPost }) => {
  const [postData, setPostData] = useState({
      title: '',
      text: '',
      file: ''
  });

  const { title, text, file } = postData;

  const fileChanged = e => {
    setPostData({ ...postData, [e.target.name]: e.target.files[0] });
}

  const onChange = e => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  } 

  const onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('file', file);
    data.append('title', title);
    data.append('text', text);

    addPost(data);
    
    setPostData({title: '', text: '', file: ''});
  };

  return (
        <MuiThemeProvider>
            <main id="home">
                <div className='post-form'>
                <div className='bg-primary p'>
                    <h3>Say Something...</h3>
                </div>
                <form
                    className='form my-1'
                    onSubmit={onSubmit}
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
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="form-control"
                        placeholder="Start with ../img/"
                        onChange={fileChanged}
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