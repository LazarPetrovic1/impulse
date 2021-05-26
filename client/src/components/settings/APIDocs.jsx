import React from 'react';
import RequestBlock from '../../styled/Settings/RequestBlock';
import ExplainBlock from '../../styled/Settings/ExplainBlock';

function APIDocs() {
  return (
    <section className="px-3 py-5">
      <div className="accordion border" id="APIAccordion">
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="Introduction">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse1"
                aria-expanded="true"
                aria-controls="collapse1">
                Introduction
              </button>
            </h2>
          </div>
          <div
            id="collapse1"
            className="collapse show"
            aria-labelledby="Introduction"
            data-parent="#APIAccordion"
          >
            <div className="card-body">
              Welcome to Impulse's API Documentation.<br/>
              Keep in mind that this is my first attempt at making a public API for developers, so the documentation might not be ideal.<br/>
              Impulse's API allows you to query for people's data (<b>Keep in mind that sensitive data will either be redacted or altered from what they originally were.</b>) and/or their posts (<b>Again, the same thing applies.</b>)<br/>
              Impulse was built with developers first in mind and will always continue to look for the next big thing.
            </div>
          </div>
        </div>
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="How to use">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                How to use?
              </button>
            </h2>
          </div>
          <div id="collapse2" className="collapse" aria-labelledby="How to use" data-parent="#APIAccordion">
            <div className="card-body">
              Simply send an HTTP request to our public API and the results will be returned in JSON.<br/>
              Do with the returned data what you will.<br/>
              If you're an employer, please consider using Impulse's API for your hiring test.<br/>
            </div>
          </div>
        </div>
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="Users API">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3">
                Users API
              </button>
            </h2>
          </div>
          <div id="collapse3" className="collapse" aria-labelledby="Users API" data-parent="#APIAccordion">
            <div className="card-body">
              <p>Users API allows for CRUD functionality for users, as well as the ability to search for specific users from a database, and get users' data based on parameters other than <i>_id</i>.</p>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Create user</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>Returns an object that is supposed to represent a <i>real user</i>.<br/>This should be saved in the database, as the user won't actually be created on Impulse.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get user by id</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns a user object based on the <i>id</i> parameter in the url (<u>denoted with the <b>colon (:)</b></u>).</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Search for a user</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>Returns all user object that pass the search check, based on <i>firstName, lastName, email and username</i>.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/search
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get post info</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns user information found in posts (<i>firstName, lastName and username</i>) based on the <i>_id</i> parameter.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/postedby/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get user by username</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns user information based on the <i>username</i> parameter.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/uname/:username
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Update user</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Returns the updated user object based on information sent and the <i>_id</i> of the user.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Update user</h3>
                  <span className="badge badge-danger">DELETE</span>
                </header>
                <p>Remove a user based on the <i>_id</i> parameter.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/users/public/:id
                </RequestBlock>
              </ExplainBlock>
            </div>
          </div>
        </div>
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="Status API">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                Status API
              </button>
            </h2>
          </div>
          <div id="collapse4" className="collapse" aria-labelledby="Status API" data-parent="#APIAccordion">
            <div className="card-body">
              <p>Status API allows for CRUD functionality for textual posts.</p>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Create status</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>
                  Returns an object that is supposed to represent a <i>real textual post</i>.<br/>
                  This should be saved in the database, as the status won't actually be created on Impulse.<br/>
                  Be sure to append the <i>_id</i> of a user to the end of the URL.
                </p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get all status posts</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns all status posts.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get status post by ID</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns a status post based on the <i>_id</i> parameter.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/status/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Remove status post by ID</h3>
                  <span className="badge badge-danger">DELETE</span>
                </header>
                <p>Removes a status post based on the <i>_id</i> parameter.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get user's status posts</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Get all of user's status posts.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Save status post</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Save a status post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/impulse/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Like status post</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Like a status post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/like/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Dislike status post</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Dislike a status post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/status/public/dislike/:id
                </RequestBlock>
              </ExplainBlock>
            </div>
          </div>
        </div>
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="Video API">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse5"
                aria-expanded="false"
                aria-controls="collapse5"
              >
                Video API
              </button>
            </h2>
          </div>
          <div id="collapse5" className="collapse" aria-labelledby="Video API" data-parent="#APIAccordion">
            <div className="card-body">
              <p>Simple GET functionality for videos posts.</p>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get all videos</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Get all videos</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/videos/public
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get a video by ID</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Get a video by <i>_id</i></p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/videos/public/:id
                </RequestBlock>
              </ExplainBlock>
            </div>
          </div>
        </div>
        <div className="card" style={{ background: "transparent" }}>
          <div className="card-header border-bottom rounded" id="Forum API">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapse6"
                aria-expanded="false"
                aria-controls="collapse6"
              >
                Forum API
              </button>
            </h2>
          </div>
          <div id="collapse6" className="collapse" aria-labelledby="Forum API" data-parent="#APIAccordion">
            <div className="card-body">
              <p>Forum API allows for CRUD functionality for forum posts.</p>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Create a forum post</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>Create a forum post. Requires user's <i>_id</i></p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Find user's forum posts</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Find forum posts of user by their <i>_id</i>.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/user/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get all forum posts</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns all forum posts available.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get forum post by ID</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns the forum post with the same <i>_id</i>.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Remove forum post</h3>
                  <span className="badge badge-danger">DELETE</span>
                </header>
                <p>Removes the forum post and returns the remaining forum posts.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Update forum post</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Updates the forum post based on the request body and returns it.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Comment on forum post</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>Adds a comment to the forum post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:uid
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get comments of a forum post</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Returns comments of a forum post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Edit comment</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Edits the comment of a forum post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/:uid
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Delete comment</h3>
                  <span className="badge badge-danger">DELETE</span>
                </header>
                <p>Deletes the comment of a forum post.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/:uid
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Reply to comment</h3>
                  <span className="badge badge-primary">POST</span>
                </header>
                <p>Adds a reply to the comment.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/:uid/reply
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Edit reply</h3>
                  <span className="badge badge-success">PUT</span>
                </header>
                <p>Edits a reply to the comment.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/:uid/reply
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Get replies</h3>
                  <span className="badge badge-secondary">GET</span>
                </header>
                <p>Get replies of a comment.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/reply
                </RequestBlock>
              </ExplainBlock>
              <ExplainBlock>
                <header>
                  <h3 className="d-inline-block mr-3">Delete reply</h3>
                  <span className="badge badge-danger">DELETE</span>
                </header>
                <p>Delete the reply to a comment.</p>
                <RequestBlock>
                  http://localhost:3000/impulse/api/v1/forum/public/comment/:id/:comment_id/:reply_id/:uid
                </RequestBlock>
              </ExplainBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default APIDocs;
