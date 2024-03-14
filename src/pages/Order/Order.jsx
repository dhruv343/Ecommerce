import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'

function Order() {
  const{mode}=useContext(myContext)
  return (
    <Layout>
    <div className='h-[85vh] w-full flex justify-center items-center'><div className='font-bold text-2xl' style={{color: mode === 'dark' ? 'white' : ''}}>{`No Orders Placed Yet :(`}</div></div>
    </Layout>
  )
}

export default Order