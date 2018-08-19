// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Theme
import './theme/init';

import App from './containers/App';

// const H1 = <h1 title = 'a title'> Hellooo!</h1>;
// const H1 = () => <h1 title = 'a title'> Hellooo!</h1>;

// const list = [...Array(10).keys()].map((item, index) =>
//     <li key = {index}> list item:{item} </li>
// );

ReactDOM.render( <App/>, document.getElementById('app'));

