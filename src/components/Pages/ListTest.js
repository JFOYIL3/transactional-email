import React, {useState} from 'react'
import { parse } from 'papaparse'
import FileUploadTest from '../FileUploadTest';

const ListTest = () => {
    return (
        <div className='container mt-4'>
            <h4 className='display-4 text-center mb-4'>
                <i className='fab fa-react'></i>React File Upload
            </h4>
            <FileUploadTest />
            
        </div>
    )
}

export default ListTest