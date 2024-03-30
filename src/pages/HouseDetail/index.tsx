import { reqAddFavorite, reqDeleteFavorite, reqGetHouseDetail, reqIsFavorite } from "@/api";
import NavHeader from "@/component/NavHeader";
import { BASE_URL, recommendHouses } from "@/constant";
import { HouseInfo } from "@/types";
import { Modal, Swiper, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.less";
import HousePackage from "@/component/HousePackage";
import HouseItem from "@/component/HouseItem";
import { isAuth } from "@/utils/auth";

const HouseDetail = () => {
  const isLogin = isAuth()
  const { id } = useParams() as { id: string };
  //房屋详情
  const [houseInfo, setHouseInfo] = useState<HouseInfo>({
    // 房屋图片
    houseImg: [],
    // 标题
    title: '',
    // 标签
    tags: [],
    // 租金
    price: 0,
    // 房型
    roomType: '',
    // 房屋面积
    size: 0,
    // 朝向
    oriented: [],
    // 楼层
    floor: '',
    // 小区名称
    community: '',
    // 地理位置
    coord: {
      latitude: '39.928033',
      longitude: '116.529466'
    },
    // 房屋配套
    supporting: [],
    // 房屋标识
    houseCode: '',
    // 房屋描述
    description: ''
  });
  // 数据加载中状态
  const [isLoading, setIsLoading] = useState(false)

  // 表示房源是否收藏
  const [isFavorite, setIsFavorite] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0);
    getHouseDetail();
    checkFavorite();
  }, [])

  //获取房屋详情
  const getHouseDetail = async () => {
    setIsLoading(true);
    //TODO: 获取房屋详情数据
    const res = await reqGetHouseDetail(id);
    if (res.status === 200) {
      setHouseInfo(res.body);
      const { community, coord } = res.body;
      renderMap(community, coord);
    }
    setIsLoading(false);
  }

  //渲染地图
  const renderMap = (community: string, coords: { latitude: string, longitude: string }) => {
    const map = new BMapGL.Map("map");
    const point = new BMapGL.Point(coords.longitude, coords.latitude);
    map.centerAndZoom(point, 17);
    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(0, -36)
    })
    label.setContent(`<span>${community}</span><div class='mapArrow'></div>`)
    label.setStyle({
      position: 'absolute',
      zIndex: -7982820,
      backgroundColor: 'rgb(238, 93, 91)',
      color: 'rgb(255, 255, 255)',
      height: 25,
      padding: '5px 10px',
      lineHeight: '14px',
      borderRadius: 5,
      boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
      whiteSpace: 'nowrap',
      fontSize: 12,
      userSelect: 'none'
    })
    map.addOverlay(label)
  }

  //检查房源是否收藏
  const checkFavorite = async () => {
    if (!isLogin) {
        // 没有登录
        return
    }
    // 已登录
    const res = await reqIsFavorite(id)
    if (res.status === 200) {
        // 表示请求已经成功，需要更新 isFavorite 的值
        setIsFavorite(res.body.isFavorite)
    }
}

  // 收藏房源
  const handleFavorite = async() => {
    if (!isLogin) {
      //未登录
      Modal.confirm({
        title: '提示',
        content: '登录后才能收藏房源，是否去登录?',
        cancelText: '取消',
        confirmText: '去登录',
        onConfirm: () => nav('/login', {state: location})
      })
      return;
    }

    // 已登录
    if (isFavorite) {
      // 已收藏，应该删除收藏
      const res = await reqDeleteFavorite(id)
      if (res.status === 200) {
        // 提示用户取消收藏
        Toast.show({content: '已取消收藏', duration: 1000})
        setIsFavorite(false)
      }else {
        // token 超时
        Toast.show({content: '登录超时，请重新登录'})
      }
    }else {
      // 未收藏，应该添加收藏
      const res = await reqAddFavorite(id)
      if (res.status === 200) {
        // 提示用户收藏成功
        Toast.show({content: '已收藏', duration: 1000})
        setIsFavorite(true)
    } else {
        // token 超时
        Toast.show({content: '登录超时，请重新登录'})
    }
    }
  }

  //在线咨询
  const Oncounsel = () => {
      Toast.show({content: '暂未开通', duration: 1000})
  }

  return (
    <div className="houseDetail">

      {/* 导航栏 */}
      <NavHeader className='navHeader' rightContent={[<i key="share" className="iconfont icon-share"></i>]}>
        {houseInfo.community}
      </NavHeader>

      {/* 轮播图 */}
      <div className="slides">
        {!isLoading && houseInfo.houseImg.length > 0 ? (
          <Swiper autoplay loop autoplayInterval={3000}>
            {houseInfo.houseImg.map((item) => (
              <Swiper.Item key={item}>
                <a href='#'>
                  <img src={BASE_URL + item} alt='' />
                </a>
              </Swiper.Item>
            ))}
          </Swiper>
        ) : null}
      </div>

      {/* 房屋基础信息 */}
      <div className="info">
        <h3 className="infoTitle">{houseInfo.title}</h3>
        <div className="tags">
          {houseInfo.tags.map((item, index) => {
            const tagClass = index <= 2 ? 'tag' + (index + 1) : 'tag3';
            return (
              <span key={item} className={['tag', tagClass].join(' ')}>
                {item}
              </span>
            )
          })}
        </div>
        <div className="infoPrice">
          <div className="infoPriceItem">
            <div>
              {houseInfo.price}
              <span className="month">/月</span>
            </div>
            <div>租金</div>
          </div>
          <div className="infoPriceItem">
            <div>
              {houseInfo.roomType}
            </div>
            <div>房型</div>
          </div>
          <div className="infoPriceItem">
            <div>
              {houseInfo.size}平米
            </div>
            <div>面积</div>
          </div>
        </div>
        <div className="infoBasic">
          <div>
            <div>
              <span className='title'>装修：</span>
              精装
            </div>
            <div>
              <span className='title'>楼层：</span>
              {houseInfo.floor}
            </div>
          </div>
          <div>
            <div>
              <span className='title'>朝向：</span>
              {houseInfo.oriented.join('、')}
            </div>
            <div>
              <span className='title'>类型：</span>
              普通住宅
            </div>
          </div>
        </div>
      </div>

      {/* 地图位置 */}
      <div className="map">
        <div className="mapTitle">
          小区：
          <span>{houseInfo.community}</span>
        </div>
        <div id='map'>地图</div>
      </div>

      {/* 房屋配套 */}
      <div className="about">
        <div className="houseTitle">房屋配套</div>
        {houseInfo.supporting.length === 0 ? (
          <div className="titleEmpty">暂无数据</div>
        ) : (
          <HousePackage list={houseInfo.supporting} />
        )}
      </div>

      {/* 房屋概况 */}
      <div className="set">
        <div className="houseTitle">房屋概况</div>
        <div>
          <div className="contact">
            <div className="user">
              <img src={BASE_URL + '/img/avatar.png'} alt="头像" />
              <div className="useInfo">
                <div>王女士</div>
                <div className="userAuth">
                  <i className="iconfont icon-auth" />
                  已认证房东
                </div>
              </div>
            </div>
            <span className="userMsg" onClick={Oncounsel}>发消息</span>
          </div>
          <div className="descText">{houseInfo.description || '暂无房屋描述'}</div>
        </div>
      </div>

      {/* 推荐房源 */}
      <div className="recommend">
        <div className="houseTitle">猜你喜欢</div>
        <div className="items">
          {recommendHouses.map((item) => (
            <HouseItem key={item.houseCode} item={item} />
          ))}
        </div>
      </div>

      {/* 底部收藏按钮 */}
      <div className="flxedBottom">
        <div onClick={handleFavorite}>
          <img src={BASE_URL + (isFavorite ? '/img/star.png' : '/img/unstar.png')}
            className="favoriteImg"
            alt="收藏" />
          <span className="favorite">{isFavorite ? '已收藏' : '收藏'}</span>
        </div>
        <div onClick={Oncounsel}>在线资讯</div>
        <div>
          <a href='tel:400-618-4000' className='telephone'>
            电话预约
          </a>
        </div>
      </div>
    </div>
  );

};

export default HouseDetail;
