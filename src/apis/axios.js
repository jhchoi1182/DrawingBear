import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const loginApi = {
  login: async (inputData) => {
    const { data } = await instance.post("/api/auth/login", {
      email: inputData.email,
      password: inputData.password,
    });
    localStorage.setItem("token", data.token);
    return data;
  },

  signup: async (payload) =>
    await instance.post("/api/auth/signup", {
      username: "",
      nickname: "",
      password: "",
      profileImg: "",
    }),
};

export const mainApi = {
  read: async () => {
    const { data } = await instance.get("/api/diary");
    return data;
  },
  create: async (addData) => {
    const { data } = await instance.post("/api/diary", {
      couple: addData.couple,
      diaryName: addData.diaryName,
      outsideColor: addData.selectedColor,
    });
    return data;
  },
  update: async (updateData) => {
    const { data } = await instance.patch(`/api/diary/${updateData.id}`, {
      couple: updateData.couple,
      diaryName: updateData.diaryName,
      outsideColor: updateData.selectedColor,
    });
    return data;
  },
  delete: async (diaryId) => {
    const { data } = await instance.delete(`/api/diary/${diaryId}`);
    return data;
  },
  bookmark: async (diaryId) => {
    const { data } = await instance.patch(`/api/bookmark/post/${diaryId}`);
    return data;
  },
};

export const diaryApi = {
  post: async (formData, diaryId) => {
    console.log(formData);
    await instance.post(`api/post/${diaryId}`, formData);
  },
};
