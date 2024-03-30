import FilterFooter from "@/component/FilterFooter";
import { TitleType } from "@/types";
import { CascadePickerView } from "antd-mobile";
import React, { useState } from "react";

const FilterPicker: React.FC<{
    type: TitleType
    data: any[]
    defaultValue: string[]
    onSave: (type: TitleType, value: string[]) => void
    onCancel: (type: TitleType) => void
}>  = ({type, data, defaultValue, onSave, onCancel}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      {/* 选择器组件 */}
      <CascadePickerView options={data} value={value} onChange={(value1) => setValue((value1) as string[])}/>

      {/* 底部按钮 */}
      <FilterFooter onCancel={() => onCancel(type)} onOk={() => onSave(type, value)} />
    </>
  );
};

export default FilterPicker ;
