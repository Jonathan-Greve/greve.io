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
import './ImageSheet.css';

class PreviewSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheet: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sheet: nextProps.sheet
        });
    }

    render() {
        let sheet = null;
        if (this.state.sheet) {
            console.log("Showing sheet.");
            sheet = <Image src={this.state.sheet} responsive thumbnail />;
        }
        return (
            <div>
                {sheet}
            </div>
        );
    }
}

export default PreviewSheet