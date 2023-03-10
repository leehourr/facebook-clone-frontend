import axios from "axios";
import Cookies from "js-cookie";
import { LoadingStimulate } from "./LoadingStimulate";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  //baseURL: "http://localhost:8000",
});

// const token = Cookies.get("token");

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (userData) => {
  // console.log(process.env.REACT_APP_BACKEND_URL);

  // console.log("in api call", userData);
  const { data } = await api.post(`/login`, userData).catch((e) => {
    errorHandler(e);
  });
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
};

export const getUserData = async () => {
  await LoadingStimulate(1000);
  const { data } = await api.get(`/auth`).catch((e) => {
    errorHandler(e);
  });
  return data;
};

export const findUser = async (email) => {
  const { data } = await api.post(`/findUser`, email);
  return data;
};

export const sendPassResetCode = async (email) => {
  const { data } = await api.post("/sendResetPasswordCode", email);
  return data;
};

export const validatePassResetCode = async (req) => {
  const { data } = await api.post("/validateResetCode", req);
  return data;
};

export const changePassword = async (req) => {
  const { data } = await api.post("/newpassword", req);
  return data;
};

export const createPost = async (req) => {
  const { data } = await api.post("/createPost", req);
  return data;
};

export const uploadImages = async (req, path) => {
  const { data } = await api.post("/uploadImages", req, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const getAllPosts = async () => {
  // await LoadingStimulate(3000);
  const { data } = await api.get(`/getAllPosts`);
  return data;
};

export const getProfileData = async (name) => {
  // await LoadingStimulate(3000);
  const { data } = await api.get(`/${name}`);
  return data;
};
//

export const userProfile = async (param) => {
  const { data } = await api.get(`/${param}`);
  return data;
};

export const updateProfilePic = async (url) => {
  const { data } = await api.put("/updateProfilePicture", url);
  return data;
};

export const addFriend = async (id) => {
  const { data } = await api.put(`/addFriend/${id}`);
  return data;
};

export const accepFriendReq = async (id) => {
  const { data } = await api.put(`/acceptRequest/${id}`);
  return data;
};

export const cancelFriReq = async (id) => {
  const { data } = await api.put(`/cancelRequest/${id}`);
  return data;
};

export const unfriend = async (id) => {
  const { data } = await api.put(`/unfriend/${id}`);
  return data;
};

export const follow = async (id) => {
  const { data } = await api.put(`/follow/${id}`);
  return data;
};

export const unfollow = async (id) => {
  const { data } = await api.put(`/unfollow/${id}`);
  return data;
};

export const deleteReq = async (id) => {
  const { data } = await api.put(`/deleteRequest/${id}`);
  return data;
};

export const postReaction = async (req) => {
  const { data } = await api.put(`/reactPost`, req);
  return data;
};

export const getReaction = async (id) => {
  const { data } = await api.get(`/getReacts/${id}`);
  return data;
};

export const postComment = async (req) => {
  const { data } = await api.put("/comment", req);
  return data;
};

export const searchAcc = async (searchTerm) => {
  const { data } = await api.post(`/search/${searchTerm}`);
  return data;
};

export const addToSearchHistory = async (searchUser) => {
  const { data } = await api.put(`/addToSearchHistory`, searchUser);
  return data;
};

export const getSearchHistory = async () => {
  const { data } = await api.get("/getSearchHistory");
  return data;
};

export const removeSearchHistory = async (req) => {
  const { data } = await api.put("/removeFromSearch", req);
  return data;
};
//handle all errors
function errorHandler(error) {
  if (error.response) {
    console.log("error from api call");

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw error.response;
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
}
