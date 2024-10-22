import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        
        {/* Your Posts Section */}
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-2xl font-bold mb-4">Your posts</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>

        {/* Profile Update Section */}
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-6 items-start bg-gray-50 p-6 rounded-md shadow-md w-full md:ml-12"> {/* Increased margin */}
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 transition duration-300 text-gray-700"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 transition duration-300 text-gray-700"
              placeholder="Your email"
              type="email"
            />

            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-red-600 px-5 py-3 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>

            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
