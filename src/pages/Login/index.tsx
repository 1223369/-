import { reqLogin } from '@/api/user'
import { Form, Button, Input, Toast } from 'antd-mobile';
import { useState } from 'react';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import './index.less'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setToken } from '@/utils/auth';

import NavHeader from '@/component/NavHeader';

const Login = () => {

  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const nav = useNavigate()

  const onFinish = async (values: { username: string; password: string }) => {
    console.log("登录请求")
    const res = await reqLogin(values.username, values.password)
    if (res.status === 200) {
      //登陆成功
      setToken(res.body.token)

      /*
        1 登录成功后，判断是否需要跳转到用户想要访问的页面（判断 props.location.state 是否有值）。
        2 如果不需要（没有值），则直接调用 history.go(-1) 返回上一页。
        3 如果需要，就跳转到 from.pathname 指定的页面（推荐使用 replace 方法模式，而不是 push）。
      */
      if (!location.state) {
        // 此时，表示是直接进入到了该页面，直接调用 nav(-1) 即可
        nav(-1)
      } else {
        nav(location.state.pathname, { replace: true })
      }
    }else {
        Toast.show({content: res.description})
    }
  }

  return (
    <div className='login'>
      <NavHeader className='navHeader'>账号登录</NavHeader>
      <Form
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交 
          </Button>
        }>
        <Form.Item
          name='username'
          rules={[
            { required: true },
            {
              type: 'string',
              min: 5,
              max: 12,
              pattern: /^[a-zA-Z\d]{5,12}$/,
              message: '长度为5到12位，只能出现数字、字母'
            }
          ]}
        >
          <Input placeholder='请输入姓名' clearable />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true },
            {
              type: 'string',
              min: 5,
              max: 12,
              pattern: /^[\w.]{5,12}$/,
              message: '长度为5到12位，只能出现数字、字母、下划线、点'
            }
          ]}
        >
          <div className='password'>
            <Input
              placeholder='请输入密码'
              type={visible ? 'text' : 'password'}
            />
            <div className='eye'>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          </div>
        </Form.Item>
      </Form>

      <div className='goRegister'>
        <Link to='/register'>还没有账号，去注册~</Link>
      </div>
    </div>
  );
};

export default Login;
