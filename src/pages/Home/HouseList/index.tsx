import SearchHeader from "@/component/SearchHeader";
import { City, House } from "@/types";
import { getCurrentCity } from "@/utils/city";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import './index.less'
import Sticky from "@/component/Sticky";
import Filter from "./Filter";
import { Toast } from "antd-mobile";
import { reqGetHouseList } from "@/api";
import NoHouse from "@/component/NoHouse";
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import HouseItem from "@/component/HouseItem";
import { set } from "nprogress";


const InfiniteLoader1: any = InfiniteLoader;
const WindowScroller1: any = WindowScroller;
const AutoSizer1: any = AutoSizer;
const List1: any = List;

//默认初始值
// let name = ''
// let id = ''
// 初始化实例属性
let filters = {}

const HouseList = () => {

  const nav = useNavigate();

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  
  const {state} = useLocation();


  //数据是否加载中
  const [isLoading, setIsLoading] = useState(false)
  //房屋列表数据
  const [list, setList] = useState<House[]>([])
  //房屋总条数
  const [count, setCount] = useState(0)

  useEffect(() => {
    getCurrentCity().then((value1) => {
      const {label, value} = value1 as City;
      setName(label)
      setId(value)
    })
    judgType()
    searchHouseList()
  },[])

  //判断是否点击首页整租合租跳转过来的
  const judgType = () => {
    if(state && state.type === 1){
      onFilter({mode: true})
      searchHouseList()
    }else if(state && state.type === 2){
      onFilter({mode: false})
      searchHouseList()
    }
  }

  const onFilter = (value: Object) => {
    filters = value
    searchHouseList()
  }

  //用来获取房屋列表数据
  const searchHouseList = async() => {
      setIsLoading(true)
      Toast.show({icon: 'loading', content: '正在加载中...'})
      const res = await reqGetHouseList(id,filters,1,20)
      if(res.status === 200){
          setList(res.body.list)
          setCount(res.body.count)
      }
      Toast.clear()
      if(count !== 0) {
        Toast.show({content: `共找到 ${count} 套房源`})
      }
      setIsLoading(false)
  }

  //判断列表中的每一行是否加载完成
  const isRowLoaded = ({index}:any) => {
    return !!list[index];
  }

  //用来获取更多房屋列表数据
  // 注意：该方法的返回值是一个Promise对象，并且，这个对象应该在数据加载完成时，来调用resolve 让Promise对象的状态变为已完成。
  const loadMoreRows = ({startIndex, stopIndex}:any) => {
    return new Promise((resolve:any) => {
        reqGetHouseList(id,filters,startIndex,stopIndex).then((res:any) => {
            setList([...list,...res.body.list])
            resolve()
        })
    })
  }

  //渲染房屋列表项
  const renderHouseList = ({key, index, style}:any) => {
    const house = list[index]
    //判断house是否存在
    //如果不存在，就渲染loding元素占位
    if(!house){
        return (
          <div key={key} style={style}>
            <p style={{lineHeight: '120px', textAlign: 'center', height: '110px', backgroundColor: '#f6f5f6'}}/>
          </div>
        )
    }

    return (
        <HouseItem
          key={key}
          onClick={() => nav(`/detail/${house.houseCode}`)}
          style={style}
          item={house}
        />
    )
  }

  return (
    <div className='houseList'>
        {/* 顶部导航栏 */}
        <div className="header">
            <i className='iconfont icon-back' onClick={() => nav(-1)} />
            <SearchHeader cityName={name} className={'searchHeader'} />
        </div> 

        {/* 条件筛选栏 */}
        {/*  type={ state?.type } */}
        <Sticky height={401}>
            <Filter onFilter={onFilter} type={ state?.type }/>
        </Sticky>

        {/* 渲染列表数据 */}
        { count === 0 && !isLoading ? (
          <NoHouse>没有找到房源，换个条件试试吧~</NoHouse>
        ):(
          <InfiniteLoader1 isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={count}>
              {({ onRowsRendered, registerChild }:any) => (
                <WindowScroller1>
                    {({height, isScrolling, scrollTop} :any) => (
                        <AutoSizer1>
                            {({width} :any) => (
                                <List1 
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    autoHeight //设置高度为WindowScroller的高度 最终渲染的列表高度
                                    width={width} //视口的人宽度
                                    height={height} //视口的高度
                                    rowCount={count} //List列表的行数
                                    rowHeight={130} //List列表的行高
                                    rowRenderer= {renderHouseList}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    />
                            )}
                        </AutoSizer1>
                    )}
                </WindowScroller1>
              )}
          </InfiniteLoader1>
        )}
    </div>
  );
};

export default HouseList ;
