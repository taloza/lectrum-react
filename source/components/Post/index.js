import React, { Component } from 'react';
import moment from 'moment';
import { string, func } from 'prop-types';
import {withProfile} from "../../HOC/withProfile";
import Like from "../Like";

import Styles from './styles.m.css';


export class Post extends Component {
    static propTypes = {
        avatar:  string.isRequired,
        comment: string.isRequired,
        currentUserFirstName:string.isRequired,
        currentUserLastName:string.isRequired,
        _removePostAsync: func.isRequired,

    };
     _deletePost = (e)=>{
        //console.log ('delll')
        this.props._removePostAsync(this.props.id);

    }
    _getCross () {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return `${firstName} ${lastName}` ===  `${currentUserFirstName} ${currentUserLastName}`
            ?  <span
                className = { Styles.cross }
                onClick = { this._deletePost}
            />
            : null;
    }

    render () {
        const {
            id,
            avatar,
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
            comment,
            created,
            likes,
            _likePostAsync,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post } >
                {cross}
                <img src = { avatar } />
                <a>{firstName} {lastName}</a>
                <time>{ moment().format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
                <Like
                    id={id}
                    likes = {likes}
                    _likePostAsync = {_likePostAsync}/>
            </section>
        );
    }
}
export default withProfile(Post);
