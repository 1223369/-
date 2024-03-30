import { FiltersData, TitleSelectedStatus, TitleType } from '@/types';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import FilterTitle from './FilterTitle';
import { getCity } from '@/utils/city';
import { reqGetFiltersData } from '@/api';
import FilterPicker from './FilterPicker';
import FilterMore from './FilterMore';
import './index.less'

let htmlBody: HTMLElement | null = null

interface SelectedValues {
  area: string[]
  mode: string[]
  price: string[]
  more: string[]
}

const Filter: React.FC<{
    onFilter: (filters: {[p: string]: any}) => void;
    type?: number;
}>  = ({onFilter, type}) => {
  

  //标题高亮状态
  const [titleSelectedStatus, setTitleSelectedStatus] = useState<TitleSelectedStatus>({
    area: false,
    mode: false,
    price: false,
    more: false
  })

  //FilterPicker和FilterMore组件的选中值
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []
  })

  // 控制 FilterPicker 或 FilterMore 组件的展示或隐藏
  const [openType, setOpenType] = useState<TitleType | ''>('')

  //所有筛选条件数据
  const [filtersData,setFiltersData] = useState<FiltersData>({
      // FilterMore
      roomType: [],
      oriented: [],
      floor: [],
      characteristic: [],
      // FilterPicker
      area: {label: '', value: ''},
      subway: {label: '', value: ''},
      rentType: [],
      price: []
  })

  const isHide = openType === 'more' || openType === ''

  const [props, api] = useSpring(() => {
    return {
        opacity: isHide ? 0 : 1
    }
}, [isHide])

  //页面初始化操作
  useEffect(() => {
    htmlBody = document.body
    getFiltersData()
    handType()
    return () => {
      htmlBody = null
    }
  },[])

  //点击首页整租合租跳转过来的处理方法
  const handType = () => {
    if(type === 1 ) {
      setTitleSelectedStatus({area: false,mode: true,price: false,more: false})
      setSelectedValues({area: ['area', 'null'], mode: ['true'], price: ['null'], more: []})
    }else if(type === 2) {
      setTitleSelectedStatus({area: false,mode: true,price: false,more: false})
      setSelectedValues({area: ['area', 'null'], mode: ['false'], price: ['null'], more: []})
    }
  }

  //封装获取所有筛选条件的方法
  const getFiltersData = async() => {
    const {value} = getCity()
    const  res = await reqGetFiltersData(value)
    if(res.status === 200) {
        setFiltersData(res.body)
    }
  }

  //渲染FilterPicker组件的方法
  const renderFilterPicker = () => {
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price' ) {
        return null
    }

    //根据openType来拿到当前筛选条件数据
    let data: any[] = []
    const defaultValue = selectedValues[openType]
    
    switch(openType) {
      case 'area':
        //获的区域数据
        data = [filtersData.area, filtersData.subway]
        break
      case 'mode':
        //获的方式数据
        data = filtersData.rentType
        break
      case 'price':
        //获的价格数据
        data = filtersData.price
        break
      default:
        break
    }
      return (
        <FilterPicker
          type={openType}
          data={data}
          defaultValue={defaultValue}
          onSave={onSave}
          onCancel={onCancel}
        />
      )
  }

  //渲染FilterMore组件的方法
  const renderFilterMore = () => {
      const {roomType,oriented,floor,characteristic} = filtersData
      const data = {roomType,oriented,floor,characteristic}
      const defaultValue = selectedValues.more

      return(
        <FilterMore
          data={data}
          type={openType}
          defaultValue={defaultValue}
          onSave={onSave}
          onChancel={onCancel}
        />
      )
  }

  //点击标题菜单实现高亮
  const onTitleClick = (type: TitleType) => {
      htmlBody!.className = 'body-fixed'

      // 创建新的标题选中状态
      const newTitleSelectedStatus = {...titleSelectedStatus}
      Object.keys(titleSelectedStatus).forEach(key => {
          if(key === type) { //当前标题
              newTitleSelectedStatus[type] = true
              return
          }

          //其他标题
          const selectedVal = selectedValues[key as TitleType]
          if(key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
              //高亮
              newTitleSelectedStatus[key] = true
          } else if (key === 'mode' && selectedVal[0] !== 'null') {
              //高亮
              newTitleSelectedStatus[key] = true
          } else if (key === 'price' && selectedVal[0] !== 'null') {
              //高亮
              newTitleSelectedStatus[key] = true
          } else if (key === 'more' && selectedVal.length !== 0) {
              // 更多选择项 FilterMore 组件
              newTitleSelectedStatus[key] = true
          } else {
              newTitleSelectedStatus[key as TitleType] = false
          }
      })

      setOpenType(type)
      setTitleSelectedStatus(newTitleSelectedStatus)
  }

  const onSave = (type: TitleType, value: string[]) => {
      htmlBody!.className = ''

      //创建新的标题选中状态对象
      const newTitleSelectedStatus = {...titleSelectedStatus}
      //菜单高亮处理
      const selectedVal = value
        if (type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'mode' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'price' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'more' && selectedVal.length !== 0) {
            // 更多选择项 FilterMore 组件
            newTitleSelectedStatus[type] = true
        } else {
            newTitleSelectedStatus[type] = false
        }

        const newSelectedValues = {
            ...selectedValues,
            [type]: value
        }

        const {area, mode, price, more} = newSelectedValues

        //筛选条件数据
        const filters: {[key: string]: any} = {}

        //区域
        const areaKey = area[0]
        let areaValue = 'null'
        if (area.length === 3) {
          areaValue = area[2] !== 'null' ? area[2] : area[1]
      }
      filters[areaKey] = areaValue

      //方式和租金
      filters.mode = mode[0]
      filters.price = price[0]

      //更多筛选条件more
      filters.more = more.join(',')
      // 调用父组件中的方法，来将筛选数据传递给父组件
      onFilter(filters)

      //隐藏对话框
      setOpenType('')
      setTitleSelectedStatus(newTitleSelectedStatus)
      setSelectedValues(newSelectedValues)
  }

  const onCancel = (type:TitleType) => {
      htmlBody!.className = ''
      //创建新的标题选中状态
      const newTitleSelectedStatus = {...titleSelectedStatus}
      //菜单高亮逻辑处理
      const selectedVal = selectedValues[type]

      if(type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
          //高亮
          newTitleSelectedStatus[type] = true
      } else if(type === 'mode' && selectedVal[0] !== 'null') {
          //高亮
          newTitleSelectedStatus[type] = true
      }else if (type === 'price' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
        // 更多选择项 FilterMore 组件
        newTitleSelectedStatus[type] = true
    } else {
        newTitleSelectedStatus[type] = false
    }
    setOpenType('')
    setTitleSelectedStatus(newTitleSelectedStatus)
  }


  return (
    <div className="filter">
        {/* 前三个选项的遮罩层 */}
        <animated.div style={props}>
            {!isHide && <div className='mask' onClick={() => onCancel(openType as TitleType)} />}
        </animated.div>

        <div className="content">
            {/* 标题栏 */}
            <FilterTitle titleSelectedStatus={titleSelectedStatus} onTitleClick={onTitleClick}/>

            {/* 前三个菜单对应的内容 */}
            { renderFilterPicker() }
            {/* 最后一个菜单对应的内容 */}
            { renderFilterMore() }
        </div>
    </div>
  );
};

export default Filter ;
