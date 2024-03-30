import request from '@/utils/request'

// 根据城市名称查询该城市信息
export const reqGetInfo = (name: string) =>
    request({
        method: 'get',
        url: '/area/info',
        params: {
            name
        }
    })

// 获取城市列表数据
export const reqGetCityList = (level: number = 1) =>
    request({
        method: 'get',
        url: '/area/city',
        params: {
            level
        }
    })

// 热门城市
export const reqGetHotCity = () =>
    request({
        method: 'get',
        url: '/area/hot'
    })

// 查询房源数据
export const reqGetMapList = (id: string) =>
    request({
        method: 'get',
        url: '/area/map',
        params: {
            id
        }
    })

// 使用关键词查询小区信息
export const reqGetCommunity = (name: string, id: string) =>
    request({
        method: 'get',
        url: '/area/community',
        params: {
            name,
            id
        }
    })
