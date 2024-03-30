import { reqGetInfo } from "@/api";
import { City } from "@/types";
const TOKEN_NAME = 'hkzf_city';


// 获取当前定位城市
export const getCurrentCity = () => {
    //判断当前localStorage中是否有定位城市
    const localCity = getCity()
    
    if (!localCity) {
        // 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
        return new Promise((resolve, reject) => {
            try {
              const curCity = new BMapGL.LocalCity();
              curCity.get(async (res:any) => {
                  const res2 = await reqGetInfo(res.name)
                  if(res2.status === 200) {
                      setCity(res2.body)
                      resolve(res2.body)
                  }
              })
            } catch (error) {
              //获取定位城市失败
                reject(error)
            }
        })
    }

    // 如果有，直接返回本地存储中的城市数据
    // 注意：因为上面为了处理异步操作，使用了Promise，因此，为了该函数返回值的统一，此处，也应该使用Promise
    // 因为此处的 Promise 不会失败，所以，此处，只要返回一个成功的Promise即可
    return Promise.resolve(localCity)
}

// 城市数据格式化的方法
export const formatCityData = (list: City[]) => {
  const cityList: {[key: string]: City[]} = {}
  let first: string

  // 遍历list数组
  list.forEach((item) => {
      // 获取每一个城市的首字母
      first = item.short!.charAt(0)
      // 判断 cityList 中是否有该分类
      if (cityList[first]) {
          // 如果有，直接往该分类中push数据
          cityList[first].push(item)
      } else {
          // 如果没有，就先创建一个数组，然后，把当前城市信息添加到数组中
          cityList[first] = [item]
      }
  })

  // 获取索引数据并排序
  const cityIndex: string[] = Object.keys(cityList).sort()

  return {
      cityList,
      cityIndex
  }
}

// 获取当前定位城市
export const getCity = () =>
    (JSON.parse(localStorage.getItem(TOKEN_NAME) as string) as City) || {label: '', value: ''}


// 设置当前定位城市
export const setCity = (value: City) => 
    localStorage.setItem(TOKEN_NAME, JSON.stringify(value))
    
// 封装处理字母索引的方法
export const formatCityIndex = (letter: string) => {
  switch (letter) {
      case '#':
          return '当前定位'
      case 'hot':
          return '热门城市'
      default:
          return letter.toUpperCase()
  }
}