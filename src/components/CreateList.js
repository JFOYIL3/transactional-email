import { render } from '@testing-library/react'
import React from 'react'
import {test} from "./FileUploadTest"

const CreateList = ({fieldOptions}) => {
    
    console.log("test ", fieldOptions)
    
    //const [selectedFields]

    function handleChange(){
        //if name is not in selectedFields, add it
        //else, remove it
        console.log()
    }
    
    function createList(fieldOptions){
        fetch(`http://localhost:5000/create_list?fieldOptions=${fieldOptions}`)
            .then((res) => {
                if (res.ok){
                    alert("IT WORKED");
                }else{
                    alert("THERE WAS AN ERROR");
                }
            })
    }
    
    return (
        <div>
            <div class="head">
                <h1>
                    List Field Names
                </h1>
            </div>
            
            {fieldOptions.map((rows, index) => {
                                    return (
                                        <h3 key={index}>
                                            <input type="checkbox" checked={true}/>
                                            {rows}
                                        </h3>
                                    );
                                })}
            <button value='View Data' className='btn btn-secondary btn-block mt-4' onClick={createList}>Create List</button>
           
            
            
        </div>
    )

    
    
    
}

export default CreateList