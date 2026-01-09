import type { AxiosResponse } from 'axios';
import api from '../utils/axios';

export interface PostData {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  date?: string;
}

export interface AuthData {
  name?: string;
  email: string;
  password: string;
}

export interface PostResponse {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  date: string;
  user: UserResponse;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  posts: PostResponse[];
}

export const getAllPosts = async (): Promise<{
  posts: PostResponse[];
} | void> => {
  try {
    const res: AxiosResponse<{ posts: PostResponse[] }> = await api.get(
      '/posts'
    );
    if (res.status !== 200) {
      return console.log('**Some Error Occurred**');
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendAuthRequest = async (
  signup: boolean,
  data: AuthData
): Promise<UserResponse | void> => {
  try {
    const res: AxiosResponse<UserResponse> = await api.post(
      `/users/${signup ? 'signup' : 'signin'}/`,
      {
        name: data.name ?? '',
        email: data.email,
        password: data.password,
      }
    );

    if (res.status !== 200 && res.status !== 201) {
      return console.log('**Unable to Authenticate**');
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (data: PostData): Promise<PostResponse | void> => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return console.log('**User ID not found in localStorage**');
  }

  try {
    const res: AxiosResponse<PostResponse> = await api.post('/posts/', {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
      date: data.date,
      user: userId,
    });

    console.log(res);

    if (res.status !== 201) {
      return console.log('**Error Occurred**');
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostDetails = async (
  id: string
): Promise<PostResponse | void> => {
  try {
    const res: AxiosResponse<PostResponse> = await api.get(`/posts/${id}`);
    if (res.status !== 200) {
      return console.log('**Unable to fetch diary**');
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUpdate = async (
  data: PostData,
  id: string
): Promise<PostResponse | void> => {
  try {
    const res: AxiosResponse<PostResponse> = await api.put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
    });

    if (res.status !== 200) {
      return console.log('**Unable to update**');
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDelete = async (id: string): Promise<any> => {
  try {
    const res: AxiosResponse = await api.delete(`/posts/${id}`);

    if (res.status !== 200) {
      return console.log('**Unable to delete**');
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (): Promise<{
  user: UserResponse;
} | void> => {
  const id = localStorage.getItem('userId');

  if (!id) {
    return console.log('**User ID not found in localStorage**');
  }

  try {
    const res: AxiosResponse<{ user: UserResponse }> = await api.get(
      `/users/${id}`
    );
    if (res.status !== 200) {
      return console.log('**No user found**');
    }
    return { user: res.data.user };
  } catch (error) {
    console.log(error);
  }
};
