import {configureStore} from '@reduxjs/toolkit'
import counter from './counter';
import counterReducer from './counter'

export default configureStore({
    reducer: {
        counter: counterReducer
    }
});