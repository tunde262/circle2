import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-form/ProfileForm/ProfileForm';
import PostForm from '../profile-form/createContent/PostForm';
import ProjectForm from '../profile-form/createContent/ProjectForm';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import PostPage from '../pages/PostPage';
import ProjectPage from '../pages/ProjectPage';
import Post from '../post/Post';
import CreatePage from '../profile-form/createContent/CreatePage';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/posts" component={PostPage} />
        <Route exact path="/projects" component={ProjectPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/create" component={CreatePage} />
        <PrivateRoute exact path="/create-post" component={PostForm} />
        <PrivateRoute exact path="/create-project" component={ProjectForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;