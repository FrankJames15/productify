import React, { useEffect, useState } from "react";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import {
    MessageSquareIcon,
    SendIcon,
    LogInIcon,
    Trash2Icon,
} from "lucide-react";
import { SignInButton, useAuth } from "@clerk/clerk-react";

export default function CommentsSection(props) {
    const { productId = null, comments = [], refetchProduct } = props;

    const { isSignedIn, userId: currentUser } = useAuth();

    // custom hooks
    const createComment = useCreateComment();
    const deleteComment = useDeleteComment(productId);

    const [content, setContent] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;
        createComment.mutate(
            { productId, content },
            { onSuccess: () => setContent("") }
        );
    }
    function handleDelete(commentId) {
        confirm("Delete?") && deleteComment.mutate(commentId);
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <MessageSquareIcon className="size-5 text-primary" />
                    <h3 className="fond-bold">Comments</h3>
                    <span className="badge badge-neutral badge-sm ">
                        {comments?.length}
                    </span>
                </div>

                {/* form */}
                {isSignedIn ? (
                    <>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                placeholder="Add a comment..."
                                className="input input-bordered  input-sm flex-1 bg-base-200"
                                value={content}
                                disabled={createComment?.isPending}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary btn-sm btn-square"
                                disabled={
                                    createComment?.isPending || !content.trim()
                                }
                            >
                                {createComment?.isPending ? (
                                    <span className="loading loading-spinner loading-xs" />
                                ) : (
                                    <SendIcon className="size-4" />
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
                        <span className="text-sm text-base-content/60">
                            Sign in to join the conversation
                        </span>
                        <SignInButton mode="modal">
                            <button className="btn btn-primary btn-sm gap-1">
                                <LogInIcon className="size-4" />
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                )}

                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {comments?.length === 0 ? (
                        <div className="text-center py-8 text-base-content/50">
                            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">
                                No comments yet. Be first!
                            </p>
                        </div>
                    ) : (
                        comments?.map((comment) => (
                            <div key={comment?.id} className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-8 rounded-full">
                                        <img
                                            src={comment?.user?.imageUrl}
                                            alt={comment?.user?.name}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    {/* chat header */}
                                    <div className="chat-header text-sm opacity-70 mb-2">
                                        {comment?.user?.name}
                                        <time className="ml-2 text-xs opacity-50">
                                            {new Date(
                                                comment?.createdAt
                                            ).toLocaleDateString()}
                                        </time>
                                    </div>

                                    {/* chat content */}
                                    <div className="chat-bubble chat-bubble-neutral text-sm">
                                        {comment?.content}
                                    </div>

                                    {/* chat footer */}
                                    {currentUser === comment?.userId && (
                                        <div className="chat-footer">
                                            <button
                                                className="btn btn-ghost btn-xs text-error"
                                                disabled={
                                                    deleteComment?.isPending
                                                }
                                                onClick={() =>
                                                    handleDelete(comment?.id)
                                                }
                                            >
                                                {deleteComment?.isPending ? (
                                                    <span className="loading loading-spinner loading-xs" />
                                                ) : (
                                                    <Trash2Icon className="size-3" />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
