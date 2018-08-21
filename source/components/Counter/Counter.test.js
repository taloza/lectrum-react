import React from 'react';
import Counter from './';
import dom from 'react-test-renderer';

const renderTree = dom.create(<Counter count = { 5 }/>).toJSON();

test('Counter Component should  to its snapshot', () =>{
    expect(renderTree).toMatchSnapshot();
});
