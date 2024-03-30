import NavHeader from "@/component/NavHeader";
import { getCity } from "@/utils/city";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CityMap } from '@/types';
import './index.less'
import { Toast } from "antd-mobile";
import { reqGetHouseList, reqGetMapList } from "@/api";
import HouseItem from "@/component/HouseItem";

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: 'none',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

let map: any
let nextZoom: number = 11
let type: 'circle' | 'rect' = 'circle'

const Map = () => {

  const [housesList, setHousesList] = useState<House[]>([])
  const [isBack, setIsBack] = useState(false)
  const nav = useNavigate()
  const [mapInfo, setMapInfo] = useState<{ id: string; point: any }[]>([])
  const [isShowList, setIsShowList] = useState(false)

  useEffect(() => {
    initMap()
    return () => {
      map = null
      nextZoom = 11
      type = 'circle'
    }
  }, [])



  //初始化地图
  const initMap = () => {
    const { label, value } = getCity()
    map = new BMapGL.Map('container');
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(
      label,
      async (point: { lng: number; lat: number }) => {
        if (point) {
          // 初始化地图  设置中心点坐标
          map.centerAndZoom(point, 11)
          //存储之前的位置
          renderOverlays(value)
          // 存储之前的地图信息
          mapInfo.push({ id: value, point: new BMapGL.Point(point.lng, point.lat) })
          setMapInfo(mapInfo)
          // 添加常用控件
          map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
          map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
          // 调用 renderOverlays 方法
          renderOverlays(value)
        } else {
          Toast.show('获取地址失败')
        }
      },
      label
    )
    // 给地图绑定移动事件
    map.addEventListener('movestart', () => {
      setIsShowList(false)
    })
  }

  //渲染覆盖物入口
  const renderOverlays = async (id: string | undefined, back: boolean = false) => {
    if (!id) return
    try {
      Toast.show({ icon: 'loading', content: '加载中…' })
      const res = await reqGetMapList(id)
      getTypeAndZoom(back)
      if (res.status === 200) {
        if (type === 'circle') {
          res.body.forEach((item: CityMap) => {
            const {
              coord: { longitude, latitude },
              label,
              count,
              value
            } = item
            const areaPoint = new BMapGL.Point(longitude, latitude)
            createCircle(areaPoint, label, count, value, nextZoom)
          })
        } else {
          res.body.forEach((item: CityMap) => {
            const {
              coord: { longitude, latitude },
              label,
              count,
              value
            } = item
            const areaPoint = new BMapGL.Point(longitude, latitude)
            createRect(areaPoint, label, count, value)
          })
        }
      }
      Toast.clear()
    } catch (e) {
      Toast.show({ content: '数据加载失败' })
    }
  }

  //计算要绘制的覆盖物类型和下一个缩放级别
  const getTypeAndZoom = (back: boolean = false) => {
    const zoom = map.getZoom();
    if (back) {
      if (type === 'rect') {
        nextZoom = 15
        type = 'circle'
      } else {
        nextZoom = 13
      }
    } else {
      if (zoom >= 10 && zoom < 12) {
        // 区
        nextZoom = 13
      } else if (zoom >= 12 && zoom < 14) {
        // 镇
        nextZoom = 15
      } else {
        // 小区
        nextZoom = 15
        type = 'rect'
      }
    }
  }

  // 创建区、镇覆盖物
  const createCircle = (point: any, name: string, count: number, id: string, zoom: number) => {
    //创建覆盖物
    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(-35, -35),
    })
    //添加唯一标识符
    label.id = id
    //设置房源覆盖物的内容
    label.setContent(`<div class="bubble"><p class="name">${name}</p><p>${count}套</p></div>`)
    label.setStyle(labelStyle)

    //添加点击事件
    label.addEventListener('click', () => {
      //放大地图，以当前点击的覆盖物为中心放大地图
      map.centerAndZoom(point, zoom)
      //清除当前覆盖物信息 
      map.clearOverlays()
      //存储之前的地图信息
      mapInfo.push({ id, point })
      setMapInfo(mapInfo)
      setIsBack(true)
      // 调用 renderOverlays 方法，获取该区域下的房源数据
      renderOverlays(id)
    })
    // 将标注添加到地图中
    map.addOverlay(label)
  }

  //创建小区覆盖物
  const createRect = (point: any, name: string, count: number, id: string) => {

    //创建覆盖物
    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(-50, -28),
    })
    //添加唯一标识
    label.id = id
    //设置房源覆盖物内容
    label.setContent(
      `<div class="rect"><span class="housename">${name}</span><span class="housenum">${count}套</span><i class="arrow"></i></div>`
    )
    // 设置label的样式
    label.setStyle(labelStyle)

    //添加点击事件
    label.addEventListener('click', (e: any) => {
      // 获取并渲染房源数据
      getHousesList(id)
      // 获取当前被点击项
      const target = e.domEvent.changedTouches[0]
      map.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 330) / 2 - target.clientY)
    })
    // 将标注添加到地图中
    map.addOverlay(label)
  }

  // 获取小区数据
  const getHousesList = async (id: string) => {
    try {
      Toast.show({ icon: 'loading', content: '加载中…' })
      const res = await reqGetHouseList(id)
      Toast.clear()
      if (res.status === 200) {
        setHousesList(res.body.list)
        setIsShowList(true)
      }
    } catch (e) {
      Toast.clear()
    }
  }

  //返回上一级地图
  const goBack = () => {
    let zoom: number
    if (type === 'rect') {
      zoom = 13
    } else {
      zoom = 11
    }
    map.centerAndZoom(mapInfo.at(-2)?.point, zoom)
    map.clearOverlays()
    renderOverlays(mapInfo.at(-2)?.id, true)
    mapInfo.pop()
    setMapInfo(mapInfo)
    setIsShowList(false)
    mapInfo.length <= 1 ? setIsBack(false) : setIsBack(true)
  }

  return (
    <div className="map">
      <NavHeader
        onLeftClick={isBack ? () => goBack() : undefined}
        rightContent={<i className='iconfont icon-error' onClick={() => nav(-1)} />}>
        地图找房
      </NavHeader>

      <div id='container' />

      <div className={['houseList', isShowList ? 'show' : ''].join(' ')}>
        <div className='titleWrap'>
          <h1 className='listTitle'>房屋列表</h1>
          <Link className='titleMore' to='/list'>
            更多房源
          </Link>
        </div>
        <div className="houseItems">
          {housesList.map((item) => (
            <HouseItem key={item.houseCode} onClick={() => nav(`/detail/${item.houseCode}`)} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
