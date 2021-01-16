import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../components/Repos';
import { GithubContext } from '../context/github/githubContext';

const Profile = ({match}) => {

  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const url_name = match.params.name

  useEffect(() => {
    getUser(url_name)
    getRepos(url_name)
     // eslint-disable-next-line
  }, [])

  if(loading) {
    return <p className="text-center">Loading...</p>
  }

  const {
    name, company, avatar_url, location,
    bio, blog, login, html_url, followers,
    following, public_repos, public_gists
  } = user

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">Home Page</Link>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img 
                src={avatar_url} 
                alt={name}
                style={{width: '150px', marginBottom: '10px'}}/>
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>
            <div className="col">
              {
                bio && <Fragment>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </Fragment>
              }
              <a href={html_url} rel="noreferrer" target="_blank" className="btn btn-dark mb-3">Open Profile</a>
              <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
                {login && <li>
                  <strong>Username: </strong> {login}
                  </li>}

                  {company && <li>
                  <strong>Company: </strong> {company}
                  </li>}

                  {blog && <li>
                  <strong>Website: </strong> {blog}
                  </li>}
              </ul>
              <div className="badge badge-primary">Followers: {followers}</div>
              <div className="badge badge-success">Following: {following}</div>
              <div className="badge badge-info">Repositories: {public_repos}</div>
              <div className="badge badge-warning">Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

export default Profile;