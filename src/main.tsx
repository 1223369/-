import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AliveScope } from 'react-activation'
import App from './App'
import store from '@/store'
// 导入字体图标库
import './assets/fonts/iconfont.css'
import './index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<div style={{ paddingTop: '100px', textAlign: 'center' }}>loading...</div>}>
                <AliveScope>
                    <App />
                </AliveScope>
            </Suspense>
        </BrowserRouter>
    </Provider>

)
