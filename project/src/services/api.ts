import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import browserHistory from '../browser-history';
import { AppRoute } from '../const';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const SERVER_ERROR_MESSAGE = 'Произошла ошибка загрузки данных';

enum HttpCode {
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      if (response?.status === HttpCode.NotFound) {
        browserHistory.push(AppRoute.NotFound);
      }

      if (response?.status === HttpCode.InternalServerError) {
        toast.error(SERVER_ERROR_MESSAGE);
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
