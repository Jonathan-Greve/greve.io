import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup, PageHeader,
    Button,
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

    calculateAspectRatio() {
        if (this.state.imageFormatHeight === 0 || this.state.imageFormatWidth === 0) {
            return NaN;
        }
        return this.state.imageFormatHeight / this.state.imageFormatWidth;
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
            sheetFormatWidth: height
        });
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

class ImageFormat extends Component {
    constructor(props) {
        super(props);
        this.hasChanged;
        this.state = {
            widthValue: 0,
            heightValue: 0
        }

        this.validationRegex = new RegExp('^[1-9][0-9]*$');

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    componentDidUpdate(nextProps) {
        if (this.hasChanged) {
            this.props.onImageFormatChange(parseInt(this.state.widthValue), parseInt(this.state.heightValue));
        }
        this.hasChanged = false;
    }

    getValidationState(choice) {
        var stateChoice;
        if (choice === "width") stateChoice = this.state.widthValue;
        else stateChoice = this.state.heightValue;

        const isNumber = this.validationRegex.test(stateChoice);
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
            widthValue: this.validationRegex.test(e.target.value) ? e.target.value : "0"
        });
        this.hasChanged = true;
    }

    handleHeightChange(e) {
        this.setState({
            heightValue: this.validationRegex.test(e.target.value) ? e.target.value : "0"
        });
        this.hasChanged = true;
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

        this.hasChanged = false;
        this.validationRegex = new RegExp('^[1-9][0-9]*$');

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    componentDidUpdate() {
        if (this.hasChanged) {
            this.props.onSheetFormatChange(parseInt(this.state.widthValue), parseInt(this.state.heightValue));
        }
        this.hasChanged = false;
    }

    getValidationState(choice) {
        var stateChoice;
        if (choice === "width") stateChoice = this.state.widthValue;
        else stateChoice = this.state.heightValue;

        const isNumber = this.validationRegex.test(stateChoice);
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
            widthValue: this.validationRegex.test(e.target.value) ? e.target.value : "0"
        });
        this.hasChanged = true;
    }

    handleHeightChange(e) {
        this.setState({
            heightValue: this.validationRegex.test(e.target.value) ? e.target.value : "0"
        });
        this.hasChanged = true;
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
        this.calculateCropAreaLeftEdge = this.calculateCropAreaLeftEdge.bind(this);
        this.calculateCropAreaRightEdge = this.calculateCropAreaRightEdge.bind(this);

        this.isOnTopLeftCorner = this.isOnTopLeftCorner.bind(this);
        this.isOnTopRightCorner = this.isOnTopRightCorner.bind(this);
        this.isOnBottomLeftCorner = this.isOnBottomLeftCorner.bind(this);
        this.isOnBottomRightCorner = this.isOnBottomRightCorner.bind(this);

        this.resizeTopLeft = this.resizeTopLeft.bind(this);
        this.resizeTopRight = this.resizeTopRight.bind(this);
        this.resizeBottomLeft = this.resizeBottomLeft.bind(this);
        this.resizeBottomRight = this.resizeBottomRight.bind(this);

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
        };
    }
    resizeTopLeft(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX > 0) {
            resizeSpeed = 1.3;
        }
        this.setState({
            width: this.state.width + deltaX * resizeSpeed,
            height: (this.state.width + deltaX * resizeSpeed) * this.state.aspectRatio,
            left: this.state.left - deltaX * resizeSpeed,
            top: this.state.top - deltaX * resizeSpeed * this.state.aspectRatio
        })
    }

    resizeTopRight(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX < 0) {
            resizeSpeed = 1.3;
        }
        this.setState({
            width: this.state.width - deltaX * resizeSpeed,
            height: (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio,
            top: this.state.top + deltaX * resizeSpeed * this.state.aspectRatio
        })
    }

    resizeBottomLeft(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX > 0) {
            resizeSpeed = 1.3;
        }
        this.setState({
            width: this.state.width + deltaX * resizeSpeed,
            height: (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio,
            left: this.state.left - deltaX * resizeSpeed,
        })
    }

    resizeBottomRight(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX < 0) {
            resizeSpeed = 1.3;
        }
        this.setState({
            width: this.state.width - deltaX * resizeSpeed,
            height: (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio,
        })
    }

    componentDidMount() {
        let cropAreaStartLeft = document.getElementById("cropImageId").offsetLeft + this.imageBorder;
        let cropAreaStartTop = document.getElementById("cropImageId").offsetTop + this.imageBorder;
        let imageWidth = document.getElementById("cropImageId").offsetWidth;
        let imageHeight = document.getElementById("cropImageId").offsetHeight;
        this.setState({
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            cropAreaStartLeft: cropAreaStartLeft,
            cropAreaStartTop: cropAreaStartTop,
            left: cropAreaStartLeft,
            top: cropAreaStartTop,
            aspectRatio: this.props.aspectRatio,
            width: imageWidth / 3,
            height: (imageWidth / 3) * this.props.aspectRatio 
        })
    };

    componentWillReceiveProps(nextProps) {
        let cropAreaStartLeft = document.getElementById("cropImageId").offsetLeft + this.imageBorder;
        let cropAreaStartTop = document.getElementById("cropImageId").offsetTop + this.imageBorder;
        let imageWidth = document.getElementById("cropImageId").offsetWidth;
        let imageHeight = document.getElementById("cropImageId").offsetHeight;
        let aspectRatio = !nextProps.aspectRatio ? 1.0 : nextProps.aspectRatio;
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
        });
    }

    calculateCropAreaLeftEdge(deltaX, deltaY) {
        let left = Math.max(this.state.cropAreaStartLeft, this.state.left - deltaX);
        return Math.min(this.state.imageWidth - this.state.width + this.state.cropAreaStartLeft - this.imageBorder * 2, left);
    }
    calculateCropAreaRightEdge(deltaX, deltaY) {
        let top = Math.max(this.state.cropAreaStartTop, this.state.top - deltaY);
        return Math.min(this.state.imageHeight - this.state.height + this.state.cropAreaStartTop - this.imageBorder * 2, top);
    }

    isOnTopLeftCorner(xClickPos, yClickPos) {
        if (xClickPos < 30 && yClickPos < 30) return true;
        return false;
    }

    isOnTopRightCorner(xClickPos, yClickPos) {
        console.log("xClickPos, yClickPos, Width, Height", xClickPos, yClickPos, this.state.width, this.state.height);
        if (xClickPos > (this.state.width - 30) && yClickPos < 30) return true;
        return false;
    }

    isOnBottomLeftCorner(xClickPos, yClickPos) {
        if (xClickPos < 30 && yClickPos > (this.state.height - 30)) return true;
        return false;
    }

    isOnBottomRightCorner(xClickPos, yClickPos) {
        if (xClickPos > (this.state.width - 30) && yClickPos > (this.state.height - 30)) return true;
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
        console.log("cropAreaX = ", this.cropAreaX);
        console.log("cropAreaY = ", this.cropAreaY);
    }
    onMouseMove = function (e) {
        e.preventDefault();
        let deltaX = this.offsetX - e.pageX;
        let deltaY = this.offsetY - e.pageY;

        //BUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!! WHEN RESIZING ANYTHING BUT TOP LEFT, THE this.state.width or this.state.height will change while resizing causing the resizing to end.
        //FIND A WAY TO RESIZE EITHER WITHOUT USING THESE TWO STATES OR SET A VALUE INDICATING A RESIZE IS IN PROGRESS UNTIL MOUSEUP AND NOT TO INTERRUPT IT.
        if (this.state.isMouseDown) {
            if (this.isOnTopLeftCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeTopLeft(deltaX);
            }
            else if (this.isOnTopRightCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeTopRight(deltaX);
            }
            else if (this.isOnBottomLeftCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeBottomLeft(deltaX)
            }
            else if (this.isOnBottomRightCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeBottomRight(deltaX)
            }
            else {
                console.log("MOVING NOT RESIZING!");
                this.setState({
                    left: this.calculateCropAreaLeftEdge(deltaX, deltaY),
                    top: this.calculateCropAreaRightEdge(deltaX, deltaY)
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
        });
    }

    render() {
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
class ImageUpload extends React.Component {
    async _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        let image = new Image();

        reader.onloadend = () => {
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
