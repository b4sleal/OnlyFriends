// Verify if the user is logged in or not
export const authUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token) {
        const queryOptions = new URLSearchParams({
            token: user.token,
            email: user.email
        });

        const data = await fetch('http://localhost:8000/api/auth/loginsession?' + queryOptions)
            .then(res => res.json());

        if (!data || data.message === 'token expired') {
            localStorage.removeItem('user');
        }

        return data;
    }

    return {};
};