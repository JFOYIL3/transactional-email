import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addElement, deleteElement} from '../redux/fields.js'
import {updateElement} from '../redux/datatypes.js'

const CreateList = ({fieldOptions}) => {

    const dispatch = useDispatch();
    const {fields} = useSelector(state => state.fields)
    const {datatypes} = useSelector(state => state.datatypes)

    //var dataTypes = {};
    
   
    
    //const [selectedFields]

    function handleChange(){
        //if name is not in selectedFields, add it
        //else, remove it
        console.log()
    }
    
    function createList(){
        console.log(typeof fields);
        const title = document.getElementById("list-name").value;
        fetch(`http://localhost:5000/create_list?fieldOptions=${fields}&title=${title}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datatypes)
        })
            .then((res) => {
                if (res.ok){
                    alert("IT WORKED");
                }else{
                    alert("THERE WAS AN ERROR");
                }
            })
        console.log(fields)
    }

    function checkCustomFields(){
        console.log(fieldOptions.length);
        for(let i = 0; i < fieldOptions.length; i++){
            if(fieldOptions[i].toLowerCase() === "name" || fieldOptions[i].toLowerCase() === "email address"){
                //document.getElementById(String(i)).checked = true;
                if(document.getElementById(String(i))){
                    console.log("I EXIST");
                }else{
                    console.log("I DONT EXIST");
                }
            }
        }
    }

    function test(){
        console.log(datatypes)
    }

    function test2(entry, data){
        dispatch(updateElement([entry, data]))
    }

    
    
    return (
        <div>
            <div class="head">
                <h1>
                    List Field Names
                </h1>
            </div>
            <input id="list-name" type="text" placeholder='List Name'/>
            
            {fieldOptions.map((rows, index) => {
                                    return (
                                        <h3 key={index}>
                                            {rows.toLowerCase() === "name" || rows.toLowerCase() === "email address" ? <input type="checkbox" id={String(index)} checked/> : <input type="checkbox" id={String(index)} onClick={() => {
                                                    var test = document.getElementById(String(index))

                                                    if(test.checked){
                                                        dispatch(addElement(fieldOptions[index]))
                                                    }else{
                                                        dispatch(deleteElement(fieldOptions[index]))
                                                    }
                                                    
                                                    
                                                    
                                                }}/>}
                                            
                                            {rows.toLowerCase() === "name" || rows.toLowerCase() === "email address" ? <span style={{color: "#d4d4d4"}}>{rows}</span> : rows}
                                            {(rows.toLowerCase() !== "name" && rows.toLowerCase() !== "email address") && <div className='justify-content-right'>
                                                <select id={String(rows) + "-type"} onChange={() =>{
                                                    var e = document.getElementById(String(rows) + "-type");
                                                    var text = e.options[e.selectedIndex].text;
                                                    test2(rows, text);
                                                    //dispatch(updateElement([rows, text]))
                                                }}>
                                                    <option value='text'>Text</option>
                                                    <option value='number'>Number</option>
                                                    <option value='date'>Date</option>
                                                    <option value='multiple-options-select-one'>Multiple options (select one option)</option>
                                                    <option value='multiple-options-select-many'>Multiple options (select many options)</option>
                                                    <option value='country'>Country</option>
                                                    <option value='us-states'>US States</option>
                                                </select>
                                            </div>}
                                            {(rows.toLowerCase() !== "name" && rows.toLowerCase() !== "email address") && <script>
                                                {test2(rows, "Text")}
                                            </script>}
                                        </h3>
                                        
                                    );
                                })}
            
            <button value='Create List' className='btn btn-secondary btn-block mt-4' onClick={createList}>Create List</button>
            <button value='test' className='btn btn-secondary btn-block mt-4' onClick={test}>test</button>
           
            
        
        </div>
            
    )

    
    
    
}

export default CreateList