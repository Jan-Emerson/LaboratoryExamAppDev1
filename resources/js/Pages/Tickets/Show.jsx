import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PriorityBadge from '@/Components/PriorityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    function handleDelete() {
        if (confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <Link href={route('tickets.index')} className="text-gray-400 hover:text-gray-600">
                        ← Tickets
                    </Link>
                    <span className="text-gray-400">/</span>
                    <h2 className="text-xl font-semibold text-gray-800 max-w-sm truncate">{ticket.title}</h2>
                </div>
            }
        >
            <Head title={ticket.title} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        {/* Header bar */}
                        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <PriorityBadge priority={ticket.priority} />
                                <StatusBadge status={ticket.status} />
                                <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{ticket.category}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <Link
                                    href={route('tickets.edit', ticket.id)}
                                    className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6">
                            <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
                            <p className="mt-1 text-xs text-gray-400">
                                Opened {new Date(ticket.created_at).toLocaleString()}
                                {ticket.updated_at !== ticket.created_at && (
                                    <span> · Updated {new Date(ticket.updated_at).toLocaleString()}</span>
                                )}
                            </p>
                            <div className="mt-6 prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                                {ticket.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
