/* eslint-disable react/prop-types */
import { IF } from '../url'

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full flex mt-8 space-x-6 p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Left - Image */}
      <div className="w-[35%] h-[200px] flex justify-center items-center rounded-lg overflow-hidden">
        <img
          src={IF + p.photo}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Right - Post Content */}
      <div className="flex flex-col w-[65%] space-y-3">
        <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
          {p.title}
        </h1>
        
        {/* Update Section */}
        <div className="flex items-center justify-between text-sm font-medium p-2 border border-gray-300 rounded-md bg-gray-50">
          <p className="font-semibold text-gray-600">@{p.username}</p>
          <div className="flex space-x-4 text-gray-500">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {p.desc.slice(0, 200)}{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">...Read more</span>
        </p>
      </div>
    </div>
  )
}

export default ProfilePosts
