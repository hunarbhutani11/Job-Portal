import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, BuildingIcon, Home, HomeIcon, LogOut, Menu, MenuIcon, SearchCheck, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const AnimatedLogo = () => (
    <motion.div 
        className="flex items-center gap-3 pr-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <motion.div 
            className="w-10 h-10 rounded-full bg-[#F83002] flex items-center justify-center shadow-lg shadow-[#F83002]/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
        >
            <BriefcaseBusiness className="text-white w-5 h-5" />
        </motion.div>
        <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
        >
            <h1 className='text-3xl font-black tracking-tight text-white'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </motion.div>
    </motion.div>
);

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth);


    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    const resetQuery = () => {
        dispatch(setSearchedQuery(''))
    }


    return (
        <div className='sticky top-0 z-50 bg-[#030014]/60 backdrop-blur-md border-b border-white/10 shadow-sm'>
            <div className='flex items-center justify-between mx-auto h-20 max-sm:px-4 sm:px-[5%] lg:px-[10%]'>
                <div onClick={() => navigate("/")} className='cursor-pointer'>
                    <AnimatedLogo />
                </div>
                <div className='flex items-center gap-12 max-sm:gap-5'>
                    <ul className='flex font-medium items-center gap-5 max-sm:hidden'>
                        {
                            user && user.role === "recruiter"
                                ?
                                <>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/admin/companies">Companies</Link></li>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                                : (
                                    <>
                                        <motion.li className="hover:text-[#6A38C2] transition-colors font-semibold" onClick={resetQuery}><Link to="/">Home</Link></motion.li>
                                        <li className="hover:text-[#6A38C2] transition-colors font-semibold"><Link to="/jobs">Jobs</Link></li>
                                        <li className="hover:text-[#6A38C2] transition-colors font-semibold" onClick={resetQuery}><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                        }
                    </ul>


                    {
                        !user
                            ?
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button className="cursor-pointer rounded-full font-semibold border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-full font-semibold px-6 shadow-md cursor-pointer transition-all border-none">Signup</Button>
                                </Link>
                            </div>
                            :
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            {
                                                user?.profile?.profilePhoto
                                                    ?
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                                    :
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                            }
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div>
                                            <div className='flex gap-4 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    {
                                                        user?.profile?.profilePhoto
                                                            ?
                                                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                                            :
                                                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                                    }
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>
                                                        {user?.profile?.bio}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user?.role === "student" &&
                                                    (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button className="cursor-pointer" variant="link"><Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} className="cursor-pointer" variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div >
                    }

                    <div className='sm:hidden'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    {
                                        <MenuIcon className='mt-1' />
                                    }
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    {
                                        user && user.role === "recruiter"
                                            ?
                                            <div className='flex flex-col gap-3'>
                                                <div onClick={() => navigate("/admin/companies")} className='flex items-center gap-3'>
                                                    <BuildingIcon className='size-5' />
                                                    <p className='text-lg font-medium cursor-pointer'>Companies</p>
                                                </div>

                                                <div onClick={() => navigate("/admin/jobs")} className='flex items-center gap-3 cursor-pointer'>
                                                    <BriefcaseBusiness />
                                                    <p className='text-lg font-medium' to="/admin/jobs">Jobs</p>
                                                </div>
                                            </div>
                                            : (
                                                <>
                                                    <div className='flex flex-col gap-3'>
                                                        <div
                                                            onClick={() => {
                                                                navigate("/")
                                                                dispatch(setSearchedQuery(""))
                                                            }}
                                                            className='flex items-center gap-3 cursor-pointer'>
                                                            <HomeIcon className='size-5' />
                                                            <p className='text-lg font-medium'>Home</p>
                                                        </div>

                                                        <div onClick={() => navigate("/jobs")} className='flex items-center gap-3 cursor-pointer'>
                                                            <BriefcaseBusiness />
                                                            <p className='text-lg font-medium' to="/admin/jobs">Jobs</p>
                                                        </div>

                                                        <div
                                                            onClick={() => {
                                                                navigate("/browse")
                                                                dispatch(setSearchedQuery(""))
                                                            }}
                                                            className='flex items-center gap-3 cursor-pointer'>
                                                            <SearchCheck />
                                                            <p className='text-lg font-medium' to="/admin/jobs">Browse</p>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                    }
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>


                </div >
            </div >
        </div >

    )
}

export default Navbar


