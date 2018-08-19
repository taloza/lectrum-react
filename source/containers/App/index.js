import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import {string} from 'prop-types';

import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed/index';
import {Provider} from '../../HOC/withProfile';
import avatar from '../../theme/assets/homer.png';

const config = {
    avatar,
    currentUserFirstName: 'Tatiana',
    currentUserLastName: 'Loza'
};

@hot(module)
export default class App extends Component{
    render(){
        return (
            <Catcher>
                <Provider value = {config} >
                    <Feed {...config}/>
                </Provider>
                {/*<Feed */}
                {/*avatar = {config.avatar} другая форма записи*/}
                {/*currentUserFirsName={config.currentUserFirsName}*/}
                {/*currentUserLastName={config.currentUserLastName} */}
                {/*/>*/}
            </Catcher>
        );
    }
}
