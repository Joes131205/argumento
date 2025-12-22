import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    return (
        <Link to="/" className="flex gap-2">
            <ArrowLeft />
            Go Back
        </Link>
    );
};

export default BackButton;
