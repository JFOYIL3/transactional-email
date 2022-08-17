import {configureStore} from '@reduxjs/toolkit'
import counter from './counter';
import counterReducer from './counter'
import headersReducer from './headers'
import fieldsReducer from './fields'

export default configureStore({
    reducer: {
        counter: counterReducer, 
        headers: headersReducer,
        fields: fieldsReducer
    }
});