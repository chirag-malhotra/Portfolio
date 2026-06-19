import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SkillCategory =
  | 'all'
  | 'frontend'
  | 'frameworks'
  | 'testing'
  | 'collaboration'
  | 'backend'

interface SkillFilterState {
  selectedCategories: SkillCategory[]
}

const initialState: SkillFilterState = {
  selectedCategories: ['all'],
}

const skillFilterSlice = createSlice({
  name: 'skillFilter',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<SkillCategory>) => {
      const category = action.payload
      if (category === 'all') {
        state.selectedCategories = ['all']
      } else {
        const index = state.selectedCategories.indexOf(category)
        if (index > -1) {
          state.selectedCategories.splice(index, 1)
        } else {
          state.selectedCategories = [
            ...state.selectedCategories.filter((c) => c !== 'all'),
            category,
          ]
        }
        if (state.selectedCategories.length === 0) {
          state.selectedCategories = ['all']
        }
      }
    },
    resetFilter: (state) => {
      state.selectedCategories = ['all']
    },
  },
})

export const { toggleCategory, resetFilter } = skillFilterSlice.actions
export default skillFilterSlice.reducer
