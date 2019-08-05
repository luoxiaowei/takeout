export const isAuth = (key) => {
    if (key == 1) {
        return true;
    }else  if (localStorage.webInfo && JSON.parse(localStorage.webInfo)) {
        let webInfo = JSON.parse(localStorage.webInfo);
        return (webInfo.menu || {})[key];
    } else {
        if (window.location.pathname != '/login') {
            window.location.href = '/login';
            return false;
        }
    }
}