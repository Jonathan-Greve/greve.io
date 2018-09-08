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
import { actionCreators } from '../store/ImageSheet';

class CropArea extends Component {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.calculateCropAreaLeftEdge = this.calculateCropAreaLeftEdge.bind(this);
        this.calculateCropAreaTopEdge = this.calculateCropAreaTopEdge.bind(this);

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
        this.resizeDirection = null;
        this.canResizeLarger = true;
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
        let newLeft = this.calculateCropAreaLeftEdge(this.state.left - deltaX * resizeSpeed);
        let newTop = this.calculateCropAreaTopEdge(this.state.top - deltaX * resizeSpeed * this.state.aspectRatio);
        if (this.canResizeLarger) {
            this.setState({
                width: Math.min(this.state.imageWidth - this.imageBorder * 2, this.state.width + deltaX * resizeSpeed),
                height: Math.min(this.state.imageHeight - this.imageBorder * 2, (this.state.width + deltaX * resizeSpeed) * this.state.aspectRatio),
                left: newLeft,
                top: newTop
            });
        }
        if (deltaX < 0) {
            this.setState({
                width: this.state.width + deltaX * resizeSpeed,
                height: (this.state.width + deltaX * resizeSpeed) * this.state.aspectRatio,
                left: newLeft, 
                top: newTop 
            })
        }
    }

    resizeTopRight(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX < 0) {
            resizeSpeed = 1.3;
        }
        //let newLeft = this.calculateCropAreaLeftEdge(this.state.left - deltaX * resizeSpeed);
        let newTop = this.calculateCropAreaTopEdge(this.state.top + deltaX * resizeSpeed * this.state.aspectRatio);
        if (this.state.imageWidth - (this.state.width + this.state.left) > 0) {
            this.setState({
                width: this.canResizeLarger ? this.state.width - deltaX * resizeSpeed : this.state.width,
                height: this.canResizeLarger ? (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio : this.state.height,
                top: this.canResizeLarger ? newTop : this.state.top,
            });
        }
    }

    resizeBottomLeft(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX > 0) {
            resizeSpeed = 1.3;
        }
        let newLeft = this.calculateCropAreaLeftEdge(this.state.left - deltaX * resizeSpeed);
        this.setState({
            width: this.canResizeLarger ? this.state.width + deltaX * resizeSpeed : this.state.height,
            height: this.canResizeLarger ? (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio : this.state.height,
            left: this.canResizeLarger ? newLeft : this.state.left
        });
    }

    resizeBottomRight(deltaX) {
        let resizeSpeed = 0.7;
        if (deltaX < 0) {
            resizeSpeed = 1.3;
        }

        this.setState({
            width: this.state.width - deltaX * resizeSpeed,
            height: (this.state.width - deltaX * resizeSpeed) * this.state.aspectRatio,
        });
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

    calculateCropAreaLeftEdge(left) {
        let newLeft = Math.max(this.state.cropAreaStartLeft, left);
        newLeft = Math.min(this.state.imageWidth - this.state.width + this.state.cropAreaStartLeft - this.imageBorder * 2, newLeft);
        if (newLeft !== left) this.canResizeLarger = false;
        else this.canResizeLarger = this.canResizeLarger && true;
        return newLeft;
    }
    calculateCropAreaTopEdge(top) {
        let newTop = Math.max(this.state.cropAreaStartTop, top);
        newTop = Math.min(this.state.imageHeight - this.state.height + this.state.cropAreaStartTop - this.imageBorder * 2, newTop);
        if (newTop != top) this.canResizeLarger = false;
        else this.canResizeLarger = this.canResizeLarger && true;
        return newTop;
    }

    isOnTopLeftCorner(xClickPos, yClickPos) {
        if (xClickPos < 20 && yClickPos < 20) return true;
        return false;
    }

    isOnTopRightCorner(xClickPos, yClickPos) {
        if (xClickPos > (this.state.width - 20) && yClickPos < 20) return true;
        return false;
    }

    isOnBottomLeftCorner(xClickPos, yClickPos) {
        if (xClickPos < 20 && yClickPos > (this.state.height - 20)) return true;
        return false;
    }

    isOnBottomRightCorner(xClickPos, yClickPos) {
        if (xClickPos > (this.state.width - 20) && yClickPos > (this.state.height - 20)) return true;
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
    }
    onMouseMove = function (e) {
        e.preventDefault();
        let deltaX = this.offsetX - e.pageX;
        let deltaY = this.offsetY - e.pageY;

        if (this.state.isMouseDown) {
            this.canResizeLarger = true;
            if (this.resizeDirection === "tl" || this.isOnTopLeftCorner(this.cropAreaX, this.cropAreaY)) {
                console.log("tl");
                this.resizeDirection = "tl";
                this.resizeTopLeft(deltaX);
            }
            else if (this.resizeDirection === "tr" || this.isOnTopRightCorner(this.cropAreaX, this.cropAreaY)) {
                console.log("tr");
                console.log("TOP__________________: ", this.state.top);
                console.log("HEIGHT__________________: ", this.state.height);
                this.resizeDirection = "tr";
                this.resizeTopRight(deltaX);
            }
            else if (this.resizeDirection === "bl" || this.isOnBottomLeftCorner(this.cropAreaX, this.cropAreaY)) {
                console.log("bl");
                this.resizeDirection = "bl";
                this.resizeBottomLeft(deltaX);
            }
            else if (this.resizeDirection === "br" || this.isOnBottomRightCorner(this.cropAreaX, this.cropAreaY)) {
                console.log("br");
                this.resizeDirection = "br";
                this.resizeBottomRight(deltaX);
            }
            else {
                console.log("not resizing");
                let left = this.state.left - deltaX;
                let top = this.state.top - deltaY;
                this.setState({
                    left: this.calculateCropAreaLeftEdge(left),
                    top: this.calculateCropAreaTopEdge(top)
                })
            }
            this.offsetX = e.pageX;
            this.offsetY = e.pageY;
        }
    }

    onMouseUp = function (e) {
        e.preventDefault();
        this.resizeDirection = null;
        this.setState({
            isMouseDown: false
        });
        console.log("left: ", this.state.left - this.state.cropAreaStartLeft);
        console.log("top: ", this.state.top - this.state.cropAreaStartTop);
        console.log("cropWidth: ", this.state.width);
        console.log("cropHeight: ", this.state.height);

        console.log("xStartPercentage: ", ((this.state.left - this.state.cropAreaStartLeft) / (this.state.imageWidth - this.imageBorder * 2)) * 100);
        console.log("yStartPercentage: ", ((this.state.top - this.state.cropAreaStartTop) / (this.state.imageHeight - this.imageBorder * 2)) * 100);
        console.log("cropWidthPercentage: ", (this.state.width / this.state.imageWidth) * 100);
        console.log("cropHeightPercentage: ", (this.state.height / this.state.imageHeight) * 100);
        this.props.image.xStart = ((this.state.left - this.state.cropAreaStartLeft) / (this.state.imageWidth - this.imageBorder * 2)) * 100;
        this.props.image.yStart = ((this.state.top - this.state.cropAreaStartTop) / (this.state.imageHeight - this.imageBorder * 2)) * 100;
        this.props.image.cropWidth = (this.state.width / (this.state.imageWidth - this.imageBorder * 2)) * 100;
        this.props.image.cropHeight = (this.state.height / (this.state.imageHeight - this.imageBorder * 2)) * 100;
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

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CropArea);