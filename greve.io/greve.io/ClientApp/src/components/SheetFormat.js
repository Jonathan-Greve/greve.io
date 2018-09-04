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

class SheetFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthValue: '',
            heightValue: ''
        }

        this.hasChanged = false;
        this.validationRegex = new RegExp('^[1-9][0-9]*$');

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    componentDidUpdate() {
        if (this.hasChanged) {
            this.props.onSheetFormatChange(parseInt(this.state.widthValue), parseInt(this.state.heightValue));
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

export default SheetFormat