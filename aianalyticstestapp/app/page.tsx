"use client";

import { useEffect, useRef, useState } from "react";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome to AI Analytics Test App</h1>
            <p className="mt-4 text-lg">Please sign in to access the dashboard.</p>
            <div className="mt-6">
                <SignInButton>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                        Sign In
                    </button>
                </SignInButton>
            </div>
        </div>
    );
}