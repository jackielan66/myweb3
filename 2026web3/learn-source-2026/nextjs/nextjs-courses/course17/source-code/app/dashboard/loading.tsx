export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="p-10 space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
    );
}
