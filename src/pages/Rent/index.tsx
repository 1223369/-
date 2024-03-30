import { reqGetRentHouse } from "@/api";
import HouseItem from "@/component/HouseItem";
import NavHeader from "@/component/NavHeader";
import NoHouse from "@/component/NoHouse";
import { House } from "@/types";
import { Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.less";

const Rent = () => {
  // 出租房屋列表
  const [list, setList] = useState<House[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const nav = useNavigate()

  useEffect(() => {
    getHouseList()
  }, []);

  // 获取已发布房源的列表数据
  const getHouseList = async () => {
    Toast.show({ icon: 'loading', content: '正在获取房源列表...' })
    const res = await reqGetRentHouse()

    if (res.status === 200) {
      setList(res.body)
    } else {
      nav('/login', { state: { from: location } })
    }
    Toast.clear()
    setIsLoading(false)
  }

  return (
    <div className="rent">
      <NavHeader>房屋管理</NavHeader>
      {!isLoading && list.length <= 0 ? (
        <NoHouse>
          您还没有房源
          <Link to="/rent/add">去发布房源</Link>
          吧~
        </NoHouse>
      ) : (
        <div className="house">
          {list.map((item) => (
            <HouseItem key={item.houseCode} onClick={() => nav(`/detail/${item.houseCode}`)} item={item}></HouseItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rent;
