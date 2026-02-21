import React from "react";
import { LoaderIcon } from "lucide-react";

/**
 * Renders a centered loading indicator.
 *
 * Displays a spinning loader icon above a muted "Loading..." label, centered both
 * vertically and horizontally with spacing between elements.
 *
 * @returns {JSX.Element} A container with a spinner icon and a "Loading..." message.
 */
export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <LoaderIcon className="size-10 text-primary animate-spin" />
            <p className="text-sm text-base-content/50">Loading...</p>
        </div>
    );
}