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

export default ImageFormat