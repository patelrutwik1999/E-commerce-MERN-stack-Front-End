import { API } from "../config"

//Send data to backend for creating category
export const createCategory = (userId, token, category) => {
    //console.log(name, email, password);
    //It is available with the brower itself

    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

//Send data to backend for creating product
export const createProduct = (userId, token, product) => {
    //console.log(name, email, password);
    //It is available with the brower itself

    //Will not use content-type because here we are sending photo of the products.
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'get'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getStatusValue = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}