import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security ",
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }


    return (
        <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        >
            <div className="flex flex-wrap justify-center gap-4 my-10 max-w-5xl mx-auto px-4">
                {
                    category.map((cat, index) => (
                        <Button key={index} onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full cursor-pointer hover:scale-105 duration-300 transition-all bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white px-6 py-2">
                            {cat}
                        </Button>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default CategoryCarousel