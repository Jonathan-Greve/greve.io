import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import CropArea from './CropArea.js';
import { actionCreators } from '../store/ImageSheet';

class CropImageWindow extends Component {
    render() {
        let img = null;
        let children = null;
        if (this.props.image.src && this.props.image.imageFormatAspectRatio) {
            img = <CropImage image={this.props.image} />;
            children = this.props.children;
        }
        else if (this.props.image.src) {
            img = <CropImage image={this.props.image} />;
        }
        return (
            <div>
                {img}
                {children}
            </div>
        );
    }
}

class CropImage extends Component {
    render() {
        let img = null;
        let croparea = null;
        let lockedimg = null;
        if (this.props.image.src && this.props.image.imageFormatAspectRatio) {
            croparea = <CropArea />;
            lockedimg = null;
            img = <Image className="cropImage" src={this.props.image.src} style={{ maxHeight: this.imageHeight }} responsive thumbnail />;
        }
        else if (this.props.image.src) {
            lockedimg = <div className="lockedImage">Please set the Image Format before cropping.</div>;
            img = <Image className="cropImageLocked" src={this.props.image.src} style={{ maxHeight: this.imageHeight }} responsive thumbnail />;
        }
        return (
            <div >
                <div id="cropImageId">
                    {img}
                    {lockedimg}
                    {croparea}
                </div>
            </div>
        );
    }
}


export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CropImageWindow);