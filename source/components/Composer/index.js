import React, {Component} from 'react';
import {withProfile} from '../../HOC/withProfile';
import  Styles from './styles.m.css';

export class Composer extends Component {
    static propTypes = {
    }

    state = {
       comment:'',
    }

    _handleTextAreaChange = (event) => {
        const { value } = event.target;

        this.setState({
            comment: event.target.value,
        });
    }

    _createPost(){
        const { _createPost } = this.props;
        const { comment } = this.state;

        if (!comment.trim()) {
            return null;
        }
        _createPost(comment);
        this.setState({
            comment:'',
        })
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        const { _createPost } = this.props;
        const { comment } = this.state;
        if (!comment.trim()) {
            return null;
        }
        _createPost(comment);
        this.setState({
            comment: '',
        })
    }

    _handleTextareaCopy = (event) => {
        event.preventDefault();
        };

    _handleTextareaKeyPress = (event) => {
        const enterKey = event.key ==='Enter';
        if(enterKey){
            event.preventDefault();
            this._createPost();
        }
    };


    render(){
        const {avatar, currentUserFirstName} = this.props;
        const {comment} = this.state;

        return(
               <section className={Styles.composer}>
                       <img src={avatar}/>
                       <form
                            onSubmit = {this._handleFormSubmit}
                            >
                                <textarea
                                    placeholder = {`What is on your mind, ${currentUserFirstName}`}
                                    value = {comment}
                                    onChange  = {this._handleTextAreaChange}
                                    onCopy = {this._handleTextareaCopy}
                                    onKeyPress = {this._handleTextareaKeyPress}
                                />
                                <input type='submit' value='Post'/>
                            </form>
                        </section>
            )
        }
}

export default withProfile(Composer);
