import React, {lazy} from 'react'
import {Route, Routes} from 'react-router-dom'
import Redirect from '@/component/Redirect'
import { useInitData } from './hooks'
import AuthRoute from '@/component/AuthRoute'
import HouseList from '@/pages/Home/HouseList'
import { KeepAlive } from 'react-activation'

const Home = lazy(() => import('@/pages/Home'))
const HomeIndex = lazy(() => import('@/pages/Home/HomeIndex'))
const News = lazy(() => import('@/pages/Home/News'))
// const HouseList = lazy(() => import('@/pages/Home/HouseList'))
const Profile = lazy(() => import('@/pages/Home/Profile'))
const CityList = lazy(() => import('@/pages/CityList'))
const Map = lazy(() => import('@/pages/Map'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const HouseDetail = lazy(() => import('@/pages/HouseDetail'))
const Search = lazy(() => import('@/pages/Search'))
const Rent = lazy(() => import('@/pages/Rent'))
const RentAdd = lazy(() => import('@/pages/Rent/RentAdd'))


const App = () => {
  useInitData();
  
  return (
    <div className='App'>
            <Routes>
                {/* Home 组件是父路由的内容 */}
                <Route path='*' element={<Redirect to='home' />} />
                <Route path='/' element={<Home />}>
                    <Route path='home' element={<HomeIndex />} />
                    <Route path='news' element={<News />} />
                    <Route path='list' element={<KeepAlive id='index'><HouseList /></KeepAlive>} />
                    <Route path='profile' element={<Profile />} />
                    {/* 默认路由匹配时，跳转到 /home 实现路由重定向到首页 */}
                    <Route path='/' element={<Redirect to='home' />} />
                </Route>
                <Route path='citylist' element={<CityList />} />
                <Route path='map' element={<Map />} />
                <Route path='search' element={<Search />} />

                {/* 房源详情的路由规则： */}
                <Route path='detail/:id' element={<HouseDetail />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

                 {/* 配置登录后，才能访问的页面 */}
                 <Route path='rent' element={<AuthRoute><Rent /></AuthRoute>}/>
                <Route path='rent/add' element={<AuthRoute><RentAdd /></AuthRoute>}/>
            </Routes>
    </div>
  )
}

export default App
