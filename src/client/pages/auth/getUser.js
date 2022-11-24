// Verify if the user is logged in or not
export const getUser = async (email) => {
    const queryOptions = new URLSearchParams({
        email
    });

    const data = await fetch('http://localhost:8000/api/auth/getuser?' + queryOptions)
        .then(res => res.json());

    if (!data) {
        return {};
    }

    return data;
};