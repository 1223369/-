import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {City} from '@/types'
import { reqGetCityList, reqGetHotCity } from "@/api"
import { formatCityData, getCurrentCity } from "@/utils/city"

export const GetCityList = createAsyncThunk('cityList/getCityList', async (level: number, thunkAPI) => {
  const res = await reqGetCityList(level)
  if (res.status === 200) {
    const {cityList, cityIndex} = formatCityData(res.body)

    const hotRes = await reqGetHotCity()
    if (hotRes.status === 200) {
      cityList['hot'] = hotRes.body
      cityIndex.unshift('hot')

      const curCity = (await getCurrentCity()) as {label: string; value: string}
      cityList['#'] = [curCity]
      cityIndex.unshift('#')
      thunkAPI.dispatch(setCityList(cityList))
      thunkAPI.dispatch(setCityIndex(cityIndex))
    }
  }
})

const cityListSlice = createSlice({
  name: "cityList",
  initialState: {
    cityList: <{[key: string]: City[]}>{},
    cityIndex: <string[]>[]
  },
  reducers: {
    setCityList(state, action) {
        state.cityList = action.payload
    },
    setCityIndex(state, action) {
        state.cityIndex = action.payload
  }
}
})

export const {setCityList, setCityIndex} = cityListSlice.actions
export const {reducer: cityListReducer} = cityListSlice