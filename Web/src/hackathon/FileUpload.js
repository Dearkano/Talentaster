import React from 'react';
import { useForm } from "react-hook-form";
import ButtonGroup from "../components/elements/ButtonGroup";
import Button from "../components/elements/Button";

const FileUpload = ({
    fileName,
    ...props
}) => {
    const {register} = useForm()
    const hiddenFileInput = React.useRef(register);
    const [fileInfo, setFileInfo ] = React.useState(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    const onSubmit = () => {
        console.log(fileInfo)
    }
    
    const handleChange = event => {
        // store file data in local variable
        setFileInfo(event.target.files[0])
    }

    const DisplayUploadFile = () => {
        if (fileInfo) {
            return <div><p></p><p className="m-0 mb-32" > {fileInfo.name} </p></div>
        } else {
            return <div><p></p><p className="m-0 mb-32" > Please Upload a file </p></div>
        }
    }

    return (
        <div>
        {/* // <form onSubmit={handleSubmit(onSubmit)}> */}
        <ButtonGroup>
            <Button onClick={handleClick} tag="a" color="primary" wideMobile>
                Upload a File
            </Button>
            <Button onClick={onSubmit} tag="button" color="dark" wideMobile>
                Submit
            </Button>
        </ButtonGroup>
        <input 
            style={{display: 'none'}} 
            ref={hiddenFileInput} 
            type="file" 
            name="fruitImage" 
            onChange={handleChange}
        />
        <DisplayUploadFile></DisplayUploadFile>
        </div>
    )
}

export default FileUpload;