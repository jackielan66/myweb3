// StateBadge.tsx
function StateBadge({ state }: { state: number }) {
    let badgeText = "Unknown";
    let badgeClass = "bg-gray-100 text-gray-800";

    switch (state) {
        case 0:
            badgeText = "Active";
            badgeClass = "bg-green-100 text-green-800";
            break;
        case 1:
            badgeText = "Success";
            badgeClass = "bg-blue-100 text-blue-800";
            break;
        case 2:
            badgeText = "Failed";
            badgeClass = "bg-red-100 text-red-800";
            break;

        default:
            badgeText = "Unknown";
            badgeClass = "bg-gray-100 text-gray-800";
    }

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
            {badgeText}
        </span>
    );
}

export default StateBadge;