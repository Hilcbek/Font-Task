import React, { useState } from 'react'
import {BsFillPatchCheckFill} from 'react-icons/bs'
import {MdEdit} from 'react-icons/md'
import {MdDelete} from 'react-icons/md'
import {Link, useNavigate} from 'react-router-dom'
import { AxiosRequest } from '../utils/utils'
import Alert from '@mui/material/Alert';
export const TaskManager = ({task}) => {
  let navigate = useNavigate()
  let [res,setRes] = useState('')
  let DeleteTask = async () => {
      let res = await AxiosRequest.delete(`/${task._id}`)
      setRes(res.data)
      Setter()
  }
  let Setter = () => {
    setTimeout(() => {
      setRes('')
      navigate(0)
    },3000)
  }
  return (
    <ul className='flex items-start justify-start flex-col w-full my-1'>
        <li className='flex p-4 shadow-2xl shadow-zinc-400 bg-white rounded-sm my-1  items-center justify-between w-full'>
           <div className='flex items-start justify-start shadow-lg shadow-zinc-200 w-10/12 p-1 rounded-sm'>
               <div className='xs:w-1/12 flex items-center justify-center'><BsFillPatchCheckFill className='text-green-800 w-full h-full' /></div>
                <p className={`${task.completed ? 'break-words line-through font-light' : 'line-none'} w-11/12 font-bold ml-2 xs:text-sm sm:text-lg font-Quicksand`}>{task.name}</p>
           </div>
            <ul className='flex ml-3 shadow-lg shadow-zinc-300 items-center justify-center p-1 rounded-md xs:w-3/12 lg:w-2/12'>
                <Link to={`/edit/${task._id}`} className='p-1 rounded-md hover:bg-black/10 cursor-pointer border-solid border-[1px] hover:border-green-800 group'><MdEdit className='group-hover:text-green-800' /></Link>
                <li onClick={DeleteTask} className='p-1 ml-2 rounded-md hover:bg-black/10 cursor-pointer border-solid border-[1px] hover:border-red-800 group'><MdDelete className='group-hover:text-red-800' /></li>
            </ul>
        </li>
        {res && <Alert severity="warning" className='absolute xs:text-xs md:text-sm top-10 xs:w-9/12 md:w-3/12 xs:left-14 md:right-10 text-center flex items-center justify-center'>{res}</Alert>}
    </ul>
  )
}
