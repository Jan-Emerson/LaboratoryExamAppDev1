import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Welcome back, {auth.user.name}! 👋
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Use the navigation above to manage your support tickets.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                href={route('tickets.index')}
                                className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition"
                            >
                                View My Tickets →
                            </Link>
                            <Link
                                href={route('tickets.create')}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                            >
                                + New Ticket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
