import React from 'react';
import {connect} from "react-redux";
import {
    imageUpLoadAction_Check,
    imageUpLoadAction_Save
} from "../../../actions/ImageUpLoadAction/ImageUpLoadAction_Check";
import * as ACTION from "../../../static/action_type";
import {uploadImageOn} from "../../../actions/MyUpLoadImageAction/MyUpLoadImageAction";
import myStyle from "./style.css";
import axios from "axios";
import {loginAction, logInRequest} from "../../../actions/LoginAction/loginAction";


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: ''};
    }

    // _handleSubmit(e) {
    //     e.preventDefault();
    //     console.log('it just submit');
    // let formData = new FormData();
    //
    // formData.append("image", this.state.file);
    // formData.append("account", "2115506848");
    // formData.append("amount", 100);
    //
    // console.log("tetetet", formData);
    //
    // const req_headers = {Authorization: 'Bearer ' + this.props.myKey}
    //
    // axios.post('api/deposit/check', formData, {headers: req_headers}
    // ).then(response => {
    //    console.log(response);
    // }).catch(error => {
    //     console.log(error.response);
    // });
    //
    //
    // console.log('handle uploading-', this.state.file);
    // }


    _handleImageChange(e) {
        e.preventDefault();


        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)

        if (this.props.checkType === ACTION.CHECKING) {
            this.props.imageUpLoadAction_Check(file);
        } else if (this.props.checkType === ACTION.SAVING) {
            this.props.imageUpLoadAction_Save(file);
        }

        this.props.uploadImageOn();

    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl && this.props.myImageState === true) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }


        // console.log("fgdgdgdgdgdgdfgdgd");
        // console.log(this.state);
        // console.log(this.props);




        return (

            <div className="previewComponent">


                <div className="imgPreview">
                    {$imagePreview}
                </div>

                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"

                           type="file"
                           onChange={(e) => this._handleImageChange(e)}/>
                    {/*<button className="submitButton"*/}
                    {/*type="submit"*/}
                    {/*onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("I'm in map State to Props");
    // console.log(state);
    return state;
}


export default connect(mapStateToProps, {imageUpLoadAction_Check, imageUpLoadAction_Save,uploadImageOn})(ImageUpload);
