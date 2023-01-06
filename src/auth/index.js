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

export const signin = (user) => {
    //console.log(email, password);
    //It is available with the brower itself

    return fetch(`${API}/signin`, {
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

export const authenticate = (data, callBack) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data));
        //redirect, clear the stack
        callBack();
    }
}

export const signout = (callBack) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt');
        //redirect, clear the stack
        callBack();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                console.log("signout", response)
            })
            .catch(err => console.log(err));
    }
}