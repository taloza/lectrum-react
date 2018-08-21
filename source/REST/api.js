import {MAIN_URL, TOKEN} from './config';

export const api = {
    async fetchPosts(){
        const response = await fetch(`${MAIN_URL}?size=100`,{ //поставили lim на получение 100 постов
            metod:'GET',
        });
        if (response.status !== 200){
            throw new Error('Posts were not loaded');
        }
        const {data: posts} = await response.json();

        return posts;
    },
    async createPost(comment){
        const response = await fetch(MAIN_URL,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({
                comment,
            }),
        });
        if(response.status !== 200){
            throw new Error('Create were not loaded');
        }
        const{data: post} = await response.json();
        return post;
    },

async removePost(id){
    const response = await fetch(`${MAIN_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: TOKEN
        }
    });
    if (response.status !==204){
        throw new Error('Post werw not deleted');
    }
    return null;
},

async likePost(id){
        const response = await fetch(`${MAIN_URL}/${id}`,{
            method: 'PUT',
            headers:{
                Authorization: TOKEN
            },
        });

        if(response.status !==200){
            throw new Error('Post was not liked!');
        }
        const{data: likedPost} = await response.json();

        return likedPost;
}
}
