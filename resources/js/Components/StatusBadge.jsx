export default function StatusBadge({ status }) {
    const colors = {
        'Open':        'bg-green-100 text-green-700',
        'In Progress': 'bg-yellow-100 text-yellow-700',
        'Resolved':    'bg-blue-100 text-blue-700',
        'Closed':      'bg-gray-100 text-gray-600',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
}
