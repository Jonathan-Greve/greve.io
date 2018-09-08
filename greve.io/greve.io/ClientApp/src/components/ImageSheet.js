import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup, PageHeader,
    Button, PanelGroup, Panel
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
        this.handleSelect1 = this.handleSelect1.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);

        this.state = {
            activeKey1: '1',
            activeKey2: '1'
        };
    }

    handleSelect1(activeKey1) {
        this.setState({ activeKey1 });
    }
    handleSelect2(activeKey2) {
        this.setState({ activeKey2 });
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
                    <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                </Jumbotron>
                <Row>
                    <Col lg={6}>
                        <PanelGroup
                            accordion
                            id="accordion-controlled-example1"
                            activeKey={this.state.activeKey1}
                            onSelect={this.handleSelect1}
                        >
                            <Panel eventKey="1">
                                <Panel.Heading>
                                    <Panel.Title toggle>Image upload</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <ImageUpload onImageUpload={this.handleImageUpload} />
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="2">
                                <Panel.Heading>
                                    <Panel.Title toggle>Set image format</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <ImageFormat />
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="3">
                                <Panel.Heading>
                                    <Panel.Title toggle>Set sheet format</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <SheetFormat />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Col>
                    <Col lg={6}>
                        <PanelGroup
                            accordion
                            id="accordion-controlled-example2"
                            activeKey={this.state.activeKey2}
                            onSelect={this.handleSelect2}
                        >
                            <Panel eventKey="1">
                                <Panel.Heading>
                                    <Panel.Title toggle>Crop image</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <CropImageWindow>
                                        <Button className="createSheetButton"
                                            onClick={this.handleCreateClick}
                                            bsStyle="success" bsSize="large" >
                                            Create image sheet
                                        </Button>
                                    </CropImageWindow>
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="2">
                                <Panel.Heading>
                                    <Panel.Title toggle>Preview sheet</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <PreviewSheet sheet={this.props.sheet}>
                                    </PreviewSheet>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
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
