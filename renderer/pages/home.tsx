import React, { Fragment, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { loginSlice } from '../state/zustand'

const HomePage: React.FC = () => {

  const router = useRouter()
  const { logined, setLogined } = loginSlice()

  useEffect(() => {
    console.log(logined)
    !logined ? router.push('/login'): {}
  },[logined])

  return (
    <Fragment>
      Welcome   
    </Fragment>
  )
}

export default HomePage
