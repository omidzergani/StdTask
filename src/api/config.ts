import Axios from 'axios';
import Netinfo from '@react-native-community/netinfo';

import {camelCaseTheObjectKeys, snakeCaseTheObjectKeys} from '../utils';

export const axios = Axios.create({
  baseURL: 'http://localhost:3000',
});

axios.interceptors.request.use(async request => {
  const {isConnected} = await Netinfo.fetch();
  if (!isConnected) {
    const error = new Error('You are not Connected to internet');
    return error;
  }

  if (!!request.params) {
    request.params = snakeCaseTheObjectKeys(request.params);
  }

  if (!!request.data) {
    request.data = snakeCaseTheObjectKeys(request.data);
  }

  return request;
}, errorHandler);

axios.interceptors.response.use(response => {
  if (!!response.data) {
    if (Array.isArray(response.data)) {
      response.data = response.data.map(obj => camelCaseTheObjectKeys(obj));
    } else {
      response.data = camelCaseTheObjectKeys(response.data);
    }
  }

  return response;
}, errorHandler);

function errorHandler(error: any) {
  if (error.response) {
    error.status = error.response.status;
    error.message = error.message;
  }

  return error;
}
