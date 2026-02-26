import {
    ArrowLeftIcon,
    FileTextIcon,
    ImageIcon,
    SaveIcon,
    TypeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

export default function EditProductForm(props) {
    const { product, isPending, isError, onSubmit = () => {} } = props;

    const [formData, setFormData] = useState({
        title: product?.title,
        imageUrl: product?.imageUrl,
        description: product?.description,
    });

    function handleFormDataChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="max-w-lg mx-auto">
            <Link to="/profile" className="btn btn-ghost btn-sm gap-1 mb-4">
                <ArrowLeftIcon className="size-4" /> Back
            </Link>

            <div className="card bg-base-300">
                <div className="card-body">
                    <h1 className="card-title">
                        <SaveIcon className="size-5 text-primary" />
                        Edit Product
                    </h1>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                        {formData?.imageUrl && (
                            <div className="rounded-box overflow-hidden">
                                <img
                                    src={formData?.imageUrl}
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

                        {/* error indicator */}
                        {isError && (
                            <div
                                role="alert"
                                className="alert alert-error alert-sm"
                            >
                                <span>Failed to update. Try again</span>
                            </div>
                        )}

                        {/* button */}
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
