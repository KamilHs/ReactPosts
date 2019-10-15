import React from 'react'
import './main.css'

export default function AddPost(props) {
    return (
        <div className="form-page">
            {props.error !== "" && <span className="error">{props.error}</span>}
            {props.success === true && <span className="success">Post was successfully added</span>}
            <div className="form">
                <h1>Add Post</h1>
                <label htmlFor="title">Title</label>
                <input value={props.AddPostTitle} onChange={(e => props.HandleTitleInputChange(e.target.value))} id="title" type="text" />

                <label htmlFor="Text">Text</label>
                <textarea value={props.AddPostText} onChange={(e => props.HandleTextInputChange(e.target.value))} id="text"></textarea>

                <button onClick={(e => props.HandleAddPostButtonClick())} className="submit">Submit</button>
            </div>
        </div>
    )
}