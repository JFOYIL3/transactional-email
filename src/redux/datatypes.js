import { createSlice } from '@reduxjs/toolkit'

export const datatypesSlice = createSlice({
  name: 'datatypes',
  initialState: {
    datatypes: {}
  },
  reducers: {
    updateElement: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes 
      state.datatypes[action.payload[0]] = action.payload[1];
      console.log(state.datatypes)
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { updateElement } = datatypesSlice.actions

export default datatypesSlice.reducer