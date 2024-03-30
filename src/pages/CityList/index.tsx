import { memo, useEffect, useRef, useState } from 'react'
import { City } from '@/types'
import { Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { useAppSelector } from '@/hooks'
import './index.less'
import NavHeader from '@/component/NavHeader'
import { formatCityIndex, setCity } from '@/utils/city'

const AutoSizer1: any = AutoSizer
const List1: any = List

// 有房源的城市
const HouseCity = ['北京', '上海', '广州', '深圳']

const CityList = () => {

  const nav = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef()
  const cityList = useAppSelector((state) => state.cityList.cityList)
  const cityIndex = useAppSelector((state) => state.cityList.cityIndex)

  // 创建动态计算每一行高度的方法
  const getRowHeight = ({ index }: { index: number }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    return 36 + cityList[cityIndex[index]].length * 50
  }

  //切换城市
  const changeCity = (curCity: City) => {
    if(HouseCity.indexOf(curCity.label) > -1) {
      setCity({label: curCity.label, value: curCity.value})
      nav(-1)
    }else {
      Toast.show({content: '该城市暂无房源数据', duration: 1000})
    }
  }

  //List组件渲染每一行方法
  const rowRenderer = ({ key, index, style }: any) => {
    //字母索引集合
    const letter = cityIndex[index]
    // 获取指定字母索引下的城市列表数据
    return (
      <div key={key} style={style} className='city'>
        <div className='title'>{formatCityIndex(letter)}</div>
        {cityList[letter].map((item: City) => (
          <div className="name" key={item.value} onClick={() => changeCity(item)}>
            {item.label === '' ? '暂无定位信息' : item.label}
          </div>
        ))}
      </div>
    )
  }

  //用于获取List组件中渲染行的信息
  const onRowsRendered = ({ startIndex }: { startIndex: number }) => {
    //设置当前选中城市的索引
    startIndex !== activeIndex ? setActiveIndex(startIndex) : null;
  }


  return (
    <div className='citylist'>
      <NavHeader>城市选择</NavHeader>

      <AutoSizer1>
        {({ height, width }: { height: number; width: number }) => (
          <List1
            ref={listRef}
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            width={width}
            onRowsRendered={onRowsRendered}
            scrollToAlignment='start'
          />
        )}
      </AutoSizer1>

      <ul className="city-index">
          {cityIndex.map((item:string, index:number) => (
            <li
              key={item}
              onClick={() => {
                // @ts-ignore
                listRef.current?.scrollToRow(index)
              }}>
                <span className={index === activeIndex? 'index-active' : ''}>
                  {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default memo(CityList)
