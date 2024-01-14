"use client";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    function Logout() {
        localStorage.clear();
        router.push('/login');
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    Hi {localStorage.getItem('name')}
                </div>
                <ul className="flex space-x-4">
                    <li className="text-white hover:text-gray-300">
                        <a href="/home">Home</a>
                    </li>
                    <button onClick={Logout} className="text-white hover:text-gray-300">
                        <p>Logout</p>
                    </button>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
