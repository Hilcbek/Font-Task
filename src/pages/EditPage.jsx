import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { AxiosRequest } from '../utils/utils'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { Alert } from '@mui/material'
export const EditPage = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000");
  let [edit,setEdit] = useState('')
  let [res,setRes] = useState('')
  let [checked,setChecked] = useState(false)
  let location = useLocation().pathname.split('/')[2]
  let navigate = useNavigate();
    useEffect(() => {
      let allTask = async () => {
        setLoading(true)
        let res = await AxiosRequest.get(`/${location}`)
        res.data && setLoading(false)
        setEdit(res.data)
        setChecked(res.data.completed)
      }
      allTask()
    },[location])
  let EditTask = async () => {
      let res = await AxiosRequest.put(`/${location}`,{
        name : edit.name,
        completed : checked
      })
      setRes(res.data)
      Setter()
  }
    let Setter = () => {
    setTimeout(() => {
      setRes('')
      navigate('/')
    },2000)
  }
  return (
    <div className='w-full font-Quicksand flex items-center justify-center flex-col'>
        <div className='shadow-2xl flex items-center justify-center flex-col bg-white xs:mt-[10%] xl:mt-[5%] xs:w-11/12 md:w-4/12 p-3 rounded-md shadow-white'>
            {loading ? <ScaleLoader color={color} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader" /> : (<><h1 className='text-3xl font-Roboto text-center underline mb-5'>Edit Task</h1>
            <h1 className='font-bold text-xl w-11/12'>Task ID: <span className='ml-5 text-sm'>{location}</span></h1>
            <input value={edit.name} onChange={(e) => setEdit(e.target.value)} type="text" placeholder='e.g. wash dishes' className='my-3 rounded-md p-2 w-11/12 border-solid border-green-800 border-[1px] bg-black/10 outline-none mr-3' />
            <div className='flex items-center justify-start w-11/12'>
              <label htmlFor='check' className='cursor-pointer font-bold text-xl'>Completed: </label>
              <input checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} type="checkbox" name="" className='ml-2 cursor-pointer' id="check" />
            </div></>) }
            <button disabled={loading} onClick={EditTask} className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} bg-blue-800 hover:bg-blue-700 text-sm p-2 rounded-md text-white w-11/12 mx-auto  block my-5`}>Edit</button>
        </div>
        <Link to={'/'} className='mt-10 bg-black text-white rounded-md cursor-pointer p-2 xs:w-9/12 lg:w-1/12 text-center font-bold'>Back To Tasks</Link>
        {res && <Alert severity="success" className='absolute xs:text-xs md:text-sm top-10 xs:w-9/12 md:w-3/12 xs:left-10 md:right-10 text-center flex items-center justify-center'>{res}</Alert>}
    </div>
  )
}
