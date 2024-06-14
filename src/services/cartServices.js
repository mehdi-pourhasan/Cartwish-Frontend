import apiClient from "../utils/api-client";

export function addToCartAPI(prID, quantity) {
    return apiClient.post(`/cart/${prID}`, { quantity })
}


export function getCartApi() {
    return apiClient.get('/cart')
}

export function removeFromCartAPI(id) {
    return apiClient.patch(`/cart/remove/${id}`)
}


export function increaseProductAPI(id) {
    return apiClient.patch(`/cart/increase/${id}`)
}

export function decreaseProductAPI(id) {
    return apiClient.patch(`/cart/decrease/${id}`)
}