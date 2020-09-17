
// import { beginRequest, endRequest, showError } from './notification.js';

import API from './api.js';

const endpoints = {
    ITEMS: 'data/items',
    ITEM_BY_ID: 'data/items/'
};

const api = new API(
    'BC62E6F1-0281-1D6A-FF35-E49866C52C00',
    'CB327E3F-1F87-4FBB-992F-EA6D7980E58F',
    // beginRequest,
    // endRequest
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

// Get all items
export async function getItems() {
    return api.get(endpoints.ITEMS);
}

// Get item by ID
export async function getItemById(id) {
    return api.get(endpoints.ITEM_BY_ID + id);
}

// Create item
export async function createItem(item) {
    return api.post(endpoints.ITEMS, item);
}

// Edit item
export async function updateItem(id, updatedProps) {
    return api.put(endpoints.ITEM_BY_ID + id, updatedProps);
}

// Delete item
export async function deleteItem(id) {
    return api.delete(endpoints.ITEM_BY_ID + id);
}

//Get items by user ID
export async function getItemsByOwner() {
    const ownerId = localStorage.getItem('userId');
    return api.get(endpoints.ITEMS + `?where=ownerId%3D%27${ownerId}%27`);
}

// Check result for errors
export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}
