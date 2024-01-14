"use client"
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {FiEye, FiEyeOff, FiCopy} from 'react-icons/fi';
import {GetAuthKey} from "@/common/userAxiosWrapper";

export default function ShowAuthKeyPage() {
    const router = useRouter();
    const [authKey, setAuthKey] = useState<string|undefined>('');
    const [showKey, setShowKey] = useState<boolean>(false);

    const fetchAuthKey = async () => {
        try {
            const response = await GetAuthKey();
            if (response.status === 401) {
                localStorage.clear();
                router.push('/login');
            }
            setAuthKey(response.data?.authKey);
        } catch (error) {
            console.error('Error fetching auth key:', error);
        }
    };

    const toggleShowKey = () => {
        setShowKey((prevShowKey) => !prevShowKey);
    };

    const copyToClipboard = () => {
        if (typeof authKey === "string") {
            navigator.clipboard.writeText(authKey);
        }
    };

    useEffect(() => {
        fetchAuthKey();
    }, []);

    return (
        <div className="flex-1 pr-8">
            <div className="bg-white p-3 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Get Auth Key</h2>
                    <div className="flex items-center">
                        <span className="flex-1">
                            {showKey ? authKey : '••••••••••••••••••••••••'}
                        </span>
                        <button onClick={toggleShowKey} className="mr-2">
                            {showKey ? <FiEyeOff/> : <FiEye/>}
                        </button>
                        <button onClick={copyToClipboard}>
                            <FiCopy/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
