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
        this.resizeDirection = null;
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
        });
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
        });
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

    calculateCropAreaLeftEdge(deltaX, deltaY) {
        let left = Math.max(this.state.cropAreaStartLeft, this.state.left - deltaX);
        return Math.min(this.state.imageWidth - this.state.width + this.state.cropAreaStartLeft - this.imageBorder * 2, left);
    }
    calculateCropAreaRightEdge(deltaX, deltaY) {
        let top = Math.max(this.state.cropAreaStartTop, this.state.top - deltaY);
        return Math.min(this.state.imageHeight - this.state.height + this.state.cropAreaStartTop - this.imageBorder * 2, top);
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

        //BUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!! WHEN RESIZING ANYTHING BUT TOP LEFT, THE this.state.width or this.state.height will change while resizing causing the resizing to end.
        //FIND A WAY TO RESIZE EITHER WITHOUT USING THESE TWO STATES OR SET A VALUE INDICATING A RESIZE IS IN PROGRESS UNTIL MOUSEUP AND NOT TO INTERRUPT IT.
        if (this.state.isMouseDown) {
            if (this.resizeDirection === "tl" || this.isOnTopLeftCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeDirection = "tl";
                this.resizeTopLeft(deltaX);
            }
            else if (this.resizeDirection === "tr" || this.isOnTopRightCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeDirection = "tr";
                this.resizeTopRight(deltaX);
            }
            else if (this.resizeDirection === "bl" || this.isOnBottomLeftCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeDirection = "bl";
                this.resizeBottomLeft(deltaX);
            }
            else if (this.resizeDirection === "br" || this.isOnBottomRightCorner(this.cropAreaX, this.cropAreaY)) {
                this.resizeDirection = "br";
                this.resizeBottomRight(deltaX);
            }
            else {
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
        this.resizeDirection = null;
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

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CropArea);