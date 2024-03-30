import React, { useRef,ReactNode, useEffect } from "react";
import './index.less'

const Sticky: React.FC<{
    height: number //children元素的高度
    children: ReactNode
}>  = ({height, children}) => {
  const placeholder = useRef<HTMLDivElement | null>(null)
  const content = useRef<HTMLDivElement | null>(null)

  
  const handleScroll = () => {
      const {top} = placeholder.current!.getBoundingClientRect()
      //判断元素有没有滚动到顶部
      if(top <= 0) {
        //如果有则将元素固定到顶部
        content.current!.classList.add("fixed")
        placeholder.current!.style.top = `${height}px`
      }else {
        //取消吸顶
        content.current!.classList.remove("fixed")
        placeholder.current!.style.top = "0px"

      }
  }

  useEffect(() => {
      window.addEventListener("scroll",handleScroll)

      return () => {
        window.removeEventListener("scroll",handleScroll)
      }
  })

  return (
    <div>
      <div ref={placeholder}></div>
      <div ref={content}>{children}</div>
    </div>
  );
};

export default Sticky ;
