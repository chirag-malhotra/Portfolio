import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SectionId = 'hero' | 'summary' | 'skills' | 'experience' | 'education' | 'certifications' | 'awards' | 'contact'

interface NavState {
  activeSection: SectionId
}

const initialState: NavState = {
  activeSection: 'hero',
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<SectionId>) => {
      state.activeSection = action.payload
    },
  },
})

export const { setActiveSection } = navSlice.actions
export default navSlice.reducer
