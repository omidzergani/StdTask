import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export function camelCaseTheObjectKeys(obj: {[key: string]: any}) {
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj;

  const newData = {};
  Object.keys(obj).forEach(key => {
    newData[camelCase(key)] = obj[key];
  });

  return newData;
}

export function snakeCaseTheObjectKeys(obj: {[key: string]: any}) {
  if (typeof obj != 'object') return obj;
  if (Array.isArray(obj)) return obj;

  const newData = {};
  Object.keys(obj).forEach(key => {
    newData[snakeCase(key)] = obj[key];
  });

  return newData;
}
