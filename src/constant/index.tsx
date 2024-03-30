export const BASE_URL = import.meta.env.VITE_REACT_APP_URL

// 所有房屋配置项
export const HOUSE_PACKAGE = [
  {
      id: 1,
      name: '衣柜',
      icon: 'icon-wardrobe'
  },
  {
      id: 2,
      name: '洗衣机',
      icon: 'icon-wash'
  },
  {
      id: 3,
      name: '空调',
      icon: 'icon-air'
  },
  {
      id: 4,
      name: '天然气',
      icon: 'icon-gas'
  },
  {
      id: 5,
      name: '冰箱',
      icon: 'icon-ref'
  },
  {
      id: 6,
      name: '暖气',
      icon: 'icon-Heat'
  },
  {
      id: 7,
      name: '电视',
      icon: 'icon-vid'
  },
  {
      id: 8,
      name: '热水器',
      icon: 'icon-heater'
  },
  {
      id: 9,
      name: '宽带',
      icon: 'icon-broadband'
  },
  {
      id: 10,
      name: '沙发',
      icon: 'icon-sofa'
  }
]
// 猜你喜欢
export const recommendHouses = [
  {
      houseCode: '1',
      houseImg: '/img/message/1.png',
      desc: '72.32㎡/南 北/低楼层',
      title: '安贞西里 3室1厅',
      price: 4500,
      tags: ['随时看房']
  },
  {
      houseCode: '2',
      houseImg: '/img/message/2.png',
      desc: '83㎡/南/高楼层',
      title: '天居园 2室1厅',
      price: 7200,
      tags: ['近地铁']
  },
  {
      houseCode: '3',
      houseImg: '/img/message/3.png',
      desc: '52㎡/西南/低楼层',
      title: '角门甲4号院 1室1厅',
      price: 4300,
      tags: ['集中供暖']
  }
]
// 房屋类型
export const roomTypeData = [
  [
      {label: '一室', value: 'ROOM|d4a692e4-a177-37fd'},
      {label: '二室', value: 'ROOM|d1a00384-5801-d5cd'},
      {label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2'},
      {label: '四室', value: 'ROOM|ce2a5daa-811d-2f49'},
      {label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f'}
  ]
]
// 楼层
export const floorData = [
  [
      {label: '高楼层', value: 'FLOOR|1'},
      {label: '中楼层', value: 'FLOOR|2'},
      {label: '低楼层', value: 'FLOOR|3'}
  ]
]

// 朝向
export const orientedData = [
  [
      {label: '东', value: 'ORIEN|141b98bf-1ad0-11e3'},
      {label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e'},
      {label: '南', value: 'ORIEN|61e99445-e95e-7f37'},
      {label: '北', value: 'ORIEN|caa6f80b-b764-c2df'},
      {label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977'},
      {label: '东北', value: 'ORIEN|67ac2205-7e0f-c057'},
      {label: '西南', value: 'ORIEN|2354e89e-3918-9cef'},
      {label: '西北', value: 'ORIEN|80795f1a-e32f-feb9'}
  ]
]
