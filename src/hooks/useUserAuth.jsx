import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            return;
        }

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                updateUser(parsedUser, storedToken);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                clearUser();
                navigate('/login');
            }
        } else {
            clearUser();
            navigate('/login');
        }
    }, [updateUser, clearUser, navigate, user]);
};