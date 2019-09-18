//sätter en användares token i session storage
export const setToken = (token) => {
    sessionStorage.setItem('rFfQfz9mAOiHZh6Iy830', token)
}

//hämtar token från session storage
export const getToken = () => {
    return sessionStorage.getItem('rFfQfz9mAOiHZh6Iy830')
}

//kollar om användare är inloggad genom att hämta hens token från storage
export const isLoggedIn = () => {
    if (getToken()) {
        return true
    } else {
        return false
    }
}

// om man loggar ut raderas token från session storage
export const logout = () => {
    sessionStorage.removeItem('rFfQfz9mAOiHZh6Iy830')
}