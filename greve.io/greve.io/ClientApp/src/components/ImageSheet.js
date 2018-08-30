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
            <Row>
                <Jumbotron>
                    <h1>Create image sheet</h1>
                    <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                </Jumbotron>
                <Col lg={5}>
                    <ImageUpload onImageUpload={this.handleImageUpload} />
                    <ImageFormat onImageFormatChange={this.handleImageFormatChange} />
                    <SheetFormat onSheetFormatChange={this.handleImageFormatChange} />
                </Col>
                <Col lg={7}>
                    <CropImageWindow image={this.state.image} />
                </Col>
            </Row>
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

    getValidationState() {
        const validationRegex = new RegExp('[1-9][0-9]*');
        const isNumber = validationRegex.test(this.state.widthValue)
        const lenght = this.state.widthValue.lenght;
        if (lenght > 0 && isNumber) {
            if (lenght < 5) return 'success';
            else return 'warning';
        }
        else return 'error';
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
                <FormGroup
                    controlId="imageWidthFormat"
                    validationState={this.getValidationState()}
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
                    controlId="imageHeightFormat"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.heightValue}
                        placeholder="Enter height"
                        onChange={this.handleHeightChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Input has to be an integer (eg. 51).</HelpBlock>
                </FormGroup>
            </Form>
            //<Row>
            //    <h1>Choose the image format. </h1>
            //    <p>Example: for US passport photos the width is 51mm and the height is 51mm. </p>
            //    <Col lg={6}>
            //        Width: <input
            //            type="text"
            //            name="width"
            //            placeholder="38"
            //        />mm
            //    </Col>
            //    <Col lg={6}>
            //        Height: <input
            //            type="text"
            //            name="height"
            //            placeholder="48"
            //        />mm
            //    </Col>
            //</Row >
        );
    }
}

class SheetFormat extends Component {

    render() {
        return (
            <Row>
                <h1>Choose the sheet format. </h1>
                <p>Example: For A4 paper the width is 210mm and the height is 297mm. </p>
                <Col lg={6}>
                    Width: <input type="text" placeholder="210" />mm
                </Col>
                <Col lg={6}>
                    Height: <input type="text" placeholder="297" />mm
                </Col>
            </Row >
        );
    }
}

class CropImageWindow extends Component {
    render() {
        return (
            <Row>
                <div className="CropImageWindow">
                    <CropImage image={this.props.image} />
                </div>
            </Row>
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
            <Row>
                <h1>Upload image</h1>
                <p>Upload and image in the formats: .PNG, .JPG, .GIF </p>
                <input className="fileInput"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)}
                />
            </Row>
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
