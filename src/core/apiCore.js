import { API } from '../config'
import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=4`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
        })
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        skip, limit, filters
    }
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error)
        })
}

export const list = (params) => {
    const query = queryString.stringify(params);
    console.log('query', query)

    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            // console.log(response)
            return response.json();
        })
        .catch(error => {
            console.log(error);
        })
}