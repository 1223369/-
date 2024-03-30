import NavHeader from "@/component/NavHeader";
import { floorData, orientedData, roomTypeData } from "@/constant";
import { ImageUploader, ImageUploadItem, Input, List, Modal, Picker, TextArea, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './index.less';
import HousePackage from "@/component/HousePackage";
import { reqAddRentHouse, uploadHouseImage } from "@/api";

interface HouseInfo {
  tempSlides: File[]
  community: { id: string; name: string }
  price: string
  size: string
  roomType: string
  floor: string
  oriented: string
  title: string
  houseImg: string
  supporting: string
  description: string
}


const RentAdd = () => {

  const localtion = useLocation();

  const [houseInfo, setHouseInfo] = useState<HouseInfo>({
    // 临时图片地址
    tempSlides: [],
    // 小区的名称和id
    community: { name: '', id: '' },
    // 价格
    price: '',
    // 面积
    size: '',
    // 房屋类型
    roomType: '',
    // 楼层
    floor: '',
    // 朝向：
    oriented: '',
    // 房屋标题
    title: '',
    // 房屋图片
    houseImg: '',
    // 房屋配套：
    supporting: '',
    // 房屋描述
    description: ''
  })
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  const [fileList, setFileList] = useState<ImageUploadItem[]>([])


  const nav = useNavigate();

  useEffect(() => {
    // 有小区信息数据，存储到状态中
    if (localtion.state) {
      setHouseInfo({
        ...houseInfo,
        community: {
          name: localtion.state.name,
          id: localtion.state.id
        }
      })
    }
  }, []) 

  //取消编辑
  const onCancel = () => {
    Modal.confirm({
      title: '提示',
      content: '放弃发布房源?',
      cancelText: '继续编辑',
      confirmText: '放弃',
      onConfirm: () => nav('-1')
    })
  }

  //发布房源
  const addHouse = async () => {
    //上传房屋图片
    if (houseInfo.houseImg.length > 0) {
      const form = new FormData()
      houseInfo.tempSlides.forEach((item) => form.append('file', item))
      const res = await uploadHouseImage(form)

      if (res.status === 200) {
        setHouseInfo({ ...houseInfo, houseImg: res.body.join('|') })
      }
    }

    //解构
    const { price, size, roomType, floor, oriented, title, houseImg, supporting, description } = houseInfo
    const newHouseInfo = {
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      houseImg,
      community: houseInfo.community.id
    }
    //发布房源
    const res = await reqAddRentHouse(newHouseInfo)
    if (res.status === 200) {
      Toast.show({content: '发布成功', duration: 1000})
      nav('-1')
    } else {
      Toast.show({content: '服务器偷懒了，请稍后再试~', duration: 1000})
    }
  }

  //文件上传
  const handleUpload = async (file: File) => {
    const newTempSlides = [...houseInfo.tempSlides]
    newTempSlides.push(file)
    setHouseInfo({ ...houseInfo, tempSlides: newTempSlides })
    return { url: URL.createObjectURL(file) }
  }

  //删除上传文件
  const handleDelete = (item: ImageUploadItem) => {
    const index = fileList.indexOf(item)
    const newFileList = [...fileList]
    newFileList.splice(index, 1)
    setFileList(newFileList)

  }

  // 获取房屋配套数据
  const handleSupporting = (val: string[]) => {
    setHouseInfo({ ...houseInfo, supporting: val.join('|') })
  }
  return (
    <div className='rentAdd'>
      <NavHeader onLeftClick={onCancel}>发布房源</NavHeader>

      {/* 房源信息 */}
      <List className='header' header='房源信息'>
        <List.Item extra={houseInfo.community.name || '请输入小区名称'} onClick={() => nav('/search')}>
          小区名称
        </List.Item>
        <List.Item extra='￥/月'>
          <span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
          <Input
            type="number"
            placeholder='请输入租金'
            value={houseInfo.price}
            onChange={(val) => setHouseInfo({ ...houseInfo, price: val })} />
        </List.Item>
        <List.Item extra='㎡'>
          <span>建筑面积</span>
          <Input
            type="number"
            placeholder='请输入建筑面积'
            value={houseInfo.size}
            onChange={(val) => setHouseInfo({ ...houseInfo, size: val })} />
        </List.Item>
        <List.Item extra={roomTypeData[0].find((item) => item.value === houseInfo.roomType)?.label || '请选择房屋类型'}
          onClick={() => setVisible1(true)}
          arrow>
          <span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
          <Picker
            columns={roomTypeData}
            visible={visible1}
            onClose={() => setVisible1(false)}
            onConfirm={(val) => setHouseInfo({ ...houseInfo, roomType: val[0] as string })} />

        </List.Item>
        <List.Item extra={floorData[0].find((item) => item.value === houseInfo.floor)?.label || '请选择楼层'}
          onClick={() => setVisible2(true)}
          arrow>
          <span>所在楼层</span>
          <Picker
            columns={floorData}
            visible={visible2}
            onClose={() => setVisible2(false)}
            onConfirm={(val) => setHouseInfo({ ...houseInfo, floor: val[0] as string })} />
        </List.Item>
        <List.Item extra={orientedData[0].find((item) => item.value === houseInfo.oriented)?.label || '请选择朝向'}
          onClick={() => setVisible3(true)}
          arrow>
          <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
          <Picker
            columns={orientedData}
            visible={visible3}
            onClose={() => setVisible3(false)}
            onConfirm={(val) => setHouseInfo({ ...houseInfo, oriented: val[0] as string })} />
        </List.Item>
      </List>

      {/* 房屋标题 */}
      <List header='房屋标题'>
        <List.Item>
          <Input
            placeholder='请输入房屋标题'
            value={houseInfo.title}
            onChange={(val) => setHouseInfo({ ...houseInfo, title: val })} />
        </List.Item>
      </List>

      {/* 房屋图片 */}
      <List header='房屋图片'>
        <List.Item>
          <ImageUploader
            value={fileList}
            onChange={(item: ImageUploadItem[]) => setFileList(item)}
            upload={handleUpload}
            onDelete={handleDelete} />
        </List.Item>
      </List>

      {/* 房屋配置 */}
      <List header='房屋配置'>
        <List.Item>
          <HousePackage select onSelect={handleSupporting} />
        </List.Item>
      </List>

      {/* 房屋描述 */}
      <List header='房屋描述'>
        <List.Item>
          <TextArea
            placeholder='请输入房屋描述信息'
            value={houseInfo.description}
            onChange={(val) => setHouseInfo({ ...houseInfo, description: val })}
          />
        </List.Item>
      </List>

      <div className="bottom">
        <div className="cancel" onClick={onCancel}>
          取消
        </div>
        <div className="confirm" onClick={addHouse}>
          提交
        </div>
      </div>
    </div>
  );
};

export default RentAdd;
