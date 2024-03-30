import { BASE_URL } from "@/constant";
import React,{ReactNode} from "react";
import "./index.less";

const NoHouse: React.FC<{
    children: ReactNode;
}>  = ({children}) => {
  return (
    <div className="noHouse">
        <img className="img" src={BASE_URL + "/img/not-found.png"} alt="暂无数据" />
        <p className="msg">{children}</p>
    </div>
  );
};

export default NoHouse ;
