import React, { Component } from 'react';
import StatusBar from "../StatusBar";
import Composer from "../Composer";
import Post from "../Post";
import  Styles from './styles.m.css';
import { string } from "prop-types";
import {getUniqueID } from '../../instruments';
import Counter from "../Counter";
import Catcher from "../Catcher";


export default class Feed extends Component{
    static propTypes = {//валидация
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

state = {
    posts:[],
}
_createPost = (comment) =>{
    this.setState((prevState) =>({
        posts:[{id:getUniqueID(), comment }, ...prevState.posts],
    }));
}
_deletePost = (commentId) =>{
   const posts = this.state.posts;
   this.setState({
       posts:posts.filter(
           (item)=>{
               return item.id !== commentId;
           })
   });

}


    render(){
        //console.log(this.props)
        const {avatar, currentUserFirstName, currentUserLastName} = this.props;
        const{ posts} = this.state;

        const postsJSX = posts.map((post)=> (
            <Catcher
            key = {post.id}>
            <Post
                id = {post.id}
                avatar={this.props.avatar}
                currentUserFirstName = {this.props.currentUserFirstName}
                currentUserLastName = {this.props.currentUserLastName}
                comment = {post.comment}
                onRemove = {this._deletePost}

            />
            </Catcher>
        ));


        return (
            <section className = {Styles.feed}>
                <StatusBar/>
                <Composer
                    avatar = {avatar}
                    _createPost = {this._createPost}
                />
                <Counter count={this.state.posts.length}/>
                {postsJSX}
            </section>
        );
    }
}
