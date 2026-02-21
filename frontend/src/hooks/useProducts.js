import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";

/**
 * Provides a react-query result for fetching the full list of products.
 * @returns {import('@tanstack/react-query').UseQueryResult} Query result for the "products" query; `data` contains the array of products when available, and the object includes standard react-query fields like `isLoading`, `isError`, `error`, and `refetch`.
 */
export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
}

/**
 * Provide a react-query mutation hook for creating a product.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult} The mutation result object for the create-product operation; includes `mutate`, `mutateAsync`, status flags (e.g., `isLoading`, `isError`, `isSuccess`), `data`, and `error`.
 */
export function useCreateProduct() {
    return useMutation({
        mutationFn: (data) => createProduct(data),
    });
}