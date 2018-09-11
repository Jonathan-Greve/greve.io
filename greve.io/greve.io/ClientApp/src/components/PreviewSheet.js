import React, { Component } from 'react';
import {
    Image
} from 'react-bootstrap';
import './ImageSheet.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/ImageSheet';
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';

class PreviewSheet extends Component {
    render() {
        let sheet = null;
        let load = null;
        if (this.props.loading) {
            sheet = null;
            load = <AwesomeComponent />
        }
        else if (this.props.sheet) {
            console.log("Showing sheet.");
            sheet = <Image className="previewImage" src={this.props.sheet} responsive thumbnail />;
        }
        return (
            <div>
                {sheet}
                {load}
            </div>
        );
    }
}

const override = css`
    display: block;
    margin: auto;
    border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='sweet-loading'>
                <RingLoader
                    className={override}
                    sizeUnit={"px"}
                    size={200}
                    color={'#B8E986'}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PreviewSheet);