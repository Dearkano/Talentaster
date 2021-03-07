import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "../components/elements/Button";
import ButtonGroup from "../components/elements/ButtonGroup";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
    root: {
        '& .MuiInputBase-root': {
            backgroundColor: '#ffffff',
            border: "3px solid #9CA9B3",
            borderRadius: "3px",
            
            '&:hover': {
                borderColor: "#6163FF"
            },
            '&.Mui-focused': {
                borderColor: "#434ebe"
            },
            '.MuiInputBase-input': {
                // border: "none",
                // backgroundColor: "none",
                // // '&.Mul-focused': {
                // //     borderColor: "#6163FF"
                // // },
                // '&:hover': {
                //     border: "none",
                // },
            },
        }
    }
}))

const DataUpload = ({

}) => {

    const [textData, setTextData] = useState("Input Spectrum Data Here...");

    const onSubmit = () => {
        console.log(textData);
    }

    const updateText = (event) => {
        setTextData(event.target.value);
    }
    const handleKeypress = e => {
        
    }

    useEffect(() => {
        // window.addEventListener("keypress" , (e) => {
        //     if (e.code == "Enter") {
        //         onSubmit();
        //     }
        // })
    })
    
    const inputClasses = useStyles();

    return (
        <div>
           <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                defaultValue={textData}
                variant="outlined"
                fullWidth={true}
                className={inputClasses.root}
                margin='dense'
                onChange={updateText}
                
            />
            <ButtonGroup>
                <Button onClick={onSubmit} tag="button" color="dark" wideMobile>
                    Submit
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default DataUpload;