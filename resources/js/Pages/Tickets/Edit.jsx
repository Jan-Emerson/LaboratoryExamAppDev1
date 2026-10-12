import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ ticket }) {
    const { data, setData, patch, processing, errors } = useForm({
        title:       ticket.title,
        description: ticket.description,
        priority:    ticket.priority,
        status:      ticket.status,
        category:    ticket.category,
    });

    function handleSubmit(e) {
        e.preventDefault();
        patch(route('tickets.update', ticket.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <Link href={route('tickets.index')} className="text-gray-400 hover:text-gray-600">
                        ← Tickets
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href={route('tickets.show', ticket.id)} className="text-gray-400 hover:text-gray-600 max-w-xs truncate">
                        {ticket.title}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <h2 className="text-xl font-semibold text-gray-800">Edit</h2>
                </div>
            }
        >
            <Head title={`Edit: ${ticket.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Edit Ticket</h3>
                        <TicketForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            submitLabel="Update Ticket"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
