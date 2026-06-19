import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'
import navReducer from './features/nav/navSlice'
import contactFormReducer from './features/contactForm/contactFormSlice'
import skillFilterReducer from './features/skillFilter/skillFilterSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    nav: navReducer,
    contactForm: contactFormReducer,
    skillFilter: skillFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
