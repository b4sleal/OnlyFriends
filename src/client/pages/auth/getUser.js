export const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token) {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + user.token,
                'Content-Type': 'application/json'
            }
        };

        const data = await fetch('http://localhost:8000/api/auth/loginsession', reqOptions)
            .then(res => res.json())
            .catch(() => { });

        if (data.message === 'token expired') {
            localStorage.removeItem('user');
        }

        return data?.message;
    }
};