import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup
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
        console.log("handleImageFormatChange");
        this.setState({
            imageFormatWidth: width,
            imageFormatHeight: height
        })
    }

    handleSheetFormatChange(width, height) {
        console.log("handleImageFormatChange");
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
                    <h1>Create image sheet</h1>
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
            </div>
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
        console.log("handlelWidthChange in imageFormat: " + e.target.value);
        this.setState({
            widthValue: e.target.value
        });
        this.props.onImageFormatChange(e.target.value, this.state.heightValue);
    }

    handleHeightChange(e) {
        console.log("handlelHeightChange in imageFormat: " + e.target.value);
        this.setState({
            heightValue: e.target.value
        });
        this.props.onImageFormatChange(this.state.widthValue, e.target.value);
    }
    render() {
        return (
            <Form>
                <h1>Choose the image format.</h1>
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
        console.log("handlelWidthChange in imageFormat: " + e.target.value);
        this.setState({
            widthValue: e.target.value
        });
    }

    handleHeightChange(e) {
        console.log("handlelHeightChange in imageFormat: " + e.target.value);
        this.setState({
            heightValue: e.target.value
        });
    }
    render() {
        return (
            <Form>
                <h1>Choose the sheet format.</h1>
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
    render() {
        console.log("CropArea" + this.props.aspectRatio);
        const _width = 200;
        let _height = 200;
        if (this.props.aspectRatio < 100) { _height = _width * this.props.aspectRatio; }
        console.log("_width: " + _width);
        console.log("_height: " + _height);

        return (
            <div draggable="true" className="cropImageWindow" style={{ width: _width, height: _height }}>
            </div>
        );
    }
}

class CropImageWindow extends Component {
    render() {
        console.log(this.props.image.width);
        return (
            <div>
                <CropImage image={this.props.image} />
                <CropArea aspectRatio={this.props.aspectRatio}/>
            </div>
        );
    }
}

class CropImage extends Component {
    render() {
        let img = null;
        if (this.props.image) {
            img = <Image src={this.props.image} responsive thumbnail />;
        }
        return (
            img
        );
    }
}
class ImageUpload extends React.Component {
    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.props.onImageUpload(reader.result);
        }
    }

    render() {
        return (
            //<div>
            //    <h1>Upload image</h1>
            //    <p>Upload and image in the formats: .PNG, .JPG, .GIF </p>
            //    <input className="fileInput"
            //        type="file"
            //        onChange={(e) => this._handleImageChange(e)}
            //    />
            //</div>
            <Form>
                <h1>Select an image</h1>
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
