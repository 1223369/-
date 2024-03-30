import {configureStore} from '@reduxjs/toolkit'
import { homeReducer } from './features/home/homeSlice'
import { cityListReducer } from './features/cityList/inedex'

const store = configureStore({
    reducer: {
        home: homeReducer,
        cityList: cityListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
 