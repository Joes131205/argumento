import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    return (
        <Link
            to="/"
            className="group flex items-center gap-2 font-bold font-mono text-xs text-zinc-500 uppercase tracking-widest transition-colors duration-300 hover:text-green-500"
        >
            <div className="p-2">
                <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                />
            </div>
            <span>Go Back</span>
        </Link>
    );
};

export default BackButton;
