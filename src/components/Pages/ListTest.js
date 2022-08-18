import React, {useState} from 'react'

import FileUploadTest from '../FileUploadTest';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const ListTest = () => {
    return (
        <div className='container mt-4'>
            <h4 className='display-4 text-center mb-4'>
                <i className='fab fa-react'></i>React File Upload
            </h4>
            <Container fluid>
                <Row>
                    <FileUploadTest />
                </Row>
            </Container>
            

        </div>
    )
}

export default ListTest