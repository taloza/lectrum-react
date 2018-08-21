import React, { Component } from 'react';
import { string } from 'prop-types';
import { withProfile } from '../../HOC/withProfile';

import Styles from './styles.m.css';
import { createPostfix } from 'typescript';

export class Composer extends Component {
    static propTypes = {
        avatar: string.isRequired,
    };

    state = {
        comment: '',
    }

    _handleTextareaChange = (event) => {
        const { value } = event.target;

        this.setState({
            comment: event.target.value,
        });
    }

    _createPost() {
        const { _createPostAsync } = this.props;
        const { comment } = this.state;

        if (!comment.trim()) {
            return null;
        }

        _createPostAsync(comment);

        this.setState({
            comment: '',
        })
    }

    _handleTextareaKeyPress = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._createPost();
        }
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        this._createPost();
    }

    _handleTextareaCopy = (event) => {
        event.preventDefault();
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { comment } = this.state;

        return (
            <section className = { Styles.composer } >
                <img src = { avatar } />
                <form
                    onSubmit = { this._handleSubmit }
                >
                    <textarea
                        placeholder = { `What's on your mind, ${currentUserFirstName}` }
                        value = { comment }
                        onCopy = { this._handleTextareaCopy }
                        onChange = { this._handleTextareaChange }
                        onKeyPress = { this._handleTextareaKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
