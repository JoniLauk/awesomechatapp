export const setToken = (user) => {
  window.localStorage.setItem('token', JSON.stringify(user));
};

export const getToken = () => {
  try {
    const token = JSON.parse(window.localStorage.getItem('token')).token;
    return token;
  } catch (error) {
    return null;
  }
};

export const getUser = () => {
  try {
    const token = JSON.parse(window.localStorage.getItem('token')).username;
    return token;
  } catch (error) {
    return null;
  }
};

export const getUserId = () => {
  try {
    const token = JSON.parse(window.localStorage.getItem('token')).id;
    return token;
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  window.localStorage.removeItem('token');
};

export const setColorScheme = (scheme) => {
  window.localStorage.setItem('currentTheme', scheme);
};

export const getColorScheme = () => {
  return window.localStorage.getItem('currentTheme');
};

export const handleNotification = (data, setNot, setNotContent) => {
  setNot(true);
  setNotContent(data);
  setTimeout(() => {
    setNotContent('');
    setNot(false);
  }, 2000);
};
