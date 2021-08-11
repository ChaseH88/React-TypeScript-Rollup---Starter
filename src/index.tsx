import React, { FC } from 'react';
import { render } from 'react-dom'

/**
 * Root HTML element for React application
 */
const root = document.querySelector('#root');

/**
 * The main "starting point" component
 */
const App: FC = () => (
    <p>CNC Map Component</p>
);


/**
 * React Dom - render to browser
 */
render(<App />, root);
