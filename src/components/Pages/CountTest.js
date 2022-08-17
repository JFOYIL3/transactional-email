import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {decrement, increment, incrementByAmount} from '../../redux/counter.js'
import {addElement, deleteElement} from '../../redux/headers.js'

const CountTest = () => {
    const {count} = useSelector(state => state.counter)
    const dispatch = useDispatch();
    const {headers} = useSelector(state => state.headers)
    
    return (
        <div>
            <h1>The count is: {count}</h1>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <button onClick={() => dispatch(incrementByAmount(33))}>Increment by 33</button>
            <h1>List of headers: {headers}</h1>
            <button onClick={() => dispatch(addElement("test"))}>increment</button>
            <button onClick={() => dispatch(deleteElement("test"))}>decrement</button>
        </div>
    )
}

export default CountTest