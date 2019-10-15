import React from 'react';
import Posts from './Posts';
import AddPost from './AddPost';
import Details from './Details';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import "./main.css";

export default class App extends React.Component {
    state = {
        posts: [],
        isLoading: true,
        AddPostTitle: "",
        addPostText: "",
        submitting: false,
        error: "",
        success: false,
        selectedItemUrl: false, // For initial value I put random value in this case false because I will need it after not now
        detailProps: null,
    };

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(result => {

                const responsedPosts = result.map(post => ({ userId: post.userId, id: post.id, title: post.title, shortBody: post.body.substring(0, 100), fullBody: post.body }));

                this.setState({ isLoading: false, posts: responsedPosts });
            });
    }

    HandleTitleInputChange = (title) => {
        if (!this.state.submitting) {
            this.setState({ AddPostTitle: title, success: false })
        }
    }

    HandleTextInputChange = (text) => {
        if (!this.state.submitting) {
            this.setState({ addPostText: text, success: false })
        }
    }

    HandleAddPostButtonClick = () => {
        this.setState({ submitting: true })

        if (this.ValidateFormValues(this.state.AddPostTitle, this.state.addPostText)) {
            this.AddPost();
        }

        this.setState({ submitting: false, addPostText: "", AddPostTitle: "" })
    }

    HandleDetailsLinkClick = (url, props) => {
        this.setState({ selectedItemUrl: url, detailProps: props })
    }

    ValidateFormValues(title, text) {
        if (title === "" || text === "") {
            this.setState({ error: "Title and Text can't be empty", success: false })
            return false;
        }
        else if (!text.replace(/\s/g, '').length || !title.replace(/\s/g, '').length) {
            this.setState({ error: "Title and Text can't contain only whitespaces", success: false })
            return false;
        }
        else {
            this.setState({ error: "" })
            return true;
        }
    }

    AddPost() {
        const newPost = {
            userId: Math.max(...this.state.posts.map(post => post.userId)) + 1,
            id: Math.max(...this.state.posts.map(post => post.id)) + 1,
            title: this.state.AddPostTitle,
            shortBody: this.state.addPostText.substring(0, 100),
            fullBody: this.state.addPostText
        }
        this.setState({ posts: [newPost, ...this.state.posts], success: true })
    }

    ReturnPostsPage = () => {
        return (
            <div className="main-container">
                <Link className="add-post-button" to="/add-post">Add Post</Link>
                {this.state.isLoading && <p>Loading...</p>}
                <Posts
                    posts={this.state.posts}
                    returnPage={this.ReturnPostsPage}
                    HandleDetailsLinkClick={this.HandleDetailsLinkClick}
                    detailIsSelected={this.state.detailIsSelected}
                />
            </div>
        )
    }

    render() {

        return (
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/add-post">
                            <AddPost
                                HandleTitleInputChange={this.HandleTitleInputChange}
                                HandleTextInputChange={this.HandleTextInputChange}
                                AddPostTitle={this.state.AddPostTitle}
                                AddPostText={this.state.addPostText}
                                HandleAddPostButtonClick={this.HandleAddPostButtonClick}
                                error={this.state.error}
                                success={this.state.success}
                            />
                        </Route>
                        <Route exact path={`${this.state.selectedItemUrl}`}>
                            <Details post={this.state.detailProps} />
                        </Route>
                        <Route exact path="/">
                            {this.ReturnPostsPage()}
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
