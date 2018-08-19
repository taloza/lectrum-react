import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        comment:              string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };
     onClickHandler = (e)=>{
        //console.log ('delll')
        this.props.onRemove(this.props.id)

    }

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            comment
        } = this.props;

        if (comment === '3'){
            undefined();
        }

        return (
            <section className = { Styles.post } >
                <span className = { Styles.cross } onClick={this.onClickHandler} />
                <img src = { avatar } />
                <a>{currentUserFirstName} {currentUserLastName}</a>
                <time>{ moment().format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
            </section>
        );
    }
}
