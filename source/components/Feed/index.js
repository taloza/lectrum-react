import React, { Component } from 'react';
import { string } from 'prop-types';
import { socket } from '../../socket';
import gsap from 'gsap';
import {Transition,
        CSSTransition,
        TransitionGroup
} from 'react-transition-group';

import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Counter from '../Counter';
import Catcher from '../Catcher';
import Spinner from '../Spinner';
import Postman from '../Postman';

import Styles from './styles.m.css';
import { api, GROUP_ID } from '../../REST';

export default class Feed extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string,
    };

    state = {
        posts: [],
        isSpinning: false,
        isPostmanAppear: true,
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPostsAsync();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !== `${createdPost.firstName} ${createdPost.lastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }))
            }
        });

        socket.on('remove', (postData) => {
            const { data: { id }, meta } = JSON.parse(postData);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== id)
                }));
            }
        });

        socket.on('like', (postData) => {
            const { data: createdPost, meta } = JSON.parse(postData);

            if (`${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === createdPost.id ? createdPost : post)
                }));
            }
        });
    }

    _setPostsFetchingState = (isSpinning) => {
        this.setState({
            isSpinning,
        });
    }

    _fetchPostsAsync = async () => {
        try {
            this._setPostsFetchingState(true);

            const posts = await api.fetchPosts();

            this.setState(() => ({
                posts,
            }))
        } catch (error) {
            console.error(error);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPost(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts ],
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            await api.removePost(id);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.likePost(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === likedPost.id ? likedPost: post)
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setPostsFetchingState(false);
        }
    }

    _animateComposerEnter = (composer) => {
        // element, animation in seconds, { from point, to point }
        gsap.fromTo(composer, 2,
            {
                opacity: 0,
                x: -1000,
            },
            {
                opacity: 1,
                x: 0
            }
        );
    }

    _handlePostmanAppear = (postman) => {
        gsap.fromTo(postman, 2,
            {
                opacity: 0,
                x: 400,
            },
            {
                opacity: 1,
                x: 0,
                onComplete: () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            isPostmanAppear: false
                        }));
                    }, 5000);
                },
            }
        );
    }

    _handlePostmanDisappear = (postman) => {
        gsap.fromTo(postman, 2,
            {
                opacity: 1,
                x: 0,
            },
            {
                opacity: 0,
                x: 400
            }
        );
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { posts, isSpinning, isPostmanAppear } = this.state;

        const postsJSX = posts.map((post) => (
            <CSSTransition
                classNames = {{
                    enter:          Styles.postInStart,
                    enterActive:    Styles.postInEnd,
                    exit:           Styles.postOutStart,
                    exitActive:     Styles.postOutEnd,
                }}
                timeout = {1000}
                key = { post.id } >
            <Catcher>
                <Post
                    { ...post }
                    _removePostAsync = { this._removePostAsync }
                    _likePostAsync = { this._likePostAsync }
                />
            </Catcher>
                </CSSTransition>
        ));
        return (
            <section className = { Styles.feed } >
                <StatusBar/>
                <Transition
                    appear
                    in
                    timeout = { 2000 }
                    onEnter = { this._animateComposerEnter } >
                    <Composer
                        avatar = { avatar }
                        _createPostAsync = { this._createPostAsync }
                    />
                </Transition>
                <Transition
                    appear
                    in = { isPostmanAppear }
                    timeout = { 2000 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear } >
                    <Postman
                        avatar = { avatar }
                        currentUserFirstName = { currentUserFirstName }
                    />
                </Transition>
                <Counter count = { posts.length } />
                <TransitionGroup>
                { postsJSX }
                </TransitionGroup>
                <Spinner isSpinning = { isSpinning } />
            </section>
        );
    }
}
