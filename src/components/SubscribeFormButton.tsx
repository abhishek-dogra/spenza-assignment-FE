"use client";
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {FetchWebhookList, SubscribeWebhook} from "@/common/userAxiosWrapper";
import {Webhook} from "@/Interfaces/Webhook.interface";
import {useRouter} from "next/navigation";

interface SubscribeFormButtonProps {
    onFormSubmit: () => void;
}

export default function SubscribeFormButton({ onFormSubmit }: SubscribeFormButtonProps) {
    const router = useRouter();
    const [dropdownOptions, setDropdownOptions] = useState<Webhook[]>([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [retryCount, setRetryCount] = useState<number>(1);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function fetchWebhookList() {
        const response = await FetchWebhookList();
        if(response.status==401){
            localStorage.clear();
            router.push('/login');
        }
        let webhooksList:Webhook[] = [];
        if(response.data?.data!=null){
            webhooksList = response.data.data;
        }
        setDropdownOptions(webhooksList);
    }

    useEffect(() => {
        fetchWebhookList();
    }, []);

    const handleDropdownChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedOption || selectedOption=='') {
            alert('Please select an option from the dropdown.');
            return;
        }
        const response = await SubscribeWebhook(selectedOption, sourceUrl, retryCount);
        if(response.status==401){
            localStorage.clear();
            router.push('/login');
        }
        setMessage(response.message);
        onFormSubmit();
        if (response.error) {
            setError(true);
            return;
        }
        setError(false);
        clearForm();
    };

    const clearForm = () => {
        setSelectedOption('');
        setRetryCount(1);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label className="block">
                    Select an option:
                    <select
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        className="mt-1 p-2 border rounded"
                    >
                        <option value="">Select an option</option>
                        {dropdownOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="mt-4">
                    <label className="block">
                        Source URL:
                        <input
                            type="text"
                            className="mt-1 p-2 border rounded"
                            value={sourceUrl}
                            onChange={(e) => setSourceUrl(e.target.value)}
                        />
                    </label>
                    <label className="mt-4 block">
                        Retry Count:
                        <input
                            type="number"
                            className="mt-1 p-2 border rounded"
                            value={retryCount}
                            onChange={(e) => setRetryCount(parseInt(e.target.value))}
                        />
                    </label>
                </div>

                <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
                    Submit
                </button>

                {(error || message) && (
                    <div className={`mt-2 text-white w-fit text-sm py-1 px-3 rounded-md ${error ? 'bg-red-500' : 'bg-green-500'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};
