import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title:       '',
        description: '',
        priority:    '',
        status:      'Open',
        category:    '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('tickets.store'));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <Link href={route('tickets.index')} className="text-gray-400 hover:text-gray-600">
                        ← Tickets
                    </Link>
                    <span className="text-gray-400">/</span>
                    <h2 className="text-xl font-semibold text-gray-800">New Ticket</h2>
                </div>
            }
        >
            <Head title="New Ticket" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">File a Support Ticket</h3>
                        <TicketForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            submitLabel="Create Ticket"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
