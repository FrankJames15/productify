import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getMyProducts,
} from "../lib/api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
}
export const useMyProducts = () => {
    return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};
export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
}

export function useProduct(id) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: Boolean(id),
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
}
