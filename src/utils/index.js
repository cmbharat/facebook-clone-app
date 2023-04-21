export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('cannot store in local storage');
  }
  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemInLocalStorage = (key) => {
  if (!key) {
    console.error('cannot get the value from LS');
  }
  return localStorage.getItem(key);
};

export const removeItemInLocalStorage = (key) => {
  if (!key) {
    console.error('cannot get the value from LS');
  }
  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};
