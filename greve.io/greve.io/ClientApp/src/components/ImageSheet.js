import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Image, Jumbotron } from 'react-bootstrap'
import './ImageSheet.css'

class ImageSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            image: ''
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleImageUpload(image) {
        console.log(image);
        this.setState({
            image,
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
                    <ImageFormat />
                    <SheetFormat />
                </Col>
                <Col lg={7}>
                    <CropImageWindow image={this.state.image} />
                </Col>
            </Row>
        );
    }
}

class ImageFormat extends Component {
    render() {
        return (
            <Row>
                <h1>Choose the image format. </h1>
                <p>Example: for US passport photos the width is 51mm and the height is 51mm. </p>
                <Col lg={6}>
                    Width: <input type="text" placeholder="38" />mm
                </Col>
                <Col lg={6}>
                    Height: <input type="text" placeholder="48" />mm
                </Col>
            </Row >
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
    setCropArea = () => {

    }
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
