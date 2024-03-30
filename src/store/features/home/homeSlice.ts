import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { SwiperImg, New, City } from '@/types'
import {reqGetNews, reqGetSwipers} from '@/api'
import { getCurrentCity } from '@/utils/city'

//获取轮播图
export const getImgList = createAsyncThunk('home/getImgList', async (arg, thunkAPI) => {
    const res = await reqGetSwipers()
    if (res.status === 200) {
        thunkAPI.dispatch(setImgList(res.body))
    }
})

// 获取新闻资讯
export const getNews = createAsyncThunk('home/getNews', async(args,thunkAPI) => {

    const area = (await getCurrentCity()) as {label: string, value: string}
    const res = await reqGetNews(area.value)
    if(res.status === 200) {
        // console.log(res.body)
        thunkAPI.dispatch(setNews(res.body))
    }
})



const homeSlice = createSlice({
    name: 'home',
    initialState: { 
        imgList: <SwiperImg[]>[],
        news: <New[]>[]
    },
    reducers: {
        setImgList(state, action) {
            state.imgList = action.payload
        },

        setNews(state, action) {
            state.news = action.payload
        }
    }
})

export const {setImgList, setNews} = homeSlice.actions
export const {reducer: homeReducer} = homeSlice
