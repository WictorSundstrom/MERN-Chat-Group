export const setToken = (token) => {
    sessionStorage.setItem('rFfQfz9mAOiHZh6Iy830', token)
}

export const getToken = () => {
    return sessionStorage.getItem('rFfQfz9mAOiHZh6Iy830')
}

export const isLoggedIn = () => {
    if (getToken()) {
        return true
    } else {
        return false
    }
}

export const logout = () => {
    sessionStorage.removeItem('rFfQfz9mAOiHZh6Iy830')
}