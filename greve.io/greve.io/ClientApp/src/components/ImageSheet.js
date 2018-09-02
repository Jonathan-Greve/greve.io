﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup, PageHeader,
} from 'react-bootstrap'
import './ImageSheet.css'

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
    }

    handleImageUpload(image) {
        console.log(image);
        this.setState({
            image
        })
    }
    handleImageFormatChange(width, height) {
        this.setState({
            imageFormatWidth: width,
            imageFormatHeight: height
        })
    }

    handleSheetFormatChange(width, height) {
        this.setState({
            sheetFormatWidth: width,
            sheetFormatHeight: height
        })
    }
    componentWillMount() {
        // This method runs when the component is first added to the page
        //const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        //this.props.requestWeatherForecasts(startDateIndex);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        //const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
        //this.props.requestWeatherForecasts(startDateIndex);
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <PageHeader>Create image sheet</PageHeader>
                    <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                </Jumbotron>
                <Row>
                    <Col lg={5}>
                        <ImageUpload onImageUpload={this.handleImageUpload} />
                        <ImageFormat onImageFormatChange={this.handleImageFormatChange} />
                        <SheetFormat onSheetFormatChange={this.handleImageFormatChange} />
                    </Col>
                    <Col lg={7}>
                        <CropImageWindow image={this.state.image} aspectRatio={this.state.imageFormatHeight / this.state.imageFormatWidth} />
                    </Col>
                </Row>
            </div >
        );
    }
}

class ImageFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthValue: '',
            heightValue: ''
        }

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    getValidationState(choice) {
        const validationRegex = new RegExp('^[1-9][0-9]*$');
        var stateChoice;
        if (choice === "width") stateChoice = this.state.widthValue;
        else stateChoice = this.state.heightValue;

        const isNumber = validationRegex.test(stateChoice);
        const length = stateChoice.length;
        if (length > 0 && isNumber) {
            if (length < 4) return 'success';
            else return 'warning';
        }
        else if (!isNumber && length) return 'error';
        else return null;
    }

    handleWidthChange(e) {
        this.setState({
            widthValue: e.target.value
        });
        this.props.onImageFormatChange(e.target.value, this.state.heightValue);
    }

    handleHeightChange(e) {
        this.setState({
            heightValue: e.target.value
        });
        this.props.onImageFormatChange(this.state.widthValue, e.target.value);

    }
    render() {
        return (
            <Form>
                <PageHeader>(2) Choose the image format.</PageHeader>
                <p>Example: for US passport photos the width is 51mm and the height is 51mm. </p>
                <FormGroup
                    controlId="imageWidthFormat"
                    validationState={this.getValidationState("width")}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.widthValue}
                            placeholder="Enter width"
                            onChange={this.handleWidthChange}
                        />
                        <InputGroup.Addon>mm</InputGroup.Addon>
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 51).</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="imageHeightFormat"
                    validationState={this.getValidationState("height")}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.heightValue}
                            placeholder="Enter height"
                            onChange={this.handleHeightChange}
                        />
                        <InputGroup.Addon>mm</InputGroup.Addon>
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 51).</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

class SheetFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthValue: '',
            heightValue: ''
        }

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    getValidationState(choice) {
        const validationRegex = new RegExp('^[1-9][0-9]*$');
        var stateChoice;
        if (choice === "width") stateChoice = this.state.widthValue;
        else stateChoice = this.state.heightValue;

        const isNumber = validationRegex.test(stateChoice);
        const length = stateChoice.length;
        if (length > 0 && isNumber) {
            if (length < 4) return 'success';
            else return 'warning';
        }
        else if (!isNumber && length) return 'error';
        else return null;
    }

    handleWidthChange(e) {
        this.setState({
            widthValue: e.target.value
        });
    }

    handleHeightChange(e) {
        this.setState({
            heightValue: e.target.value
        });
    }
    render() {
        return (
            <Form>
                <PageHeader>(3) Choose the sheet format (print size).</PageHeader>
                <p>Example: For A4 paper the width is 210mm and the height is 297mm. </p>
                <FormGroup
                    controlId="sheetWidthFormat"
                    validationState={this.getValidationState("width")}
                >
                    <ControlLabel> Please input the sheet format width. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.widthValue}
                            placeholder="Enter width"
                            onChange={this.handleWidthChange}
                        />
                        <InputGroup.Addon>mm</InputGroup.Addon>
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 210).</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="sheetHeightFormat"
                    validationState={this.getValidationState("height")}
                >
                    <ControlLabel> Please input the sheet format width. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.heightValue}
                            placeholder="Enter height"
                            onChange={this.handleHeightChange}
                        />
                        <InputGroup.Addon>mm</InputGroup.Addon>
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 297).</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

class CropArea extends Component {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.isOnTopLeftCorner = this.isOnTopLeftCorner.bind(this);
        this.calculateCropAreaLeftEdge = this.calculateCropAreaLeftEdge.bind(this);
        this.calculateCropAreaRightEdge = this.calculateCropAreaRightEdge.bind(this);

        this.offsetX = 0;
        this.offsetY = 0;
        this.cropAreaX = 0;
        this.cropAreaY = 0;
        this.imageBorder = 5;
        this.state = {
            isMouseDown: false,
            left: 0,
            top: 0,
            width: 200,
            height: 200,
            imageWidth: 0,
            imageHeight: 0,
            cropAreaOffsetTop: 0,
            cropAreaOffsetLeft: 0,
            aspectRatio: 1
        }
    }

    componentDidMount() {
        let cropAreaStartLeft = document.getElementById("cropImageId").offsetLeft + this.imageBorder;
        let cropAreaStartTop = document.getElementById("cropImageId").offsetTop + this.imageBorder;
        let imageWidth = document.getElementById("cropImageId").offsetWidth;
        let imageHeight = document.getElementById("cropImageId").offsetHeight;
        let aspectRatio = !this.props.aspectRatio ? 1.0 : this.props.aspectRatio;
        this.setState({
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            cropAreaStartLeft: cropAreaStartLeft,
            cropAreaStartTop: cropAreaStartTop,
            left: cropAreaStartLeft,
            top: cropAreaStartTop,
            aspectRatio: aspectRatio,
            width: imageWidth / 3,
            height: (imageWidth / 3) * aspectRatio

        })
        console.log("Aspect Ratio props: ", this.props.aspectRatio);
        console.log("Aspect Ratio: ", this.state.aspectRatio);
        console.log("ImageWidth: ", imageWidth);
        console.log("ImageHeight: ", imageHeight);
        console.log("width didmount", this.state.width);
    }

    componentWillReceiveProps() {
        let aspectRatio = this.props.aspectRatio === null ? 1.0 : this.props.aspectRatio;
        this.setState({
            aspectRatio: aspectRatio,
            width: this.state.width,
            height: this.state.height * aspectRatio
        })
        console.log("Aspect Ratio: ", this.state.aspectRatio);
        console.log("height receiveprops", this.state.height);
    }

    calculateCropAreaLeftEdge(deltaX, deltaY) {
        let left = Math.max(this.state.cropAreaStartLeft, this.state.left - deltaX);
        return Math.min(this.state.imageWidth - this.state.width + 10, left);
    }
    calculateCropAreaRightEdge(deltaX, deltaY) {
        let top = Math.max(this.state.cropAreaStartTop, this.state.top - deltaY);
        return Math.min(this.state.imageHeight - this.state.height + 74, top);
    }

    isOnTopLeftCorner(xClickPos, yClickPos) {
        if (xClickPos < (this.state.cropAreaStartLeft + 10) && yClickPos < (this.state.cropAreaStartTop + 10)) return true;
        return false;
    }

    onMouseDown = function (e) {
        e.preventDefault();
        this.setState({
            isMouseDown: true,
        })

        // Saves the current mouse position. Used for calculating how much the mouse has moved: deltaX & deltaY.
        this.offsetX = e.pageX
        this.offsetY = e.pageY

        // rect.top is the client coordinates of the cropArea top edge. Likewise rect.left is the client coordinates of cropAreas left edge.
        var rect = e.target.getBoundingClientRect();

        // Calculates where inside the cropArea was clicked. Coordinates relative to cropArea (0 to cropAreas width).
        this.cropAreaX = e.clientX - rect.left;
        this.cropAreaY = e.clientY - rect.top;
        console.log("offsetX", document.getElementsByClassName("cropImageWindow")[0].offsetLeft);
        console.log("offsetY", document.getElementsByClassName("cropImageWindow")[0].offsetTop);
        console.log("this.state.cropAreaStartTop = ", this.state.cropAreaStartTop);
    }
    onMouseMove = function (e) {
        e.preventDefault();
        let deltaX = this.offsetX - e.pageX;
        let deltaY = this.offsetY - e.pageY;
        let resizeSpeed = 0.7;
        if (deltaX > 0) {
            resizeSpeed = 1.3;
        }
        if (this.state.isMouseDown) {
            const left = this.calculateCropAreaLeftEdge(deltaX, deltaY);
            const top = this.calculateCropAreaRightEdge(deltaX, deltaY);

            if (this.isOnTopLeftCorner(this.cropAreaX, this.cropAreaY)) {
                console.log("topLeftCorner HIT", left, top);
                this.setState({
                    width: this.state.width + deltaX * resizeSpeed,
                    height: (this.state.width + deltaX * resizeSpeed) * this.state.aspectRatio,
                    left: this.state.left - deltaX * resizeSpeed,
                    top: this.state.top - deltaX * resizeSpeed * this.state.aspectRatio
                })
            } else {
                console.log("MOVING CROP AREA", left, top);
                this.setState({
                    left: left,
                    top: top
                })
            }
            this.offsetX = e.pageX;
            this.offsetY = e.pageY;
        }
    }
    onMouseUp = function (e) {
        e.preventDefault();
        this.setState({
            isMouseDown: false
        })
    }

    render() {
        console.log("height render: ", this.state.height);
        console.log("width render: ", this.state.width);
        return (
            <div
                className="cropImageWindow" style={{ width: this.state.width, height: this.state.height, left: this.state.left, top: this.state.top }}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}>
            </div>
        );
    }
}

class CropImageWindow extends Component {
    render() {
        let croparea = null;
        if (this.props.image && this.props.aspectRatio) {
            croparea = <CropArea aspectRatio={this.props.aspectRatio} image={this.props.image} />;
        }
        else if (this.props.image){
            croparea = <LockedCropArea />
        }
        return (
            <CropImage image={this.props.image}>
                {croparea}
            </CropImage>
        );
    }
}

class LockedCropArea extends Component {
    render() {
        return (
            <div className="lockedCropArea">
                Set image format before cropping.
            </div>
        );
    }
}

class CropImage extends Component {
    render() {
        let img = null;
        let pageheader = null;
        if (this.props.image) {
            img = <Image onLoad={console.log("image loaded")} src={this.props.image.src} responsive thumbnail />;
            pageheader = <PageHeader>(4) Crop the image</PageHeader>;
        }
        return (
            <div>
                {pageheader}
                <div id="cropImageId">
                    {img}
                </div>
                {this.props.children}
            </div>
        );
    }
}
class ImageUpload extends React.Component {
    async _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        let image = new Image();

        reader.onload = () => {
            image.src = reader.result;
            this.props.onImageUpload(image);
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Form>
                <PageHeader>(1) Select an image</PageHeader>
                <FormGroup>
                    <FormControl
                        componentClass="input"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)}
                    />
                </FormGroup>
            </Form>
        )
    }
}

//function renderPagination(props) {
//    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
//    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

//    return <p className='clearfix text-center'>
//        <Link className='btn btn-default pull-left' to={`/fetchdata/${prevStartDateIndex}`}>Previous</Link>
//        <Link className='btn btn-default pull-right' to={`/fetchdata/${nextStartDateIndex}`}>Next</Link>
//        {props.isLoading ? <span>Loading...</span> : []}
//    </p>;
//}

export default connect(
    state => state
)(ImageSheet);
