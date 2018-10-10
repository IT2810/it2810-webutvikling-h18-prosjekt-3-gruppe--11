import React from 'react';
import { SwipeableList } from '../SwipableList';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

const listData = [
    'En oppgave',
    'En annen oppgave',
    'Fullført oppgave'
];

test('renders correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SwipeableList todos={listData}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
