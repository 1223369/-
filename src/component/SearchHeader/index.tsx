import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './index.less'

const SearchHeader: React.FC<{
    cityName: string,
    className?: string
}> = ({cityName, className}) => {
    const [community, setCommunity] = useState({name: '', id: ''})
    const nav = useNavigate()
    const location = useLocation()

    useEffect(() => {
        //当用户使用搜索框搜索时
        if(location.state) {
            setCommunity({
                name: location.state.name,
                id: location.state.id
            })
        }
    },[])


  return (
    <div className={['search-box',className].join(' ')}>
        <div className="search">
            <div className="location" onClick={() => nav('/citylist')}>
                <span className='name'>{cityName}</span>
                <i className='iconfont icon-arrow' />
            </div>

            <div className='form' onClick={() => nav('/search', {state: {from: location}})} >
                <i className="iconfont icon-seach" />
                <span className='text'>{community.name || '请输入小区或地址'}</span>
            </div>
        </div>
        <i className="iconfont icon-map" onClick={() => nav('/map')}/>
    </div>
  );
};

export default SearchHeader;
