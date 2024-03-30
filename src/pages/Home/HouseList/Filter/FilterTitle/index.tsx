import { TitleSelectedStatus } from "@/types";
import React from "react";
import './index.less'


//条件筛选栏标题数组
const titleList = [
    {title: '区域', type: 'area'},
    {title: '方式', type: 'mode'},
    {title: '租金', type: 'price'},
    {title: '筛选', type: 'more'},
]

const FilterTitle: React.FC<{
    titleSelectedStatus: TitleSelectedStatus
    onTitleClick: (type: any) => void
}> = ({titleSelectedStatus, onTitleClick}) => {
  return (
    <div className='filterTitle'>
        {titleList.map((item) => {
            const isSelected = titleSelectedStatus[item.type]
            return(
              <div key={item.type} onClick={() => onTitleClick(item.type)}>
                  {/* 选中类名： selected */}
                  <span className={['dropdown', isSelected ? 'selected' : ''].join(' ')}>
                      <span>{item.title}</span>
                      <i className={['iconfont icon-arrow',isSelected ? 'rotate' : ''].join(' ')}/>
                  </span>
              </div>
            )
        })}
    </div>
  );
};

export default FilterTitle ;
