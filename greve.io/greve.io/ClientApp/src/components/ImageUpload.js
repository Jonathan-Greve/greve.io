﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Col, Row, Image, Jumbotron, Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup, PageHeader,
    Button,
} from 'react-bootstrap'

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

export default ImageUpload