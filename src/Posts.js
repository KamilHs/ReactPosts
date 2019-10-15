import React from 'react';
import Post from './Post';

import "./main.css";

export default function Posts(props) {
  return (
    <div className="Posts">
      <h1>Posts</h1>
      <ul>
        {props.posts.map((post, index) => (
          <Post
            post={post}
            key={index}
            index={index}
            returnPage={props.returnPage}
            HandleDetailsLinkClick={props.HandleDetailsLinkClick}
            detailIsSelected={props.detailIsSelected}
          />
        ))
        }
      </ul>
    </div>
  )
}
