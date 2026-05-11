import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {

    const navigate = useNavigate();
    // const jobId = "e8ut7yt845y95y56";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - createdAt.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return Math.floor(differenceInDays);
    }


    return (
        <div className='p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] bg-[#110e26]/50 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgb(106,56,194,0.2)] hover:-translate-y-1 transition-all duration-400 h-full flex flex-col group'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-slate-400 font-medium tracking-wide'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
                </p>
                <Button variant="ghost" className="rounded-full text-slate-400 hover:text-[#F83002] hover:bg-[#F83002]/10 transition-colors" size="icon"><Bookmark className="w-4 h-4" /></Button>
            </div>

            <div className='flex gap-4 items-center my-4'>
                <div className="p-3 bg-white/5 shadow-sm border border-white/10 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <Avatar className="w-12 h-12">
                        <AvatarImage
                            src={job?.company?.logo || "https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain"}
                        />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-bold text-xl text-white'>{job?.company?.companyName}</h1>
                    <p className='text-sm text-slate-400 font-medium'>India</p>
                </div>
            </div>

            <div className='flex-1'>
                <h1 className='font-bold text-2xl my-2 text-slate-200 leading-tight group-hover:text-purple-400 transition-colors'>{job?.title}</h1>
                <p className='text-sm text-slate-400 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-5 flex-wrap'>
                <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
                    {job?.position} positions
                </Badge>
                <Badge className="bg-red-500/10 text-[#F83002] hover:bg-red-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className='flex items-center gap-3 mt-6'>
                <Button className="flex-1 cursor-pointer rounded-xl font-semibold border-white/10 text-slate-300 hover:bg-white/10" onClick={() => navigate(`/description/${job._id}`)} variant="outline">Details</Button>
                <Button className="flex-1 bg-gradient-to-r from-[#6A38C2] to-[#8b5cf6] hover:from-[#5b30a6] hover:to-[#7c3aed] text-white rounded-xl shadow-md font-semibold cursor-pointer transition-all border-none">Save For Later</Button>
            </div>

        </div>
    )
}

export default Job
