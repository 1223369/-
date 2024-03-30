import NavHeader from "@/component/NavHeader";
import { Form, Button,Input,Toast} from "antd-mobile";
import { useState } from "react";
import {EyeInvisibleOutline,EyeOutline} from 'antd-mobile-icons'
import { reqRegister } from "@/api";
import { setToken } from "@/utils/auth";
import './index.less'
import { Link } from "react-router-dom";

const Register = () => {

    const [visible,setVisible] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');

    // 检查两次密码有无一致
    const checkPwd = (_: any, value: any) => {
        if(value === pwd) {
            return Promise.resolve()
        }
        return Promise.reject(new Error('两次输入的密码不一致'))
    }

    const onFinish = async (values: {username: string; password: string; password2: string}) => {
        const res = await reqRegister(values.username, values.password)
        if(res.status === 200) {
           //登陆成功
          setToken(res.body.token)

          Toast.show({content: res.description})
        }else {
          Toast.show({content: res.description})
        }
    }

  return (
    <div className="register">
      <NavHeader className='navHeader'>注册</NavHeader>
      <Form
        onFinish={onFinish}
        footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }
      >
          <Form.Item
                    name='username'
                    label='用户名'
                    rules={[
                        {required: true},
                        {
                            type: 'string',
                            min: 5,
                            max: 12,
                            pattern: /^[a-zA-Z\d]{5,12}$/,
                            message: '长度为5到12位，只能出现数字、字母'
                        }
                    ]}
                >
                    <Input placeholder='请输入账号' clearable />
            </Form.Item>
            <Form.Item
                    name='password'
                    label='密码'
                    rules={[
                        {required: true},
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
                            clearable
                            value={pwd}
                            onChange={(val) => setPwd(val)}
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
            <Form.Item name='password2' label='重复密码' rules={[{required: true}, {validator: checkPwd}]}>
                    <div className='password'>
                        <Input
                            placeholder='请重新输入密码'
                            type={visible2 ? 'text' : 'password'}
                            clearable
                            value={pwd2}
                            onChange={(val) => setPwd2(val)}
                        />
                        <div className='eye'>
                            {!visible2 ? (
                                <EyeInvisibleOutline onClick={() => setVisible2(true)} />
                            ) : (
                                <EyeOutline onClick={() => setVisible2(false)} />
                            )}
                        </div>
                    </div>
            </Form.Item>
      </Form>
      <div className='backHome'>
          <Link to='/home'>点我,回首页</Link>
          <Link to='/login'>点我，去登录</Link>
      </div>
    </div>
  );
};

export default Register;
