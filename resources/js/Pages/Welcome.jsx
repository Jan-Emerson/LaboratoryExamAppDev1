import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="HelpDesk — Ticket Management System" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">

                {/* Navbar */}
                <nav className="bg-white shadow-sm border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">HelpDesk</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
                        <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                        Ticket Management System
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
                        Support tickets, <span className="text-indigo-600">organized</span> and under control
                    </h1>
                    <p className="mt-6 text-lg text-gray-500 max-w-xl">
                        File, track, and resolve IT support requests in one place. No more lost emails or shared spreadsheets.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-indigo-500 transition"
                        >
                            Create an account
                        </Link>
                        <Link
                            href={route('login')}
                            className="inline-flex items-center rounded-lg bg-white border border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
                        >
                            Log in
                        </Link>
                    </div>

                    {/* Feature cards */}
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full text-left">
                        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
                            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900">Track Progress</h3>
                            <p className="mt-1 text-sm text-gray-500">See every ticket's status from Open to Resolved at a glance.</p>
                        </div>
                        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                                <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                            <p className="mt-1 text-sm text-gray-500">Each user can only view and edit their own tickets.</p>
                        </div>
                        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
                            <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                                <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900">Fast & Responsive</h3>
                            <p className="mt-1 text-sm text-gray-500">Single-page app experience on both phone and desktop.</p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-gray-400">
                    HelpDesk Ticket Management System
                </footer>
            </div>
        </>
    );
}
