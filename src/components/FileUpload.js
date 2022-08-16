import axios from 'axios';
import React from 'react'
//import {faPlus} from '@fortawesome/free-solid-svg-icons'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Pages/List.css'
import * as XLSX from 'xlsx'


const FileUpload = ({files, setFiles, removeFile}) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        file.isUploading = true;
        setFiles([...files, file]);
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            const lines = data.split('\n');
            console.log(lines.length)
            console.log(lines[5179]);
            
        };
        reader.readAsBinaryString(file);
        

        const formData = new FormData();
        formData.append(
            file.name,
            file,
            file.name
        )
        axios.post('http://localhost:5000/uploaded', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file]);
            })
            .catch((err) => {
                console.error(err);
                removeFile(file.name)
            })


        return 7;
        
    }
    return (
        <div className='file-card'>
            <div className='file-inputs'>
                <input 
                    type='file' 
                    accept='xlsx, csv'
                    multiple={false}
                    onChange={uploadHandler}
                />
            </div>
            <p>Supported Files</p>
            <p>CSV, XLSX</p>
        </div>
    )
}

export default FileUpload