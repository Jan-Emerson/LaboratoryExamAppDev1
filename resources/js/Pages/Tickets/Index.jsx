import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PriorityBadge from '@/Components/PriorityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ tickets }) {
    const { data, links, current_page, last_page } = tickets;

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
            router.delete(route('tickets.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">My Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="My Tickets" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {data.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">No tickets yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by filing your first support ticket.</p>
                            <Link
                                href={route('tickets.create')}
                                className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                            >
                                Create Ticket
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden sm:block overflow-hidden rounded-xl bg-white shadow">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Priority</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route('tickets.show', ticket.id)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                                                    >
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                                                <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                                                <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(ticket.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('tickets.show', ticket.id)}
                                                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                                                        >View</Link>
                                                        <Link
                                                            href={route('tickets.edit', ticket.id)}
                                                            className="text-sm text-indigo-600 hover:text-indigo-900 underline"
                                                        >Edit</Link>
                                                        <button
                                                            onClick={() => handleDelete(ticket.id)}
                                                            className="text-sm text-red-600 hover:text-red-900 underline"
                                                        >Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile stacked cards */}
                            <div className="sm:hidden space-y-4">
                                {data.map((ticket) => (
                                    <div key={ticket.id} className="rounded-xl bg-white shadow p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <Link
                                                href={route('tickets.show', ticket.id)}
                                                className="font-semibold text-indigo-600 hover:underline text-sm leading-tight"
                                            >
                                                {ticket.title}
                                            </Link>
                                            <span className="text-xs text-gray-400 shrink-0">
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="text-xs text-gray-500">{ticket.category}</span>
                                            <PriorityBadge priority={ticket.priority} />
                                            <StatusBadge status={ticket.status} />
                                        </div>
                                        <div className="mt-3 flex gap-3">
                                            <Link href={route('tickets.edit', ticket.id)} className="text-sm text-indigo-600 underline">Edit</Link>
                                            <button onClick={() => handleDelete(ticket.id)} className="text-sm text-red-600 underline">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {last_page > 1 && (
                                <div className="mt-6 flex items-center justify-center gap-1">
                                    {links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? '#'}
                                            className={`px-3 py-1.5 rounded text-sm border transition ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    : 'bg-white text-gray-400 border-gray-200 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={undefined}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
