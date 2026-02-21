import React, { useState } from "react";

// hooks
import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import {
    ArrowLeftIcon,
    FileTextIcon,
    ImageIcon,
    SparklesIcon,
    TypeIcon,
} from "lucide-react";

const CreatePage = () => {
    const navigate = useNavigate();
    const { mutate: createProduct, isPending, isError } = useCreateProduct();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });

    /**
     * Update the formData state for the field corresponding to the event target's name.
     * @param {import('react').ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Change event from a form input or textarea; its target's name and value are used to update state.
     */
    function handleFormDataChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    /**
     * Handle form submission for creating a product.
     *
     * Prevents the browser's default submit behavior, triggers product creation with the current form data,
     * and navigates to the root path ("/") if creation succeeds.
     * @param {Event} e - The form submit event.
     */
    async function handleSubmit(e) {
        e.preventDefault();

        createProduct(formData, {
            onSuccess: () => navigate("/"),
        });
    }

    return (
        <div className="max-w-sm mx-auto">
            <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
                <ArrowLeftIcon className="size-4" /> Back
            </Link>

            <div className="card bg-base-300 max-w-sm mx-auto">
                <div className="card-body ">
                    <h1 className="card-title">
                        <SparklesIcon className="size-5 text-primary" />
                        New Product
                    </h1>

                    <form className="space-y-4 mt-4 " onSubmit={handleSubmit}>
                        {/* TITLE INPUT */}
                        <label className="input input-bordered w-full flex items-center gap-2 bg-base-200">
                            <TypeIcon className="size-4 text-base-content/50" />
                            <input
                                required
                                name="title"
                                className="grow"
                                value={formData?.title}
                                onChange={handleFormDataChange}
                                placeholder="Product name"
                            />
                        </label>
                        {/* IMAGE URL INPUT */}
                        <label className="input input-bordered w-full flex items-center gap-2 bg-base-200">
                            <ImageIcon className="size-4 text-base-content/50" />
                            <input
                                required
                                type="url"
                                name="imageUrl"
                                className="grow"
                                value={formData?.imageUrl}
                                onChange={handleFormDataChange}
                                placeholder="Image URL"
                            />
                        </label>
                        {/* IMG PREVIEW */}
                        {formData.imageUrl && (
                            <div className="rounded-box overflow-hidden">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-40 object-cover"
                                    // onError={(e) =>
                                    //     (e.target.style.display = "none")
                                    // }
                                />
                            </div>
                        )}
                        <div className="form-control">
                            <div
                                className="flex items-start gap-2 p-3 rounded-box 
                            bg-base-200 border border-base-300 
                            "
                            >
                                <FileTextIcon className="size-4 text-base-content/50 mt-1" />

                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData?.description}
                                    required
                                    onChange={handleFormDataChange}
                                    className="grow bg-transparent resize-none focus:outline-none min-h-24"
                                />
                            </div>
                        </div>
                        {isError && (
                            <div
                                role="alert"
                                className="alert alert-error alert-sm"
                            >
                                <span>Failed to create. Try again</span>
                            </div>
                        )}
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;