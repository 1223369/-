import React from "react";
import './index.less'

const FilterFooter: React.FC<{
    cancelText?: string;
    okText?: string;
    onCancel: () => void;
    onOk: () => void;
    className?: string;
}>  = ({cancelText = '取消', okText = '确定', onCancel, onOk, className}) => {
  return (
    <div className={['filterFooter', className || ''].join(' ')}>
        <span className="btn cancel" onClick={onCancel}>
            {cancelText}
        </span>
        <span className="btn ok" onClick={onOk}>
            {okText}
        </span>
    </div>
  );
};

export default FilterFooter ;
