import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Redirect: React.FC<{
    to: string  
    state?: any
}> = ({to, state}) => {
    const nav = useNavigate()
    useEffect(() => {
        nav(to, {state})
    })
    return null
}

export default Redirect
