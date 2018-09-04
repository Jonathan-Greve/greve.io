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

class CropImageWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            aspectRatio: 1.0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            image: nextProps.image,
            aspectRatio: nextProps.aspectRatio
        })
    }

    render() {
        let croparea = null;
        let img = null;
        let children = null;
        if (this.state.image && this.state.aspectRatio) {
            croparea = <CropArea aspectRatio={this.state.aspectRatio} image={this.state.image} />;
            img = <CropImage image={this.state.image} />;
            children = this.props.children;
        }
        else if (this.state.image) {
            croparea = <LockedCropArea />;
            img = <CropImage image={this.state.image} />;
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
    render() {
        return (
            <div >
                <PageHeader>(4) Crop the image</PageHeader>
                <div id="cropImageId">
                    <Image src={this.props.image.src} responsive thumbnail />
                </div>
            </div>
        );
    }
}

export default CropImageWindow