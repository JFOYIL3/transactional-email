import React, {Fragment, useState}from 'react'
import axios from 'axios'
import Papa from 'papaparse';

const fs = require('fs');
const { parse } = require('csv-parse');


const allowedExtensions = ['csv'];

const FileUploadTest = () => {

    const [data, setData] = useState([]);

    // Uploading the file
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({});

    // Display as a table
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [values, setValues] = useState([]);

    const onChange = e => {
        // this is an array, since we
        // are only doing a single file
        // upload, only get the first index
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({fileName, filePath});
            alert("File Uploaded!");
        }catch(err){
            if(err.response.status === 500){
                alert("Error: There was a problem witht the server");
                console.log('There was a problem with the server');
            }else{
                alert(`Error: ${err.response.data.msg}`);
                console.log(err.response.data.msg);
            }
        }
    };

    // View the data as a table
    const viewData = e =>{
        if(uploadedFile.filePath){
            console.log(uploadedFile.filePath);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function(results){
                    //console.log(results.data);
                    const rowsArray = [];
                    const valuesArray = [];

                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    setParsedData(results.data);
                    setTableRows(rowsArray[0]);
                    setValues(valuesArray);

                    console.log(results.data.length);



                }
            })
        }else{
            alert("Error: There is no file uploaded!");
        }
        
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                    </label>
                </div>
                <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4'></input>
            </form>
            <button value='View Data' className='btn btn-secondary btn-block mt-4' onClick={viewData}>View Data</button>
            <h1>{parsedData.length > 0 ? `Number of entries: ${parsedData.length}` : ''}</h1>
            <table>
                <thead>
                    <tr>
                        {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, index) => {
                        return (
                            <tr key={index}>
                            {value.map((val, i) => {
                                return <td key={i}>{val}</td>;
                            })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
        </Fragment>
    )
}

export default FileUploadTest