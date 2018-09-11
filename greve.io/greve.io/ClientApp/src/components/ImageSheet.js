import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Col, Row, Jumbotron,
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
        this.handleSelect = this.handleSelect.bind(this);
        this.toggleImage = this.toggleImage.bind(this);
        this.togglePreview = this.togglePreview.bind(this);

        this.state = {
            activeKey: '1',
        };
    }
    toggleImage(shouldShow) {
        this.props.setShowImage(shouldShow);
    }
    togglePreview(shouldShow) {
        this.props.setShowPreview(shouldShow);
    }

    handleSelect(activeKey) {
        console.log("HandleSelect called");
        this.setState({ activeKey });
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
        console.log("showImage: ", this.props.showImage);
        console.log("showPreview: ", this.props.showPreview);
        let col2 = null;
        if (this.props.image.src) {
            col2 = <Col lg={6}>
                <PanelGroup
                    id="accordion-controlled-example2"
                    activeKey={this.state.activeKey}
                    onSelect={this.handleSelect}
                >
                    <Panel eventKey="4" expanded={this.props.showImage} onToggle={this.toggleImage}>
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
                    <Panel eventKey="5" expanded={this.props.showPreview} onToggle={this.togglePreview}>
                        <Panel.Heading>
                            <Panel.Title toggle>Preview sheet</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <PreviewSheet>
                            </PreviewSheet>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </Col>;
        }
        return (
            <div>
                <Jumbotron>
                    <h1>Create image sheet</h1>
                    <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                </Jumbotron>
                <Row>
                    <Col lg={6}>
                        <PanelGroup
                            id="accordion-controlled-example1"
                            activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}
                        >
                            <Panel eventKey="1" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>Image upload</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <ImageUpload onImageUpload={this.handleImageUpload} />
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="2" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>Set image format</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <ImageFormat />
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="3" defaultExpanded >
                                <Panel.Heading>
                                    <Panel.Title toggle>Set sheet format</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <SheetFormat />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Col>
                    {col2}
                </Row >
            </div >
        );
    }
}

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ImageSheet);
