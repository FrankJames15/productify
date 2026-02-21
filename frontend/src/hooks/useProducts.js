import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
}

export function useCreateProduct() {
    return useMutation({
        mutationFn: (data) => createProduct(data),
    });
}
