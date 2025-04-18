


export const getMyProfile = async (id: string) => {
    const res = await fetch(`http://localhost:5000/users/my-profile/${id}`, {
        credentials: 'include', // 👈 This sends cookies/session
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}