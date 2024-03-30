import { reqGetCommunity } from "@/api";
import { CommunityTip } from "@/types";
import { getCity } from "@/utils/city";
import { SearchBar, Toast } from "antd-mobile";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";

let timer: NodeJS.Timeout | null = null
const Search  = () => {
  // 当前城市id
  const cityId = getCity().value
   // 搜索框的值
   const [searchTxt, setSearchTxt] = useState('')
   //提示词
   const [tipsList, setTipsList] = useState<CommunityTip[]>([])
   const nav = useNavigate()
  const location = useLocation()

   //关键词搜索小区信息
   const handleSearchTxt = (value: string) => {
    setSearchTxt(value)
    if (!value) {
      // 文本框的值为空
      setTipsList([])
      return
    }
    clearTimeout(timer as NodeJS.Timeout)
    timer = setTimeout(async() => {
      // 延迟500ms执行搜索
      const res = await reqGetCommunity(searchTxt,cityId)
      if (res.status === 200) {
        setTipsList(res.body)
      }
    }, 500)
   }

   const onTipsClick = (item:CommunityTip) => {
    const navTo = location.state ? location.state.from.pathname : '/rent/add'
    Toast.show('已跳转')
    nav(navTo,{
      replace: true,
      state:{
        name: item.communityName,
        id: item.community
      }
    })
   }

   //取消
   const cancelHandler = () => {
    const navTo = location.state ? location.state.from.pathname : '/rent/add'
    nav(navTo, {replace: true})
   }
  return (
    <div className="rentSearch">
      <SearchBar 
          placeholder="请输入小区名称"
          value={searchTxt}
          onChange={(value) => handleSearchTxt(value)}
          onCancel={cancelHandler}
          showCancelButton={() => true}/>

          {/* 搜索提示列表 */}
          <ul className="tips">
            {tipsList.map((item) => (
              <li key={item.community} onClick={() => onTipsClick(item)}>
                {item.communityName}
              </li>
            ))}
          </ul>
    </div>
  );
};

export default Search;
