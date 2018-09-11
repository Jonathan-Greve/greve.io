import React, { Component } from 'react';
import {
    Form, FormGroup, FormControl
} from 'react-bootstrap'

class ImageUpload extends Component {
    async _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.onImageUpload(reader.result);
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Form>
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
