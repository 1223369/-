import { BASE_URL } from "@/constant";
import "./index.less";
import { useEffect, useState } from "react";
import { isAuth, removeToken } from "@/utils/auth";
import { reqGetUserInfo, reqLogout } from "@/api";
import { Button, Grid, Modal, Toast } from "antd-mobile";
import { Link, useNavigate } from "react-router-dom";
// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  { id: 4, name: '成为房主', iconfont: 'icon-identity' },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]
// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
const Profile = () => {
  const nav = useNavigate()
  // 是否登录
  const [isLogin, setIsLogin] = useState(isAuth())
  // 用户信息
  const [userInfo, setUserInfo] = useState({ avatar: '', nickname: '' })

  useEffect(() => {
    getUserInfo()
  }, [])

  //获取用户信息
  const getUserInfo = async () => {
    if (!isLogin) return
    const res = await reqGetUserInfo()
    if (res.status === 200) {
      const { avatar, nickname } = res.body
      setUserInfo({
        avatar: BASE_URL + avatar,
        nickname
      })
    } else {
      setIsLogin(false)
    }
  }

  //退出登录
  const logout = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确定退出?',
      cancelText: '取消',
      confirmText: '退出',
      onConfirm: async () => {
        await reqLogout()
        removeToken()
        setIsLogin(false)
        setUserInfo({
          avatar: '',
          nickname: ''
        })
      }
    })
  }

  //加入我们
  const joinUs = () => {
    Toast.show('敬请期待')
  }

  return (
    <div className="profile">
      {/* 个人信息 */}
      <div className="title">
        <img className="bg" src={BASE_URL + '/img/profile/bg.png'} alt="背景图" />
        <div className="info">
          <div className="myIcon">
            <img src={userInfo.avatar || DEFAULT_AVATAR} alt="icon" />
          </div>
          <div className="user">
            <div className='name'>{userInfo.nickname || '游客'}</div>
            {/* 登陆后展示 */}
            {isLogin ? (
              <>
                <div className="auth">
                  <span onClick={logout}>退出</span>
                </div>
                <div className='edit'>
                  编辑个人资料
                  <span className='arrow'>
                    <i className='iconfont icon-arrow' />
                  </span>
                </div>
              </>
            ) : (
              <div className="edit">
                <Button size="small" onClick={() => nav('/login')}>去登录</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 九宫格菜单 */}
      <Grid columns={3}>
        {menus.map((item) => item.to ? (
          <Grid.Item key={item.id}>
            <Link to={item.to}>
              <div className='menuItem'>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            </Link>
          </Grid.Item>
        ) : (
          <Grid.Item key={item.id}>
            <div className='menuItem'>
              <i className={`iconfont ${item.iconfont}`} />
              <span>{item.name}</span>
            </div>
          </Grid.Item>
        ))}
      </Grid>

      {/* 加入我们 */}
      <div className="ad" onClick={joinUs}>
        <img src={BASE_URL + '/img/profile/join.png'} alt="" />
      </div>
    </div>
  );
};

export default Profile;
