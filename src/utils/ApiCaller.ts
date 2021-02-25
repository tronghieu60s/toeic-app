import axios, { AxiosRequestConfig } from 'axios';

export default function apiCaller(
  url: string,
  { method, data }: AxiosRequestConfig = { method: 'GET' },
) {
  return axios({ method, url, data })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      // Alert.alert(err);
    });
}
