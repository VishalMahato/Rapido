import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (

    <>
    <div className=" w-[375px] h-[667px] flex bg-cover bg-[position:40%_center] bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex-col justify-between w-full ">
        <img className='cover w-20 my-4 mx-4 ' src="https://imgs.search.brave.com/exYdUgItfG2uOaesGrC7YcSDcWafZAAWXEQW6Q9SzLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA5/L1JhcGlkby1Mb2dv/LTUwMHgyODEucG5n" alt="" />
        <div className='bg-white'>
        <h2 className='text-3xl font-bold px-4 py-3  '>Get Started with Rapido</h2>
        <Link to="/login" className='inline-block text-center bg-slate-950  capitalize  w-[calc(100%-2rem)] mx-3 mb-8 mt-1 py-2 text-2xl text-white rounded  '>continue</Link>
        </div>
    </div>
    </>
  )
}

export default Home