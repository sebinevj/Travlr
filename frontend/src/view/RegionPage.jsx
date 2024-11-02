
import { useState, useEffect } from 'react';
import { IconButton, Button, Input, TextField } from '@mui/material';
import api from '../APIClient.js';
import { useNavigate, useLocation } from "react-router-dom";
import { Add, Home } from '@mui/icons-material';
import Post from '../components/Post.jsx';


function RegionPage() {

    const { state } = useLocation();
    console.log("RegionPageState", state);

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [postUpdated, setPostsUpdated] = useState(false);
    const [addPostOpen, setAddPostOpen] = useState(false);
    const [comment, setComment] = useState("")
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api.getCurrentUser().then((user) => {
            console.log(user);
            setCurrentUser(user)
        }).catch(err => {
            console.log(err);
            navigate("/");
        })
        api.getRegionPosts(state.regionId).then((postList) => {
            console.log(postList)
            setPosts(postList);
        })
    }, [postUpdated])

    const createPost = () => {
        api.createPost(currentUser.id, state.regionId, comment).then((insertId) => {
            setPostsUpdated(true);
            setComment("");
        })
    }

    return (
        <div>
            <IconButton className=" flex items-center bg-white text-gray-500 focus:outline-none hover:text-blue-500" onClick={() => navigate("/home")}>
                <Home fontSize="large" />
            </IconButton>
            <div className="flex flex-col justify-center items-center">
                <div className="flex ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">{state.regionName}</h2>
                </div>
                <div className="flex flex-col">
                    {posts.map((post) => {
                        return (
                            <Post post={post} state={state} />
                        )
                    })}
                </div>
                <button className="text-black focus:outline-none w-full max-w-xl mt-10 mb-3" onClick={() => setAddPostOpen((open) => !open)}>
                    <Add className="h-5 w-5" />
                    <span>Add Post</span>
                </button>
                {addPostOpen &&
                    <div className="max-w-xl w-full bg-gray-100 rounded-xl shadow-xl overflow-hidden md:max-w-2xl m-4 p-5">
                        <label htmlFor="comment" className="block text-sm font-medium text-black">
                            Post Comment:
                        </label>
                        <div className="flex my-1">
                            <TextField
                                id="comment"
                                name="comment"
                                multiline
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                        <IconButton className="flex items-center bg-white text-gray-500 focus:outline-none hover:text-blue-500" onClick={createPost}>
                            <Add className={`h-5 w-5`} />
                        </IconButton>
                    </div>
                }
            </div>
        </div>

    )

}

export default RegionPage;