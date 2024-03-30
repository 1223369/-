import { NavBar } from "antd-mobile";
import React, {ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import './index.less'

const NavHeader: React.FC<{
    children: ReactNode,
    className?: string,
    onLeftClick?: () => void,
    rightContent?: ReactNode
}> = ({children, className, onLeftClick, rightContent}) => {

  const nav = useNavigate();
  const defaultHandler = () => nav(-1)

  return (
      <NavBar
          className={className}
          backArrow={<i className="iconfont icon-back" onClick={onLeftClick || defaultHandler}/>}
          left={rightContent}
      >
          {children}
      </NavBar>
  );
};

export default NavHeader ;
