import { TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import './index.less'

const Home  = () => {

  const nav = useNavigate();
  const {pathname} = useLocation()

  const setRouteActive = (value: string) => {
    nav(value);
  }

  const tabs = [
    {
        key: '/home',
        title: '首页',
        icon: <i className='iconfont icon-ind' />
    },
    {
        key: '/list',
        title: '找房',
        icon: <i className='iconfont icon-findHouse' />
    },
    {
        key: '/news',
        title: '资讯',
        icon: <i className='iconfont icon-infom' />
    },
    {
        key: '/profile',
        title: '我的',
        icon: <i className='iconfont icon-my' />
    }
  ]

  return (
    <div className='home'>
        <Outlet />
        <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
          ))}
        </TabBar>
    </div>
  );
};

export default Home ;
