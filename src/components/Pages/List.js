import {useState, React} from 'react'
import './List.css';
import FileUpload from '../FileUpload';
import { CsvToHtmlTable } from 'react-csv-to-table';


const List = () => {
    const [files, setFiles] = useState([{
        name: 'myFile.csv'
    }])

    const removeFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName))
    }

    var fs = require('fs');

    var data = fs.readFileSync('myFile.csv')
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(',').map(e => e.trim())); // split each line to array

    console.log(data);
    console.log(JSON.stringify(data, '', 2)); // as json

    return (
        <div className='uploadFile'>
            <p className='title'>Upload File</p>
            <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}/>
            <CsvToHtmlTable data={files[2]} csvDelimiter=',' tableClassName='table table-striped table-hover'/>
        </div>
    )
}

export default List