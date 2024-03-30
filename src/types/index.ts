// 首页轮播图数据
export interface SwiperImg {
  id: number
  imgSrc: string
  alt: string
}

// 城市列表数据
export interface City {
  label: string
  value: string
  pinyin?: string
  short?: string
}

// 租房小组数据
export interface Group {    
  id: number
  title: string
  desc: string
  imgSrc: string
}

// 资讯列表数据
export interface New {
  id: number
  title: string
  imgSrc: string
  from: string
  date: string
}

interface KeyString {
  [key: string]: boolean
}

export interface TitleSelectedStatus extends KeyString {
  area: boolean
  mode: boolean
  price: boolean
  more: boolean
}

// 筛选条件
export interface FiltersDataItem {
  label: string
  value: string
  children?: FiltersDataItem[]
}

export type TitleType = 'area' | 'mode' | 'price' | 'more'

// 房屋查询条件
export interface FiltersData {
  area: FiltersDataItem
  characteristic: FiltersDataItem[]
  floor: FiltersDataItem[]
  rentType: FiltersDataItem[]
  oriented: FiltersDataItem[]
  price: FiltersDataItem[]
  roomType: FiltersDataItem[]
  subway: FiltersDataItem
}

// 房屋数据
export interface House {
  houseImg: string
  title: string
  tags: string[]
  price: number
  desc: string
  houseCode: string
}

// 房屋详细数据
export interface HouseInfo {
  houseImg: string[]
  title: string
  tags: string[]
  price: number
  houseCode: string
  description: string
  roomType: string
  oriented: string[]
  floor: string
  community: string
  coord: {latitude: string; longitude: string}
  supporting: string[]
  size: number
}
// 小区房源数据
export interface CommunityTip {
  city: string
  cityName: string
  area:string
  areaName: string
  street: string
  streetName: string
  community: string
  communityName: string
}
// 房源数据
export interface CityMap {
  label: string
  value: string
  coord: {
      latitude: string
      longitude: string
  }
  count: number
}