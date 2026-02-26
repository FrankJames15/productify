import React from "react";
import { useNavigate, Link, useParams } from "react-router";
import { useAuth } from "@clerk/clerk-react";

import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

export default function EditProductPage() {
    const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading, error, refetch } = useProduct(id);
    const {
        mutate: updateProduct,
        isPending: isPendingUpdate,
        isError: isUpdateError,
    } = useUpdateProduct();

    if (isLoading) return <LoadingSpinner />;
    if (!product || product.userId !== userId) {
        return (
            <div className="card bg-base-300 max-w-md mx-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-error">
                        {!product ? "Not found" : "Access denied"}
                    </h2>
                    <Link to="/" className="btn btn-primary btn-sm">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    function handleUpdate(formData) {
        updateProduct(
            { id: product.id, updates: formData },
            {
                onSuccess: () => navigate(`/product/${id}`),
            }
        );
    }

    return (
        <EditProductForm
            product={product}
            isPending={isPendingUpdate}
            isError={isUpdateError}
            onSubmit={handleUpdate}
        />
    );
}
