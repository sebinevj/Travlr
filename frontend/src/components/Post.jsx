import { IconButton, Button } from '@mui/material';
import { Favorite, ChatBubbleOutline, Add } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../APIClient.js';

function Post(props) {

    const { post, state } = props;

    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [commentUpdated, setCommentUpdated] = useState(false);


    const createComment = () => {
        api.createComment(state.id, post.id, comment).then((insertId) => {
            setCommentUpdated(true)
            setComment("");
        })
    }

    useEffect(() => {
        console.log("STATE", state);
        if (!state) {
            navigate("/");
        }
        api.getPostComments(post.id).then((commentList) => {
            console.log(commentList)
            setComments(commentList);
        })
    }, [commentUpdated])

    return (
        <div className="max-w-xl mx-auto bg-gray-100 rounded-xl shadow-xl overflow-hidden md:max-w-2xl m-4">
            <div className="p-8">
                <div className="flex items-center mb-4">
                    <div className="text-sm">
                        <p className="text-gray-900 font-semibold">{state.username}</p>
                    </div>
                </div>
                <p className="mt-2 text-gray-500">{post.description}</p>
                <div className="mt-4 rounded-lg overflow-hidden">
                    <img
                        src={`/postPictures/${post.id}.jpg`}
                        alt="Post content"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-4">
                        <IconButton className="flex items-center bg-white text-gray-500 focus:outline-none hover:text-blue-500" onClick={() => setCommentsOpen((open) => !open)}>
                            <ChatBubbleOutline className={`h-5 w-5 mr-1 `} />
                            <span className="text-sm">{comments.length}</span>
                        </IconButton>
                        <button className="flex items-center bg-gray-100 text-gray-500 focus:outline-none" onClick={() => setIsLiked((liked) => !liked)}>
                            <Favorite className={`h-5 w-5 mr-1" ${isLiked ? ' text-red-500 fill-current' : ''} `} />
                        </button>
                    </div>
                </div>
                {commentsOpen && <div className="flex flex-col">
                    {comments.map((comment) => {
                        return (
                            <div className="p-3">
                                <span className="font-bold">{`${comment.username}    `}</span>
                                {comment.description}
                            </div>
                        )
                    })}
                    <div className="flex items-center">
                        <label htmlFor="comment" className="block text-sm font-medium text-black">
                            Comment:
                        </label>
                        <div className="px-2 w-full">
                            <input
                                id="comment"
                                name="comment"
                                type="text"
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                        <IconButton className="flex items-center bg-white text-gray-500 focus:outline-none hover:text-blue-500" onClick={createComment}>
                            <Add className={`h-5 w-5`} />
                        </IconButton>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Post;
