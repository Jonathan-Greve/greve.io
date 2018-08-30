import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { Grid, Col, Row } from 'react-bootstrap'
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
            <Grid>
                <Row className="show-grid">
                    <Col lg={3}>
                        <h1>Create image sheet</h1>
                        <p>Upload an image and choose the crop area, image format, and sheet format.</p>
                        <ImageUpload onImageUpload={this.handleImageUpload}/>
                    </Col>
                    <Col lg={6}>
                        <CropImageWindow image={this.state.image} />
                    </Col>
                </Row>
            </Grid>
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
            img = <img src={this.props.image}></img>;
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
            <div className="imageUpload">
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
