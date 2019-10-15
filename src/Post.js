import React from 'react';
import './main.css'
import { Link } from "react-router-dom";

export default function Post(props) {
    return (
        <div className="post">
            <li key={props.index}>
                <h2 className="title">{props.post.title}</h2>
                <p>{props.post.shortBody}</p>
                <Link className="details-link" onClick={(e => props.HandleDetailsLinkClick(`/${props.post.id}/details`, props.post))} to={`/${props.post.id}/details`}>Details</Link>
            </li>
        </div>
    )
}