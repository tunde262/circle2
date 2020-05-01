import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: {
    img,
    img_name,
    status,
    company,
    location,
    website,
    social,
    user: { name }
}}) => {
    return (
        <div className="profile-top bg-primary p-2">
          {img ? (
              <img src={`/api/profile/image/${img_name}`} alt='img' className="round-img" />
          ) : (
              <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" alt='img' className="round-img" />
          )}
          <h1 className="large">{name}</h1>
            <p className="lead">{status} {company && <span> at {company}</span>}</p>
          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
              {
                  website && (
                    <a href={`http://www.${website}`} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )
              }
              {social && social.twitter && (
                  <a href={`http://www.twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {social && social.facebook && (
                  <a href={`http://www.facebook.com/${social.facebook}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

            {social && social.linkedin && (
                  <a href={`http://www.linkedin.com/${social.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {social && social.twitter && (
                  <a href={`http://www.youtube.com/${social.youtube}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}
              {social && social.instagram && (
                  <a href={`http://www.instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x"></i>
                </a>
              )}
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
