import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock
} from 'react-bootstrap'
import './ImageSheet.css'

class ImageSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageFormatWidth: 0,
            imageFormatHeigth: 0,
            sheetFormatWidth: 0,
            sheetFormatHeigth: 0
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
    handleImageFormatChange(width, heigth) {
        console.log("handleImageFormatChange");
        this.setState({
            imageFormatWidth: width,
            imageFormatHeigth: heigth
        })
    }

    handleSheetFormatChange(width, heigth) {
        console.log("handleImageFormatChange");
        this.setState({
            sheetFormatWidth: width,
            sheetFormatHeigth: heigth
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
                        <CropImageWindow image={this.state.image} />
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
            heigthValue: ''
        }

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeigthChange = this.handleHeigthChange.bind(this);
    }

    getValidationState(choice) {
        const validationRegex = new RegExp('^[1-9][0-9]*$');
        var stateChoice;
        if (choice === "width") stateChoice = this.state.widthValue;
        else stateChoice = this.state.heigthValue;
        
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

    handleHeigthChange(e) {
        console.log("handlelHeigthChange in imageFormat: " + e.target.value);
        this.setState({
            heigthValue: e.target.value
        });
    }
    render() {
        return (
            <Form>
                <h1>Choose the image format.</h1>
                <p>Example: for US passport photos the width is 51mm and the heigth is 51mm. </p>
                <FormGroup
                    controlId="imageWidthFormat"
                    validationState={this.getValidationState("width")}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.widthValue}
                        placeholder="Enter width"
                        onChange={this.handleWidthChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 51).</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="imageHeigthFormat"
                    validationState={this.getValidationState("heigth")}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.heigthValue}
                        placeholder="Enter heigth"
                        onChange={this.handleHeigthChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 51).</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

class SheetFormat extends Component {

    render() {
        return (
            <div>
                <h1>Choose the sheet format. </h1>
                <p>Example: For A4 paper the width is 210mm and the heigth is 297mm. </p>
                <Col lg={6}>
                    Width: <input type="text" placeholder="210" />mm
                </Col>
                <Col lg={6}>
                    Heigth: <input type="text" placeholder="297" />mm
                </Col>
            </div>
        );
    }
}

class CropImageWindow extends Component {
    render() {
        return (
            <div className="CropImageWindow">
                <CropImage image={this.props.image} />
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
            <div>
                <h1>Upload image</h1>
                <p>Upload and image in the formats: .PNG, .JPG, .GIF </p>
                <input className="fileInput"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)}
                />
            </div>
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
