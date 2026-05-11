import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])




  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-sm:mx-5 mx-auto' >
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 border border-white/10 bg-[#110e26]/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-3xl p-8 my-10'>
          <h1 className='font-extrabold text-3xl mb-6 text-white'>Login</h1>

          <div className='my-2'>
            <Label className="text-slate-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="john.doe@gmail.com"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500 rounded-xl mt-1 placeholder-slate-500"
            />
          </div>

          <div className='my-2'>
            <Label className="text-slate-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="12345678"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500 rounded-xl mt-1 placeholder-slate-500"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  id="r1"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-5 h-5 accent-purple-500"
                />
                <Label htmlFor="r1" className="text-lg font-bold cursor-pointer text-slate-200">Student</Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  id="r2"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-5 h-5 accent-purple-500"
                />
                <Label htmlFor="r2" className="text-lg font-bold cursor-pointer text-slate-200">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>
          {
            loading ? <Button className="my-4 w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button>
              :
              <Button type="submit" className="w-full my-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20 py-6 text-lg font-bold transition-all">Login</Button>
          }

          <span className='text-sm text-slate-400'>Don't have an account? <Link to="/signup" className='text-purple-400 hover:text-purple-300 font-semibold ml-1'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
