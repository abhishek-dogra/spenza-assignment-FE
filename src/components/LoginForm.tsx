"use client";
import {FormEvent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Login} from "@/common/userAxiosWrapper";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData = await Login(email, password);
        setMessage(loginData.message);
        if (loginData.error || loginData.data == null) {
            setError(true);
            return;
        } else {
            localStorage.setItem('token', loginData.data.accessToken);
            localStorage.setItem('name', loginData.data.name);
            await router.push('/home');
        }
    }


    return <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Login
                </button>
                {(error) ? (message && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {message}
                    </div>
                )) : (message && (
                    <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {message}
                    </div>
                ))
                }
                <Link className="text-sm mt-3 text-right" href={"/register"}>
                    <span className="underline">Register</span>
                </Link>
            </form>
        </div>
    </div>
}
