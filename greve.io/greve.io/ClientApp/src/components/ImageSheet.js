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
import './ImageSheet.css';
import ImageUpload from './ImageUpload.js';
import ImageFormat from './ImageFormat.js';
import SheetFormat from './SheetFormat.js';
import CropImageWindow from './CropImageWindow.js';
import PreviewSheet from './PreviewSheet.js';
import { actionCreators } from '../store/ImageSheet';

class ImageSheet extends Component {
    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImageFormatChange = this.handleImageFormatChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
    }

    componentWillMount() {
        console.log("WillMount IMAGESHEET COMPONENT");
        this.props.setImage(this.props.image);
        this.props.requestSheet(this.props.image);
    }

    componentWillReceiveProps(nextProps) {
        console.log("WillReceiveProps IMAGESHEET COMPONENT");
    }

    calculateAspectRatio() {
        if (this.props.image.imageFormatHeight === 0 || this.props.image.imageFormatWidth === 0) {
            return NaN;
        }
        return this.props.image.imageFormatHeight / this.props.image.imageFormatWidth;
    }

    handleCreateClick() {
        this.props.image.xStart = 2100;
        this.props.image.yStart = 1400;
        this.props.image.cropWidth = 2000;
        this.props.image.cropHeight = 2000;
        this.props.setImage(this.props.image);
        console.log(this.props.image);
        this.props.requestSheet(this.props.image);
    }

    handleImageUpload(src) {
        console.log("settingImageState in redux store");
        this.props.image.src = src;
        this.props.setImage(this.props.image);
    }
    handleImageFormatChange(width, height) {
        this.props.image.imageFormatWidth = width;
        this.props.image.imageFormatHeight = height;
        this.props.image.imageFormatAspectRatio = this.calculateAspectRatio();
        this.props.setImage(this.props.image);
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <PageHeader>Create image sheet</PageHeader>
                    <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                </Jumbotron>
                <Row>
                    <Col lg={6}>
                        <ImageUpload onImageUpload={this.handleImageUpload} />
                        <ImageFormat onImageFormatChange={this.handleImageFormatChange} />
                        <SheetFormat />
                    </Col>
                    <Col lg={6}>
                        <CropImageWindow> 
                            <Button className="createSheetButton"
                                onClick={this.handleCreateClick}
                                bsStyle="success" bsSize="large" >
                                Create image sheet
                             </Button>
                        </CropImageWindow>
                        <PreviewSheet sheet={this.props.sheet}>
                        </PreviewSheet>
                    </Col>
                </Row >
            </div >
        );
    }
}

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ImageSheet);
