import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup, FormControl, ControlLabel,
    HelpBlock, InputGroup
} from 'react-bootstrap';
import { actionCreators } from '../store/ImageSheet';

class ImageFormat extends Component {
    constructor(props) {
        super(props);

        this.validationRegex = new RegExp('^[1-9][0-9]*$');

        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    componentWillMount() {
        this.props.image.imageFormatWidth =
            this.props.image.imageFormatWidth ? this.props.image.imageFormatWidth : "";
        this.props.image.imageFormatHeight =
            this.props.image.imageFormatHeight ? this.props.image.imageFormatHeight : "";
        this.props.setImage(this.props.image);
    }

    calculateAspectRatio() {
        if ((!this.props.image.imageFormatHeight > 0) || !(this.props.image.imageFormatWidth > 0)) {
            return NaN;
        }
        return this.props.image.imageFormatHeight / this.props.image.imageFormatWidth;
    }

    getValidationState(choice) {
        var stateChoice;
        if (choice === "width") stateChoice = this.props.image.imageFormatWidth;
        else stateChoice = this.props.image.imageFormatHeight;
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
        this.props.image.imageFormatWidth = this.validationRegex.test(e.target.value) ? parseInt(e.target.value, 10) : "";
        this.props.image.imageFormatAspectRatio = this.calculateAspectRatio();
        this.props.setImage(this.props.image);
    }

    handleHeightChange(e) {
        this.props.image.imageFormatHeight= this.validationRegex.test(e.target.value) ? parseInt(e.target.value, 10) : "";
        this.props.image.imageFormatAspectRatio = this.calculateAspectRatio();
        this.props.setImage(this.props.image);
    }

    render() {
        return (
            <Form>
                <p>Example: for US passport photos the width is 51mm and the height is 51mm. </p>
                <FormGroup
                    controlId="imageWidthFormat"
                    validationState={this.getValidationState("width")}
                >
                    <ControlLabel> Please input the image format width. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.props.image.imageFormatWidth}
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
                    <ControlLabel> Please input the image format height. </ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.props.image.imageFormatHeight}
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

export default connect(
    state => state.imageSheet,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ImageFormat);