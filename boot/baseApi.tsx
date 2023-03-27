import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

// import { config } from './config';
export const token = Cookies.get('token') || null;

const axiosConfig = {
  baseURL: 'http://202.70.34.22/api',
  timeout: 30000,
};
export const api = axios.create(axiosConfig);

api.interceptors.response.use(
  function (response: any) {
    const data = response || {};
    if (data?.data?.success && data?.data?.sucmod && data?.data?.msg) {
      message.success(data?.data?.msg);
    }
    if (!data?.data?.success && data?.data?.msg) {
      message.warning(data?.data?.msg);
    }
    // console.log(data);
    return data;
  },
  function (error) {
    if (error?.response?.status === 400) {
      window.location.assign('/');
    }
    message.error(error);

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  async (conf) => {
    const tokenGet = Cookies.get('token') || null;
    conf.headers.setAuthorization(`${tokenGet}`);
    conf.headers.setContentType('application/json');
    return conf;
  },
  (error) => {
    Promise.reject(error);
  },
);
