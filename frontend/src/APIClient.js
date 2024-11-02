import HTTPClient from "./HTTPClient.js";

const createUser = (email, username, password) => {
  const data = {
    email: email,
    username: username, 
    password, password
  }
  return HTTPClient.post(`/api/auth/users`, data);
};

const getUserByEmail = (email) => {
    return HTTPClient.get(`api/auth/users/email/${email}`);
  };

const getUserById = (id) => {
  return HTTPClient.get(`api/auth/users/id/${id}`);
};

const login = (email, password) => {
  const data = {
    email: email,
    password, password
  }
  return HTTPClient.post(`/api/auth/users/login`, data);
}

const getCurrentUser = () => {
  return HTTPClient.get(`/api/auth/users/current`);
};


const getRegions= () => {
    return HTTPClient.get(`/api/auth/regions`);
};

// const getFollowedRegions = (id) => {
//   return HTTPClient.get(`/api/auth/follows/${id}`);
// }

const getRegionPosts = (id) => {
  return HTTPClient.get(`/api/auth/regions/${id}/posts`);
}

const getPostComments = (id) => {
  return HTTPClient.get(`/api/content/posts/${id}/comments`);
}

const createComment = (user_id, post_id, description) => {
  const data = {
    user_id: user_id,
    post_id: post_id, 
    description: description
  }
  return HTTPClient.post(`/api/content/comments`, data);
}

const createPost = (user_id, region_id, description) => {
  const data = {
    user_id: user_id,
    region_id: region_id, 
    description: description
  }
  return HTTPClient.post(`/api/content/posts`, data);
}
 
const getPostById = (post_id) => {
  return HTTPClient.get(`/api/content/posts/${post_id}`);
}


export default {
  createUser,
  getUserByEmail,
  getUserById,
  getCurrentUser, 
  login,
  getRegions,
  getRegionPosts,
  getPostComments,
  createComment,
  createPost,
  getPostById
};