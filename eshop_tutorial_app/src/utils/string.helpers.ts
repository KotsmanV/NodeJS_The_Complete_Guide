interface CookieObject {
    isLoggedIn: boolean
}

function transformCookieStringToObject(cookies: string | undefined): CookieObject {
    if (cookies) {
        let cookieObj = cookies.split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
        }, {});

        return cookieObj as CookieObject;
    }
    return { isLoggedIn: false };
}

export{
    transformCookieStringToObject
}