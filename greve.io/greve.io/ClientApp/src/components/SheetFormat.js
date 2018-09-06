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

class SheetFormat extends Component {
    constructor(props) {
        super(props);
        this.validationRegex = new RegExp('^[1-9][0-9]*$');
        
        this.getValidationState = this.getValidationState.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    componentWillMount() {
        this.props.image.sheetWidth = this.props.image.sheetWidth ? this.props.image.sheetWidth : "";
        this.props.image.sheetHeight = this.props.image.sheetHeight? this.props.image.sheetHeight: "";
        this.props.setImage(this.props.image);
    }

    getValidationState(choice) {
        var stateChoice;
        if (choice === "width") stateChoice = this.props.image.sheetWidth;
        else stateChoice = this.props.image.sheetHeight;
        if (!stateChoice) return;
        stateChoice = stateChoice.toString();
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
        this.props.image.sheetWidth = this.validationRegex.test(e.target.value) ? parseInt(e.target.value) : "";
        this.props.setImage(this.props.image);
    }

    handleHeightChange(e) {
        this.props.image.sheetHeight = this.validationRegex.test(e.target.value) ? parseInt(e.target.value) : "";
        this.props.setImage(this.props.image);
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
                            value={this.props.image.sheetWidth}
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
                    <ControlLabel> Please input the sheet format height. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.props.image.sheetHeight}
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
export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SheetFormat);

