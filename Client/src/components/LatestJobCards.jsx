import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({ job }) {

  const navigate = useNavigate();


    return (
      <div onClick={() => navigate(`/description/${job._id}`)} className='p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] bg-[#110e26]/50 backdrop-blur-xl border border-white/5 cursor-pointer hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgb(106,56,194,0.2)] hover:-translate-y-1 transition-all duration-400 group'>
        <div>
          <h1 className='font-bold text-xl text-white'>{job?.company?.companyName}</h1>
          <p className='text-sm text-slate-400 font-medium'>India</p>
        </div>
        <div className='my-4'>
          <h1 className='font-bold text-2xl text-slate-200 leading-tight group-hover:text-purple-400 transition-colors'>{job?.title}</h1>
          <p className='text-sm text-slate-400 line-clamp-2 mt-1 leading-relaxed'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-5 flex-wrap'>
          <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
            {job?.position} Positions
          </Badge>
          <Badge className="bg-red-500/10 text-[#F83002] hover:bg-red-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
            {job?.jobType}
          </Badge>
          <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 font-semibold px-3 py-1 rounded-full border-none" variant="outline">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
  
    )
}

export default LatestJobCards