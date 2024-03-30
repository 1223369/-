import request from '@/utils/request'

// 根据条件查询房屋
export const reqGetHouseList = (cityId: string, filters?: Object, start?: number, end?: number) =>
    request({
        method: 'get',
        url: '/houses',
        params: {
            cityId,
            ...filters,
            start,
            end
        }
    })

// 获取房屋查询条件
export const reqGetFiltersData = (id: string) =>
    request({
        method: 'get',
        url: '/houses/condition',
        params: {
            id
        }
    })

// 获取房屋详细信息
export const reqGetHouseDetail = (id: string) =>
    request({
        method: 'get',
        url: `/houses/${id}`
    })

// 房屋图像上传
export const uploadHouseImage = (form: FormData) =>
    request({
        method: 'post',
        url: '/houses/image',
        headers: {'Content-Type': 'multipart/form-data'},
        data: form
    })
