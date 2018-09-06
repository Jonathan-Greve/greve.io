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


    handleCreateClick() {
        this.props.setImage(this.props.image);
        this.props.requestSheet(this.props.image);
    }

    handleImageUpload(src) {
        console.log("settingImageState in redux store");
        this.props.image.src = src;
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
                        <ImageFormat />
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
