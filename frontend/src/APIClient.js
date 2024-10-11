import HTTPClient from "./HTTPClient.js";

const createUser = (email, username) => {
  const data = {
    email: email,
    username: username, 
  }
  return HTTPClient.post(`http://localhost:3000/api/users`, data);
};

const getUserByEmail = (email) => {
    return HTTPClient.get(`http://localhost:3000/api/users/email/${email}`);
  };

const getUserById = (id) => {
  return HTTPClient.get(`http://localhost:3000/api/users/id/${id}`);
};

const getRegions= () => {
    return HTTPClient.get(`http://localhost:3000/api/regions`);
};

// const getFollowedRegions = (id) => {
//   return HTTPClient.get(`http://localhost:3000/api/follows`);
// }

const getRegionPosts = (id) => {
  return HTTPClient.get(`http://localhost:3000/api/regions/${id}/posts`);
}

const getPostComments = (id) => {
  return HTTPClient.get(`http://localhost:3001/api/posts/${id}/comments`);
}

const createComment = (user_id, post_id, description) => {
  const data = {
    user_id: user_id,
    post_id: post_id, 
    description: description
  }
  return HTTPClient.post(`http://localhost:3001/api/comments`, data);
}

const createPost = (user_id, region_id, description) => {
  const data = {
    user_id: user_id,
    region_id: region_id, 
    description: description
  }
  return HTTPClient.post(`http://localhost:3001/api/posts`, data);
}


export default {
  createUser,
  getUserByEmail,
  getUserById,
  getRegions,
  getRegionPosts,
  getPostComments,
  createComment,
  createPost
};