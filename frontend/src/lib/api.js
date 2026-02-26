import api from "./axios";

export const syncUser = async (userData) => {
    const { data } = await api.post("/users/sync", userData);
    return data;
};

export const createProduct = async (payload) => {
    const { data } = await api.post("/products", payload);
    return data;
};

export const getAllProducts = async () => {
    const { data } = await api.get("/products");
    return data;
};

export const getProductById = async (productId) => {
    const { data } = await api.get(`/products/${productId}`);
    return data;
};

export const getMyProducts = async () => {
    const { data } = await api.get("/products/my");
    return data;
};

export const updateProduct = async ({ id, ...productData }) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
};

export const deleteProduct = async (productId) => {
    const { data } = await api.delete(`/products/${productId}`);
    return data;
};

// comments api
export async function getAllCommentsByProduct(productId) {
    const { data } = await api.get(`/comments/${productId}`);
    return data;
}

export async function createComment({ productId, content }) {
    const { data } = await api.post(`/comments/${productId}`, { content });
    return data;
}

// ❌
export const deleteComment = async (commentID) => {
    const { data } = await api.delete(`/comments/${commentID}`);
    return data;
};
