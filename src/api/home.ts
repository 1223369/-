import request from '@/utils/request'

// 首页轮播图
export const reqGetSwipers = () =>
    request({
        method: 'get',
        url: '/home/swiper'
    })

// 租房小组
export const reqGetGroups = (area: string) =>
    request({
        method: 'get',
        url: '/home/groups',
        params: {
            area
        }
    })

// 资讯
export const reqGetNews = (area: string) =>
    request({
        method: 'get',
        url: '/home/news',
        params: {
            area
        }
    })
