import React, { useState } from "react";
import { HOUSE_PACKAGE } from "@/constant";
import "./index.less";

const HousePackage: React.FC<{
  list?: string[]
  select?: boolean
  onSelect?: (newSelectedNames: string[]) => void
}> = ({ list, select, onSelect }) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([])
  // 如果传了 select 表示：选择 房屋配置
  // 如果没传 select 表示：展示 房屋配置 列表
  const data = select ? HOUSE_PACKAGE : HOUSE_PACKAGE.filter((item) => list?.includes(item.name))

  //根据id切换选中状态
  const toggleSelected = (name: string) => {
    let newSelectedNames;
    if (selectedNames.indexOf(name) > -1) {
      // 选中：从数组中删除选中项，也就是保留未选中项
      newSelectedNames = selectedNames.filter((item) => item!== name)
    }else {
      // 未选中：添加到数组中
      newSelectedNames = [...selectedNames, name]
    }
    // 传递给父组件
    onSelect && onSelect(newSelectedNames)
    setSelectedNames(newSelectedNames)
  }


  return (
    <ul className="housePackage">
      {data.map((item) => {
        const isSelected = selectedNames.indexOf(item.name) > -1
        return (
          <li
            key={item.id}
            className={['item', isSelected ? 'active' : ''].join(' ')}
            onClick={() => {
              select && toggleSelected(item.name)
            }}>
            <p>
              <i className={`iconfont icon ${item.icon}`}></i>
            </p>
            {item.name}
          </li>
        )
      })}
    </ul>
  );
};

export default HousePackage;
