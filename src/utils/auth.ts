const TOKEN_NAME = 'hkfang_token'

//获取Token
// export const getToken = () => {
//   return localStorage.getItem(TOKEN_NAME)
// }

export const getToken = () => localStorage.getItem(TOKEN_NAME)

// 设置 token
export const setToken = (value: string) => localStorage.setItem(TOKEN_NAME, value)

// 删除 token
export const removeToken = () => localStorage.removeItem(TOKEN_NAME)

// 是否登录（有权限）
export const isAuth = () => !!getToken()
