import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/store'
import {useEffect, useState} from 'react'
import { getImgList,getNews } from '@/store/features/home/homeSlice'
import { GetCityList } from '@/store/features/cityList/inedex'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInitData = () => {
    const dispatch = useAppDispatch()
    const [isSuccess, setIsSuccess] = useState(false)

    

    useEffect(() => {
        try {
            dispatch(GetCityList(1))
            dispatch(getImgList())
            dispatch(getNews())
            setIsSuccess(true)
        } catch (e) {
            setIsSuccess(false)
        }
    }, [])

    return {
        isSuccess
    }
}
