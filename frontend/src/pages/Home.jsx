// src/pages/Home.jsx
import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";
// import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false); // Set to false on error as well
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      {/* <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 rounded bg-gray-300">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button> */}

      {/* Hero Section */}
      <div className="hero-section bg-gray-800 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg md:text-xl mb-8">Discover the latest posts, curated stories, and trending topics from around the world.</p>
        <Link to={user ? "/posts/new" : "/login"}>
          {/* Add button or link for creating new posts */}
        </Link>
      </div>

      {/* Posts Section */}
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-12">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link to={user ? `/posts/post/${post._id}` : "/login"} key={post._id}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
