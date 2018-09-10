import React from 'react';
import { connect } from 'react-redux';
import {
    Jumbotron
} from 'react-bootstrap';

const Home = props => (
    <div>
        <Jumbotron>
            <h1>Welcome to Greve.io </h1>
        </Jumbotron>
        <p>Try creating an image sheet.</p>
        <ul>
            <li><a href='https://greve.io/imagesheet/'>Create an imagesheet</a></li>
        </ul>
    </div >
);

export default connect()(Home);
