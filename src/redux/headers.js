import { createSlice } from '@reduxjs/toolkit'

export const headersSlice = createSlice({
  name: 'headers',
  initialState: {
    headers: []
  },
  reducers: {
    addElement: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.headers.push(action.payload) 
    },
    deleteElement: (state, action) => {
        const index = state.headers.indexOf(action.payload);
        if (index > -1) { // only splice array when item is found
            state.headers.splice(index, 1); // 2nd parameter means remove one item only
        }
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { addElement, deleteElement } = headersSlice.actions

export default headersSlice.reducer