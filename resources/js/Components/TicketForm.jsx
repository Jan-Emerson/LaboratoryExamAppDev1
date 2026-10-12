import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const PRIORITIES  = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES    = ['Open', 'In Progress', 'Resolved', 'Closed'];
const CATEGORIES  = ['Hardware', 'Software', 'Network', 'Account', 'Other'];

export default function TicketForm({ data, setData, errors, processing, onSubmit, submitLabel = 'Save' }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="Brief summary of the issue (5–255 chars)"
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            {/* Description */}
            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="Detailed description (at least 10 characters)"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* Priority & Status row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="priority" value="Priority" />
                    <select
                        id="priority"
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                        <option value="">Select priority…</option>
                        {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                        <option value="">Select status…</option>
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </div>

            {/* Category */}
            <div>
                <InputLabel htmlFor="category" value="Category" />
                <select
                    id="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                    <option value="">Select category…</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Saving…' : submitLabel}
                </PrimaryButton>
            </div>
        </form>
    );
}
