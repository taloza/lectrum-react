import React from 'react';

// Instruments
import Styles from './styles.m.css';

const Postman = ({ avatar, currentUserFirstName }) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>
            Welcome online, <b>{ currentUserFirstName }</b>!
        </span>
    </section>
);

export default Postman;
