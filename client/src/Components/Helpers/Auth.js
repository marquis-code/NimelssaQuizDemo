import { getCookie, setCookie, deleteCookie } from './Cookies';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './LocalStarage';

export const setAuthentication = (token, user) => {
   setCookie('token', token);
   setLocalStorage('user', user);
};

export const isAuthenticatedUser = () => {
   if(getCookie('token') && getLocalStorage('user')){
      return getLocalStorage('user');
   }else{
      return false;
   }
}
 
export const logout = (next) => {
   deleteCookie('token');
   deleteLocalStorage('user');

   next();
}