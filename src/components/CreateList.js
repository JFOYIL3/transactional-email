import React from 'react'
import {batch, useDispatch, useSelector} from 'react-redux'
import {addElement, deleteElement} from '../redux/fields.js'
import {updateElement} from '../redux/datatypes.js'
import { parse } from 'url';

var added = false;
var datatypes = {};
const CreateList = ({fieldOptions, parsedData}) => {

    const dispatch = useDispatch();
    const {fields} = useSelector(state => state.fields)
    //const {datatypes} = useSelector(state => state.datatypes)
    
    var subscribers = { "Subscribers": [],
                        "Resubscribe": true,
                        "QueueSubscriptionBasedAutoResponders": false,
                        "RestartSubscriptionBasedAutoresponders": true
                };
    var batches = [];
    
    function createList(){
        addSubscribers();
        var body = {"datatypes": datatypes,
                    "subscribers": batches
            }
        console.log(typeof fields);
        const title = document.getElementById("list-name").value;
        console.log(batches)
        fetch(`http://localhost:5000/create_list?fieldOptions=${fields}&title=${title}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(body)
                    
                
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

    function addSubscribers(){
        
        console.log(parsedData.length)
        if(parsedData.length <= 1000){
            console.log("running one batch")
            oneBatch();
        }else{
            console.log("running many batches")
            manyBatches();
        }
    }


    function oneBatch(){
        for(var i = 0; i < parsedData.length; i++){
            var subscriber = {  "CustomFields": [],
                            "ConsentToTrack": "Yes"
                        };
            for (var [key, value] of Object.entries(parsedData[i])) {
                if(key.toLowerCase().includes("email address")){
                    subscriber["EmailAddress"] = value;
                }else if(key.toLowerCase().includes("name")){
                    subscriber["Name"] = value;
                }else{
                    if(fields.includes(key)){
                        // make sure to remove spaces!
                        var obj = {};
                        obj["Key"] = key.replace(/\s/g, '');
                        if(key in datatypes){
                            if(datatypes[key] === "Date"){
                                value = new Date(value)
                                value = value.toISOString().split('T')[0]
                                console.log(value)
                            }
                        }
                        obj["Value"] = value;
                        
                        subscriber["CustomFields"].push(obj);
                    }
                }
              }
              subscribers["Subscribers"].push(subscriber);
              
        }
        batches.push(subscribers)
        
        
    }

    function manyBatches(){
        var j = 0;
        for(var i = 0; i < parsedData.length; i++){
            var subscriber = {  "CustomFields": [],
                            "ConsentToTrack": "Yes"
                        };
            for (var [key, value] of Object.entries(parsedData[i])) {
                if(key.toLowerCase().includes("email address")){
                    subscriber["EmailAddress"] = value;
                }else if(key.toLowerCase().includes("name")){
                    subscriber["Name"] = value;
                }else{
                    if(fields.includes(key)){
                        // make sure to remove spaces!
                        var obj = {};
                        obj["Key"] = key.replace(/\s/g, '');
                        if(key in datatypes){
                            if(datatypes[key] === "Date"){
                                value = new Date(value)
                                value = value.toISOString().split('T')[0]
                                console.log(value)
                            }
                        }
                        obj["Value"] = value;
                        subscriber["CustomFields"].push(obj);
                    }
                }
            }
            subscribers["Subscribers"].push(subscriber);
            if(j === 999){
                batches.push(subscribers);
                j = 0;
                subscribers = { "Subscribers": [],
                        "Resubscribe": true,
                        "QueueSubscriptionBasedAutoResponders": false,
                        "RestartSubscriptionBasedAutoresponders": true
                };
            }else{
                j++;
            }
        }
        if(j > 0){
            batches.push(subscribers);
        }
        
        

    }

    function test(){
        console.log(parsedData.length)
        if(parsedData.length > 1000){
            
            oneBatch();
        }else{
            manyBatches();
        }

    }

    

    
    
    return (
        <div>
            <div className="head">
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
                                            <div className='justify-content-right' id="select-options">
                                            {(rows.toLowerCase() !== "name" && rows.toLowerCase() !== "email address") && <select id={String(rows) + "-type"} onChange={() =>{
                                                    console.log("YOU CHANGED ME")
                                                    var e = document.getElementById(String(rows) + "-type");
                                                    var text = e.options[e.selectedIndex].text;
                                                    console.log("DATATYPE: ", text)
                                                    datatypes[rows] = text;
                                                }}>
                                                    <option value='text'>Text</option>
                                                    <option value='number'>Number</option>
                                                    <option value='date'>Date</option>
                                                    <option value='multiple-options-select-one'>Multiple options (select one option)</option>
                                                    <option value='multiple-options-select-many'>Multiple options (select many options)</option>
                                                    <option value='country'>Country</option>
                                                    <option value='us-states'>US States</option>
                                                </select>}
                                            </div>
                                            {(rows.toLowerCase() !== "name" && rows.toLowerCase() !== "email address" && !added) && <script>
                                                {!added ? datatypes[rows] = "Text" : console.log()}
                                                {index + 1 === fieldOptions.length ? added = true : console.log()}
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