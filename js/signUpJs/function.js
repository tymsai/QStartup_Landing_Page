
// -save user to data base function
export const saveUserToDatabase = async (user) => {
    const res = await fetch(`http://localhost:5000/signup`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data;
}