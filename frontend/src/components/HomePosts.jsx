import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">

      {/* Left (Image) */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + post.photo} alt="" className="h-full w-full object-cover rounded-lg" />
      </div>

      {/* Right (Post Content) */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl hover:text-blue-600 transition-colors duration-200 ease-in-out cursor-pointer">
          {post.title}
        </h1>
        
        {/* Author and Date */}
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p className="text-gray-700">@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-lg text-gray-600">
          {post.desc.slice(0, 200) + ' ... '}
          <span className="text-blue-500 cursor-pointer hover:underline">Read more</span>
        </p>
      </div>
    </div>
  );
}

export default HomePosts;
