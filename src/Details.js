import React from 'react'


export default function Details(props) {

    return (
        <div className="details-container">
            <h1 className="detail-title">{props.post.title}</h1>
            <p className="detail-text">{props.post.fullBody}</p>
        </div>
    )
}