import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addElement, deleteElement} from '../redux/fields.js'

const CreateList = ({fieldOptions}) => {

    const dispatch = useDispatch();
    const {fields} = useSelector(state => state.fields)
    
   
    
    //const [selectedFields]

    function handleChange(){
        //if name is not in selectedFields, add it
        //else, remove it
        console.log()
    }
    
    function createList(fieldOptions){
        fetch(`http://localhost:5000/create_list?fieldOptions=${fields}`)
            .then((res) => {
                if (res.ok){
                    alert("IT WORKED");
                }else{
                    alert("THERE WAS AN ERROR");
                }
            })
        console.log(fields)
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
                                            <input type="checkbox" id={String(index)} onClick={() => {
                                                    var test = document.getElementById(String(index))
                                                    if(test.checked){
                                                        dispatch(addElement(fieldOptions[index]))
                                                    }else{
                                                        dispatch(deleteElement(fieldOptions[index]))
                                                    }
                                                    
                                                    
                                                    
                                                }}/>
                                            {rows}
                                        </h3>
                                    );
                                })}
            <button value='View Data' className='btn btn-secondary btn-block mt-4' onClick={createList}>Create List</button>
           
            
            
        </div>
    )

    
    
    
}

export default CreateList