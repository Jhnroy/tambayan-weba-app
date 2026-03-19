
    'use client';
    import { ArrowLeftOutlined } from '@ant-design/icons';
    import Link from "next/link";
    import React from "react";

    export const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        
        
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-blue-700 text-lg hover:opacity-80"
            >
            Tambayan
            </Link>

            <div className="flex gap-2">
            {/* <Link href="/login">
                <button className="px-4 py-1 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                Log in
                </button>
            </Link>

            <Link href="/signup">
                <button className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                Sign up
                </button>
            </Link> */}
            </div>
        </nav>

    
        <div className="flex flex-1 items-center justify-center px-4">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
            
            
            <div className="text-center mb-6">
                
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80" >

                <ArrowLeftOutlined className=""/></Link>
            
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-gray-500 text-sm">Log in to Tambayan</p>
            </div>

            
            <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">
                SIGN IN AS
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md text-sm hover:bg-blue-50">
                    Resident
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md text-sm hover:bg-blue-50">
                    Organizer
                </button>
                </div>
            </div>

            
            <div className="space-y-4">
                <div>
                <label className="text-xs text-gray-500">
                    EMAIL OR MOBILE
                </label>
                <input
                    type="text"
                    placeholder="09XXXXXXXXX or email"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="text-xs text-gray-500">
                    PASSWORD
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
            </div>

            
            <button className="w-full mt-6 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
                Log In
            </button>

        
            <p className="text-center text-sm text-gray-500 mt-4">
                No account?{" "}
                <Link href="/signup">
                <span className="text-blue-600 cursor-pointer hover:underline">
                    Sign up free
                </span>
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
    };