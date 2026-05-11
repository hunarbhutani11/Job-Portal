import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

// location
// salary
// job types

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bengluru", "Mumbai", "Hyderabad", "Ranchi", "Patna"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning"]
    },
    {
        filterType: "Salary",
        array: ["6-10 LPA", "10-40 LPA", "40-100 LPA" ,"100+"]
    }
]


const FilterCard = () => {
    useGetAllJobs()

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }


    useEffect(() => {
        // console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='w-full bg-[#110e26]/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.2)]'>
            <h1 className='font-extrabold text-xl text-white tracking-tight'>Filter Jobs</h1>
            <hr className='mt-4 mb-6 border-white/10' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="flex flex-col gap-6">
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg text-slate-200 mb-3'>{data.filterType}</h1>
                            <div className="flex flex-col gap-3">
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index - idx}`
                                    return (
                                        <div className='flex items-center space-x-3' key={idx}>
                                            <RadioGroupItem value={item} id={itemId} className="text-purple-500 border-white/20" />
                                            <Label className="text-slate-400 font-medium text-base hover:text-purple-400 cursor-pointer transition-colors" htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )

                                })
                            }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>



        </div>
    )
}

export default FilterCard
