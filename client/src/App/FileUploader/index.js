import React, { Component } from 'react';
import Gallery from "./Gallery";

import "./index.css";

import axios from "axios";

let imgServerUrl = "/api/images";

export default class FileUploader extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                file: null,
                credit: "",
                caption: ""
            },
            loading: true,
            images: [],
            errMsg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(imgServerUrl)
            .then(response => {
                this.setState({
                    images: response.data,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    images: [],
                    errMsg: err.message
                })
            })
    }
    _genFormData(raw) {
        let formData = new FormData();
        for (let key in raw) {
            formData.append(key, raw[key]);
        }
        return formData;
    }
    onFormSubmit(e) {
        e.preventDefault();
        axios.post(imgServerUrl, this._genFormData(this.state.inputs))
            .then(response => {
                this.setState(prevState => {
                    return {
                        inputs: {
                            file: null,
                            credit: "",
                            caption: ""
                        },
                        images: [...prevState.images, response.data]
                    }
                })
            })
            .catch(err => {
                this.setState(prevState => {
                    return {
                        inputs: {
                            file: null,
                            credit: "",
                            caption: ""
                        },
                        images: [...prevState.images, { errMsg: "unable to get image" }]
                    }
                })
            });
    }

    handleChange(e) {
        let { files, value, name, type } = e.target;
        this.setState(prevState => ({
            ...prevState,
            inputs: {
                ...prevState.inputs,
                [name]: type === "file" ? files[0] : value
            }
        }));
    }
    render() {
        let { file, credit, caption } = this.state.inputs;
        let { images, loading, errMsg } = this.state;
        return (
            <div className="uploader-wrapper">
                <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input file={file} name="file" onChange={this.handleChange} type="file" />
                    <input value={credit} name="credit" onChange={this.handleChange} type="text" placeholder="Credit" />
                    <input value={caption} name="caption" onChange={this.handleChange} type="text" placeholder="Caption" />
                    <button type="submit">Upload</button>
                </form>
                {loading ?
                    <div>...loading</div>
                    :
                    errMsg ?
                        <div>{errMsg}</div>
                        :
                        <Gallery images={images}></Gallery>
                }
            </div>
        )
    }
}
