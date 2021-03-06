import React from 'react';
import { useForm } from "react-hook-form";
import ButtonGroup from "../components/elements/ButtonGroup";
import Button from "../components/elements/Button";
// import axios from 'axios';

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
    const onSubmit = async () => {
        if (fileInfo != null) {
            const data = new FormData()
            data.append('file', fileInfo)
            data.append('name', "Bowen")
            const headerData = new Headers()
            headerData.append("Content-Type", "multipart/form-data");
            // const res = await axios.post("http://18.181.247.60:5010/postServer", data, headerData);
            const res = await fetch("http://18.181.247.60:5010/postServer", {
                method: "POST",
                body: data
            })
            const blob = await res.blob()
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "result.csv";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        

            // console.log(res.data)
            // const getData = await res;
            // console.log(getData);
        }
        // console.log(fileInfo)
    }
    
    const handleUpload = event => {
        const file = event.target.files[0]
        const fileName = file.name;
        const extention = fileName.split('.').pop();
        if (extention == "csv") {
            // store file data in local variable
            console.log(file)
            setFileInfo(file);
        } else {
            alert("Please upload a csv file!");
        }
    }

    const DisplayUploadFile = () => {
        if (fileInfo) {
            return <div><p></p><p className="m-0 mb-32" > {fileInfo.name} </p></div>
        } else {
            return <div><p></p><p className="m-0 mb-32" > Please Upload a csv file </p></div>
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
            onChange={handleUpload}
        />
        <DisplayUploadFile></DisplayUploadFile>
        </div>
    )
}

export default FileUpload;