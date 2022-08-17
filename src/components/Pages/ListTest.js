import React, {useState} from 'react'
import { parse } from 'papaparse'
import FileUploadTest from '../FileUploadTest';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CreateList from '../CreateList';

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