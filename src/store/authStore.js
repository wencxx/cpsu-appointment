import { create } from "zustand";

const useAuthStore = create((set) => ({
    currentUser: localStorage.getItem('user') || null,
    token: localStorage.getItem("token") || null,
    login: (userData) => {
        localStorage.setItem('user', userData);
        localStorage.setItem('token', userData.token);
        set({
            currentUser: userData,
            token: userData.token
        });
    },
    logout: () => {
        set({
            currentUser: null,
            token: null
        })

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
}))

export default useAuthStore