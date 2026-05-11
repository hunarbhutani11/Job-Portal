import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function HeroSection() {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 30 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center py-20 px-4'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
                className='flex flex-col gap-6 max-w-4xl mx-auto'>
                <span className='mx-auto px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-[#F83002]/20 text-[#F83002] font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(248,48,2,0.1)]'>
                    🚀 No. 1 Platform to shape your career
                </span>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className='text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]'>
                    Search, Apply & <br /> Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#F83002]'>Dream Jobs</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='px-3 text-lg text-slate-400 font-medium max-w-2xl mx-auto'>
                    Discover thousands of job opportunities with all the information you need to make an informed decision alongside your future.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='mt-6 flex w-full sm:w-[60%] bg-[#0f0a29]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] pl-5 py-2 pr-2 rounded-full items-center gap-4 mx-auto transition-all duration-300 hover:bg-[#150e3a]/60 hover:shadow-[0_8px_40px_rgb(106,56,194,0.3)] hover:border-white/20'
                >
                    <Search className='h-6 w-6 text-slate-400' />
                    <input type="text"
                        placeholder='Find your dream jobs...'
                        className='outline-none border-none w-full bg-transparent text-white placeholder-slate-500 font-medium text-lg'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className='rounded-full h-12 px-8 text-md font-semibold bg-gradient-to-r from-[#6A38C2] to-[#8b5cf6] hover:from-[#5b30a6] hover:to-[#7c3aed] text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                        Search
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default HeroSection