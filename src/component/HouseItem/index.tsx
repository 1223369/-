import { BASE_URL } from "@/constant";
import { House } from "@/types";
import React from "react";
import "./index.less";

const HouseItem:React.FC<{
  onClick?: () => void
  item: House
  style?: Object
}>  = ({ onClick,style, item: { houseImg: src, title, desc, tags, price } }) => {
  return (
    <div className="house" onClick={onClick} style={style}>
        <div className="imgWrap">
            <img className="img" src={BASE_URL + src} alt="" />
        </div>
        <div className="content">
            <h3 className="title">{title}</h3>
            <div className="desc">{desc}</div>
            <div>
                {tags.map((tag, index) => {
                    const tagClass = 'tag' + (index + 1);
                    return(
                        <span className={['tag',tagClass].join(' ')} key={tag}>
                            {tag}
                        </span>
                    )
                })}
            </div>
            <div className="price">
                <span className="priceNum">{price}</span>元/月
            </div>
        </div>
    </div>
  );
};

export default HouseItem ;
