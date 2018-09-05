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
import CropImageWindow from './CropImageWindow';
import { actionCreators } from '../store/ImageSheet';

class ImageSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageFormatWidth: 0,
            imageFormatHeight: 0,
            sheetFormatWidth: 0,
            sheetFormatHeight: 0
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImageFormatChange = this.handleImageFormatChange.bind(this);
        this.handleSheetFormatChange = this.handleSheetFormatChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.sheet);
        var imageHandle = { ...this.state.image };
        imageHandle.src = nextProps.sheet;
        this.setState({
            image: imageHandle
        });
    }

    calculateAspectRatio() {
        if (this.state.imageFormatHeight === 0 || this.state.imageFormatWidth === 0) {
            return NaN;
        }
        return this.state.imageFormatHeight / this.state.imageFormatWidth;
    }

    handleCreateClick() {
        console.log(this.state.image.src);
        this.props.requestSheet(this.state.imageFormatWidth, this.state.imageFormatHeight,
            this.state.sheetFormatWidth, this.state.sheetFormatHeight, 0, 0, 10, 18,
            this.state.image.src);
    }

    handleImageUpload(image) {
        console.log(image);
        this.setState({
            image: image
        });
    }
    handleImageFormatChange(width, height) {
        this.setState({
            imageFormatWidth: width,
            imageFormatHeight: height
        });
    }

    handleSheetFormatChange(width, height) {
        this.setState({
            sheetFormatWidth: width,
            sheetFormatHeight: height
        });
    }

    render() {
        console.log("render width", this.state.imageFormatWidth);
        console.log("render height", this.state.imageFormatHeight);
        const aspectRatio = this.calculateAspectRatio();
        console.log("render aspecRatio", aspectRatio);
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
                        <SheetFormat onSheetFormatChange={this.handleSheetFormatChange} />
                    </Col>
                    <Col lg={6}>
                        <CropImageWindow image={this.state.image} aspectRatio={aspectRatio}>
                            <Button className="createSheetButton"
                                onClick={this.handleCreateClick}
                                bsStyle="success" bsSize="large" >
                                Create image sheet
                             </Button>
                        </CropImageWindow>
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
