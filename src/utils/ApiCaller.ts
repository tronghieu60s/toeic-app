import axios, { AxiosRequestConfig } from 'axios';
import { Alert } from 'react-native';

const urlApi = 'https://raw.githubusercontent.com/tronghieu60s/toeic-ew-data/master';

export default function apiCaller(
  endpoint: string,
  { method, data }: AxiosRequestConfig = { method: 'GET' },
) {
  return axios({ method, url: `${urlApi}/${endpoint}`, data })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      Alert.alert(err);
    });
}
