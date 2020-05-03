import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProject } from '../../../actions/project';

const ProjectForm = ({ addProject }) => {
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        githublink: '',
        file: '',
    });
  
    const { title, description, githublink, file } = postData;

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
        data.append('description', description);
        data.append('githublink', githublink);
    
        addProject(data);
      };

  return (
        <main id="home" style={{textAlign: "center"}}>
        <h1 className='large text-primary'>Add a Project</h1>
        <p className='lead'>
            A project should contain include a related image, files, github link, and description.
        </p>
        <small>* = required field</small>
        <form
            className='form'
            onSubmit={onSubmit}
        >
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='Enter a descriptive title'
                    name='title'
                    value={title}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className="line"></div>
            <div className='form-group'>
            <textarea
                name='description'
                cols='30'
                rows='5'
                placeholder='Program Description'
                value={description}
                onChange={e => onChange(e)}
            />
            </div>
            <div className="line"></div>
            <div className="form-group social-input">
                <i className="fab fa-github fa-2x"></i>
                <input type="text" placeholder="Github URL" name="githublink" value={githublink} onChange={e => onChange(e)} />
            </div>
            <div className="line"></div>
            <div className="form-group">
                <label>Img</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="form-control"
                    placeholder="Start with ../img/"
                    onChange={fileChanged}
                />
            </div>
            <div className="line"></div>
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
            </Link>
        </form>
        </main>
  );
};

ProjectForm.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProject }
)(ProjectForm);