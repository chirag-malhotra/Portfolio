// features/contactForm/contactFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface ContactFormState {
  name: string
  email: string
  message: string
  errors: Record<string, string>
  status: Status
  submitMessage: string
}

const initialState: ContactFormState = {
  name: '',
  email: '',
  message: '',
  errors: {},
  status: 'idle',
  submitMessage: '',
}

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: 'name' | 'email' | 'message'; value: string }>) => {
      state[action.payload.field] = action.payload.value
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    },
    setSubmitMessage: (state, action: PayloadAction<string>) => {
      state.submitMessage = action.payload
    },
    resetForm: (state) => {
      state.name = ''
      state.email = ''
      state.message = ''
      state.errors = {}
      state.status = 'idle'
      state.submitMessage = ''
    },
  },
})

export const { setField, setErrors, setStatus, setSubmitMessage, resetForm } = contactFormSlice.actions
export default contactFormSlice.reducer