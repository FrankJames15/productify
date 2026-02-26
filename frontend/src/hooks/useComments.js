import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createComment,
    deleteComment,
    getAllCommentsByProduct,
} from "../lib/api";

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) =>
            queryClient.invalidateQueries({
                queryKey: ["product", variables.productId],
            }),
    });
}

export function useDeleteComment(productId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["product", productId],
            }),
    });
}

export function useComments() {
    return useQuery({
        queryKey: ["comments"],
        queryFn: (productId) => getAllCommentsByProduct(productId),
    });
}
