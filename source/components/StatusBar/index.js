
import React, {Component} from 'react';
import {withProfile } from '../../HOC/withProfile';
import  Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component{

    componentDidMount(){
        console.log('%c componentDidMount', 'background: #222; color:#ccc');
    }

    componentWillMount(){
        console.log('%c componentWillMount', 'background: #222; color:#ccc');
    }


    render(){
        console.log('%c render', 'background: #222; color:#ccc');
        const{avatar, currentUserFirstName, currentUserLastName} = this.props;
        return(
                         <section className = {Styles.statusBar}>
                            <div className = {`${Styles.offline} ${Styles.status}`}>

                                <div>Offline</div>
                                <span/>

                            </div>
                            <button>
                                <img src={avatar} />
                                <span>{currentUserFirstName}</span>
                                &nbsp;
                                <span>{currentUserLastName}</span>
                            </button>
                        </section>
                    )
                }
}
