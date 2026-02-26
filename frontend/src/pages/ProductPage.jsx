import React from "react";
import {
    ArrowLeftIcon,
    EditIcon,
    Trash2Icon,
    CalendarIcon,
    UserIcon,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentsSection from "../components/CommentsSection";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useDeleteProduct } from "../hooks/useProducts";
import { useParams, Link, useNavigate } from "react-router";

const ProductPage = () => {
    const { id } = useParams();
    const { userId, isSignedIn } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading, error, refetch } = useProduct(id);
    // console.log({ product });
    const {
        mutate: deleteProduct,
        isPending: isDeleting,
        error: deleteError,
    } = useDeleteProduct();

    function handleDelete(e) {
        e.preventDefault();

        if (confirm("Delete this product permanently?")) {
            deleteProduct(id, {
                onSuccess: () => navigate("/"),
            });
        }
    }
    const isOwner = userId === product?.userId;

    if (isLoading) return <LoadingSpinner />;
    if (error || !product) {
        return (
            <div className="card bg-base-300 max-w-md max-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-error">Product Not Found</h2>
                    <Link to="/" className="btn btn-primary btn-sm">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Link to="/" className="btn btn-ghost btn-sm gap-1">
                        <ArrowLeftIcon className="size-4" /> Back
                    </Link>
                    {isOwner && (
                        <div className="flex gap-2">
                            <Link
                                to={`/edit/${product.id}`}
                                className="btn btn-ghost btn-sm gap-1"
                            >
                                <EditIcon className="size-4" /> Edit
                            </Link>
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="btn btn-error btn-sm gap-1"
                            >
                                {isDeleting ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <Trash2Icon className="size-4" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* image */}
                    <div className="card bg-base-300">
                        <figure className="p-4">
                            <img
                                className="rounded-xl w-full h-80 object-cover"
                                src={product?.imageUrl}
                                alt={product?.title}
                            />
                        </figure>
                    </div>
                    <div className="card bg-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">
                                {product?.title}
                            </h2>

                            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                                <div className="flex items-center gap-1">
                                    <CalendarIcon className="size-4" />
                                    {new Date(
                                        product?.createdAt
                                    ).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <UserIcon className="size-4" />
                                    {product?.user?.name}
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <p className="text-base-content/80 leading-relaxed ">
                                {product?.description}
                            </p>

                            {product?.user && (
                                <>
                                    <div className="divider my-2"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src={
                                                        product?.user?.imageUrl
                                                    }
                                                    alt={product?.user?.name}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {product?.user?.name}
                                            </p>
                                            <p className="text-xs text-base-content/50">
                                                Creator
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* comment section */}
                <div className="card bg-base-300">
                    <div className="card-body">
                        <CommentsSection
                            isSignedIn
                            productId={id}
                            comments={product?.comments}
                            refetchProduct={refetch}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
