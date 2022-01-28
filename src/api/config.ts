import Axios from 'axios';
import Netinfo from '@react-native-community/netinfo';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';

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
    const newParams = {};
    Object.keys(request.params).forEach(key => {
      newParams[snakeCase(key)] = request.params[key];
    });
    request.params = newParams;
  }

  if (!!request.data) {
    const newData = {};
    Object.keys(request.data).forEach(key => {
      newData[snakeCase(key)] = request.data[key];
    });
    request.data = newData;
  }

  return request;
}, errorHandler);

axios.interceptors.response.use(response => {
  if (!!response.data) {
    const newData = {};
    Object.keys(response.data).forEach(key => {
      newData[camelCase(key)] = response.data[key];
    });
    response.data = newData;
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
