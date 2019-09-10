export const setToken = (token) => {
    localStorage.setItem('rFfQfz9mAOiHZh6Iy830', token)
}

export const getToken = () => {
    return localStorage.getItem('rFfQfz9mAOiHZh6Iy830')
}

export const isLoggedIn = () => {
    if (getToken()) {
        return true
    } else {
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('rFfQfz9mAOiHZh6Iy830')
}
