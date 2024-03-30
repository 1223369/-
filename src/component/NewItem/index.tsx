import React from "react";
import { New } from "@/types";
import { BASE_URL } from "@/constant";
import './index.less'

const NewItem: React.FC<{
    item: New;
}>  = ({item}) => {
  return (
    <div className="news-item" key={item.id}>
      <div className="imgwrap">
        <img className="img" src={BASE_URL + item.imgSrc} alt="" />
      </div>
      <div className="content">
          <h3 className="title">{item.title}</h3>
          <div className="info">
              <span>{item.from}</span>
              <span>{item.date}</span>
          </div>
      </div>
    </div>
  );
};

export default NewItem ;
