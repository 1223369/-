
import {BASE_URL} from '@/constant'
import {Grid, Swiper} from 'antd-mobile'
import { useAppSelector} from '@/hooks'
import { getCurrentCity } from '@/utils/city'
import './index.less'
import { City, Group } from '@/types'
import { useEffect, useState } from 'react'
import SearchHeader from '@/component/SearchHeader'

import nav_1 from '@/assets/images/nav-1.png'
import nav_2 from '@/assets/images/nav-2.png'
import nav_3 from '@/assets/images/nav-3.png'
import nav_4 from '@/assets/images/nav-4.png'
import { reqGetGroups } from '@/api'
import { useNavigate } from 'react-router-dom'
import NewItem from '@/component/NewItem'

const HomeIndex = () => {

    const navs = [
        {
            id: 1,
            img: nav_1,
            title: '整租',
            path: '/list'
        },
        {
            id: 2,
            img: nav_2,
            title: '合租',
            path: '/list'
        },
        {
            id: 3,
            img: nav_3,
            title: '地图找房',
            path: '/map'
        },
        {
            id: 4,
            img: nav_4,
            title: '去出租',
            path: '/rent/add'
        },
    ]

    const nav = useNavigate();

    // 轮播图状态数据
    const imgList = useAppSelector((state) => state.home.imgList)

    // 获取最新资讯
    const news = useAppSelector((state) => state.home.news)
    
    //当前城市名称
    const [curCityName, setCurCityName] = useState('北京')
    
    //租房小组数据
    const [groupList, setGroupList] = useState<Group[]>([])


    // 获取租房小组数据的方法
    const getGroups = async (area = 'AREA%7C88cff55c-aaa4-e2e0') => {
        const res = await reqGetGroups(area)
        if (res.status === 200) {
            setGroupList(res.body)
        }
    }

    //获取当前定位城市
    const getCurCity = async () => {
        const curCity = (await getCurrentCity()) as City
        // console.log(curCity)
        setCurCityName(curCity.label)
    }


    useEffect(() => {
        getGroups();
        getCurCity();
    },[])

    return (
        <div className='index'>
            {/* 轮播图和搜索框 */}
            <div className='swiper'>
                {imgList.length > 0 && ( 
                    <Swiper autoplay loop>
                        {imgList.map((item) => (
                            <Swiper.Item key={item.id}>
                                <a
                                    href='/home'
                                    style={{display: 'inline-block', width: '100%', height: 212}}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <img
                                        src={BASE_URL + item.imgSrc}
                                        alt={item.alt}
                                        style={{width: '100%', verticalAlign: 'top'}}
                                    />
                                </a>
                            </Swiper.Item>
                        ))}
                    </Swiper>
                )}

                <SearchHeader cityName={curCityName} />
            </div>

            {/* 菜单tab */}
            <Grid columns={navs.length} className="nav">
                {navs.map((item) => (
                  // 
                    <Grid.Item key={item.id} onClick={() => nav(item.path, {state: {type: item.id}})}>  
                        <img src={item.img} alt=''/>
                        <h2>{item.title}</h2>
                    </Grid.Item>
                ))}
                
            </Grid>
            
            {/* 租房小组 */}
            <div className="group">
                <h3 className="group-title">
                    租房小组
                    <span className='more' onClick={() => nav('/list')}>更多</span>
                </h3>

                <Grid columns={2} gap={10}>
                    {groupList.map((item) => (
                        <Grid.Item key={item.id}>
                            <div className="desc">
                                <p className="title">{item.title}</p>
                                <span className="info">{item.desc}</span>
                            </div>
                            <img src={BASE_URL + item.imgSrc} alt="" />
                        </Grid.Item>
                    ))}
                </Grid>
            </div>
            
            {/* 最新资讯 */}
            <div className="news">
                <h3 className="group-title">最新资讯</h3>
                {news.map(item => (
                    <NewItem key={item.id} item={item} />
                ))}
            </div>

        </div>
    )
}

export default HomeIndex
