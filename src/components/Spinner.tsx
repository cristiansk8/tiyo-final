export const Spinner = ({ size = "6" }: { size?: string }) => {
    return (
        <div
            className={`animate-spin inline-block w-${size} h-${size} border-[3px] border-current border-t-transparent text-blue-600 rounded-full`}
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};