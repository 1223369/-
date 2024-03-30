import request from "@/utils/request";

//获取用户的信息资料
export const reqGetUserInfo = () =>
    request({
      method: 'GET',
      url: '/user'
    })

// 用户登出接口
export const reqLogout = () =>
    request({
        method: 'post',
        url: '/user/logout'
    })

// 用户登录接口
export const reqLogin = (username: string, password:string) =>
    request({
        method: 'post',
        url: '/user/login',
        data: {
          username,
          password
        }
    })

// 用户注册接口
export const reqRegister = (username: string, password: string) =>
    request({
        method: 'post',
        url: '/user/registered',
        data: {
            username,
            password
        }
    })

// 房屋是否收藏
export const reqIsFavorite = (id: string) =>
    request({
        method: 'get',
        url: `/user/favorites/${id}`
    })

// 删除收藏
export const reqDeleteFavorite = (id: string) =>
    request({
        method: 'delete',
        url: `/user/favorites/${id}`
    })

// 添加收藏
export const reqAddFavorite = (id: string) =>
    request({
        method: 'post',
        url: `/user/favorites/${id}`
    })

// 查看已发布房源列表
export const reqGetRentHouse = () =>
    request({
        method: 'get',
        url: '/user/houses'
    })

// 出租房源
export const reqAddRentHouse = (houseInfo: {
    title: string
    description: string
    houseImg: string
    oriented: string
    supporting: string
    price: string
    roomType: string
    size: string
    floor: string
    community: string
}) =>
    request({
        method: 'post',
        url: '/user/houses',
        data: houseInfo
    })
