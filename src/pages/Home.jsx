import React, { useEffect, useState } from 'react'
import { TaskManager } from './TaskManager'
import {ImSad2} from 'react-icons/im'
import { AxiosRequest } from '../utils/utils'
import ScaleLoader from 'react-spinners/ScaleLoader'
export const Home = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000");
  let [error,setError] = useState('')
  let [name,setName] = useState('')
  let [allTasks,setAllTasks] = useState([])
  let allTask = async () => {
      setLoading(true)
      let res = await AxiosRequest.get('/')
      res.data && setLoading(false)
      setAllTasks(res.data)
    }
  useEffect(() => {
    allTask()
  },[])
  let AddTask = async () => {
      try {
        setLoading(true)
        let res = await AxiosRequest.post('/',{name : name});
        setName('')
        res.data && setLoading(false)
        allTask()
      } catch (error) {
        setError(error.response.data)
        error.response.data === 'please fill the fields!' ? Setter(1000) : Setter(3000)
      }
  }
  let Setter = (timer) => {
    setTimeout(() => {
      setError('')
      setLoading(false)
    },timer)
  }
  return (
    <div className='p-4 flex items-center shadow-xl shadow-zinc-400 rounded-md justify-center flex-col xs:w-11/12 md:w-6/12 xl:w-4/12 mt-[5%]'>
        <div className='shadow-2xl w-full bg-white p-3 mb-4 rounded-sm shadow-zinc-300'>
            <h1 className='xs:text-4xl lg:text-5xl text-center mb-7'>Task Manager</h1>
            <div className='flex items-center justify-start'>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='e.g. wash dishes' className='border-solid border-green-700 border-[1px] p-2 w-9/12 bg-black/10 rounded-md outline-none mr-3' />
                <button disabled={loading} onClick={AddTask} className={`${loading ? 'bg-zinc-400' : 'bg-blue-800'} w-3/12 text-center flex items-center justify-center  hover:bg-blue-700 text-sm font-Quicksand p-2 hover:tracking-wider rounded-md text-white`}>{loading  ? 'Adding Task...' : 'Submit'}</button>
            </div>
        </div>
        {
          loading ? (<ScaleLoader color={color} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader" />) : ( allTasks.length > 0 ? allTasks.map((task,idx) => (
              <TaskManager key={idx} task={task} /> 
            )) : <h1 className='bg-black text-white p-1 rounded-md mx-auto w-fit text-2xl font-Quicksand font-bold flex items-center justify-center'>No Task!<ImSad2 className='ml-2 text-[#ffde34]' /></h1>)
        }
        <h1 className='text-center font-Quicksand text-xs p-2 font-bold shadow-white shadow-xl text-red-700 w-8/12 mx-auto rounded-md mt-5'>{error && error}</h1>
        <h1 className='text-xs text-center flex items-center justify-center font-bold font-Quicksand'>All rights are reserved! &copy;2023G.C <span className='text-green-800 drop-shadow-2xl'>@Bekas LTC</span>.</h1>
    </div>
  )
}
