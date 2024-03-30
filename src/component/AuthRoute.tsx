import { isAuth } from '@/utils/auth';
import React,{ ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AuthRoute: React.FC<{
    children: ReactNode
}>  = ({children}) => {
  const isLogin = isAuth();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isLogin) {
      nav('/login', {state: {from: location}});
    }
  },[])

  return <>{isLogin ? children : null}</>
};

export default AuthRoute
