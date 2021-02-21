import axios, { AxiosRequestConfig } from 'axios';
import Config from '~/src/constants/Config';

const urlApi = Config.api.data;

export default function apiCaller(
  endpoint: string,
  { method, data }: AxiosRequestConfig = { method: 'GET' },
) {
  return axios({ method, url: `${urlApi}/${endpoint}`, data })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      // Alert.alert(err);
    });
}
