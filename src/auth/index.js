import { API } from "../config"

//Send data to backend
export const signup = (user) => {
    //console.log(name, email, password);
    //It is available with the brower itself

    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}