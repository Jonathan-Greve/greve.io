import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup, PageHeader,
    Button,
} from 'react-bootstrap';
import CropArea from './CropArea.js';
import { actionCreators } from '../store/ImageSheet';

class CropImageWindow extends Component {
    componentWillReceiveProps(nextProps) {
        console.log("CROP IMAGE WINDOW will rececive props");
    }

    render() {
        let croparea = null;
        let img = null;
        let children = null;
        if (this.props.image.src && this.props.image.imageFormatAspectRatio) {
            croparea = <CropArea aspectRatio={this.props.image.imageFormatAspectRatio} />;
            img = <CropImage image={this.props.image} />;
            children = this.props.children;
        }
        else if (this.props.image.src) {
            croparea = <LockedCropArea />;
            img = <CropImage image={this.props.image} />;
        }
        return (
            <div>
                {img}
                {croparea}
                {children}
            </div>
        );
    }
}

class LockedCropArea extends Component {
    render() {
        console.log("LockedCropArea render");
        return (
            <div className="lockedCropArea">
                Set image format before cropping.
            </div>
        );
    }
}

class CropImage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                <PageHeader>(4) Crop the image</PageHeader>
                <div id="cropImageId">
                    <Image className="cropImage" src={this.props.image.src} responsive thumbnail />
                </div>
            </div>
        );
    }
}


export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CropImageWindow);