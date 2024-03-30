import { animated, useSpring } from 'react-spring'
import { FiltersDataItem, TitleType } from '@/types'
import { useState } from 'react'
import FilterFooter from '@/component/FilterFooter'
import './index.less'


interface FilterMoreDataType {
  roomType: FiltersDataItem[]
  oriented: FiltersDataItem[]
  floor: FiltersDataItem[]
  characteristic: FiltersDataItem[]
}


const FilterMore: React.FC<{
    data:FilterMoreDataType
    type: TitleType | ''
    onSave: (type: TitleType, value: string[]) => void
    onChancel: (type: TitleType) => void
    defaultValue: string[]
}>  = ({data: {roomType, oriented, floor, characteristic}, type, onSave, onChancel, defaultValue}) => {

  let isOpen = type === 'more'
  const [selectedValues, setSelectedValues] = useState(defaultValue)

  const [maskProps, maskApi] = useSpring(
    () => ({
      opacity: isOpen? 1: 0
    }),
    [isOpen]
  )

  const [tagsProps, tagsApi] = useSpring(
    () => ({
      transform: `translate(${isOpen ? '0%' : '100%'}, 0px)`
    }),
    [isOpen]
  )

  // 标签点击事件
  const onTagClick = (value: string) => {
      //创建新的选中值数组
      const newSelectedValues = [...selectedValues]
      //当前没有选中这个值
      if(newSelectedValues.indexOf(value) <= -1) {
        newSelectedValues.push(value)
      }else { //已经选中这个值
        const index = newSelectedValues.findIndex((item) => item === value); //在数组中找到value的下标
        newSelectedValues.splice(index, 1) //删除这个数据
      }
      setSelectedValues(newSelectedValues)
  }

  //渲染标签
  const renderFilters = (data: FiltersDataItem[]) => {
    // 高亮类名： styles.tagActive
    return data.map((item) => {
        const isSelected = selectedValues.indexOf(item.value) > -1
        return (
          <span
              key={item.value}
              className={['tag',isSelected ? 'tagActive': ''].join(' ')}
              onClick={() => onTagClick(item.value)}
          >
            {item.label}
          </span>
        )
    })
  }

  //取消按钮的事件处理
  const onCancelMyself = () => {
      setSelectedValues([])
  }

  //确定按钮事件处理函数
  const onOkMyself = () => {
      onSave(type as TitleType, selectedValues)
  }

  return (
    <div className="filterMore">
      {/* 遮罩层 */}
        <animated.div style={maskProps}>
            {isOpen && <div className="mask" onClick={() => onChancel(type as TitleType)}/>}
        </animated.div>

        {/* 条件内容 */}
        <animated.div style={tagsProps} className='tags'>
            <dl>
                <dt>户型</dt>
                <dd>{renderFilters(roomType)}</dd>

                <dt>朝向</dt>
                <dd>{renderFilters(oriented)}</dd>

                <dt>楼层</dt>
                <dd>{renderFilters(floor)}</dd>

                <dt>房屋亮点</dt>
                <dd>{renderFilters(characteristic)}</dd>
            </dl>

            {/* 底部按钮 */}
            <FilterFooter className='footer' cancelText='清空' onCancel={onCancelMyself} onOk={onOkMyself}/>
        </animated.div>

        
    </div>
  );
};

export default FilterMore ;
