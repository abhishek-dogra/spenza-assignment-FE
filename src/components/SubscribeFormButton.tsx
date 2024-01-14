"use client";
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {FetchWebhookList, Login, SubscribeWebhook} from "@/common/userAxiosWrapper";
import {router} from "next/client";
import {Webhook} from "@/Interfaces/Webhook.interface";
export default function SubscribeFormButton() {
    const [showForm, setShowForm] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState<Webhook[]>([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [sourceUrls, setSourceUrls] = useState<string[]>([]);
    const [newSourceUrl, setNewSourceUrl] = useState('');

    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string|null>(null);

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

    const handleAddMoreClick = () => {
        setShowForm(!showForm);
    };

    const handleDropdownChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedOption) {
            alert('Please select an option from the dropdown.');
            return;
        }
        if (sourceUrls.length === 0) {
            alert('Please provide at least one source URL.');
            return;
        }
        console.log(selectedOption,sourceUrls);
        const response = await SubscribeWebhook(selectedOption, sourceUrls);
        if(response.status==401){
            localStorage.clear();
            router.push('/login');
        }
        setMessage(response.message);
        handleCloseForm();
        if (response.error) {
            setError(true);
            return;
        }
    };

    const handleAddSourceUrl = () => {
        if (newSourceUrl) {
            setSourceUrls(prevUrls => [...prevUrls, newSourceUrl]);
            setNewSourceUrl('');
        }
    };

    const handleRemoveSourceUrl = (index:number) => {
        setSourceUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSourceUrls([]);
        setNewSourceUrl('');
    };

    return (
        <div>

            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddMoreClick}>
                Add More
            </button>

            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Select an option:
                        <select value={selectedOption} onChange={handleDropdownChange}>
                            <option value="">Select an option</option>
                            {dropdownOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="mt-4">
                        <label className="block">
                            Add Source URL:
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="mt-1 p-2 border rounded"
                                    value={newSourceUrl}
                                    onChange={e => setNewSourceUrl(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="ml-2 bg-green-500 text-white py-2 px-4 rounded"
                                    onClick={handleAddSourceUrl}
                                >
                                    +
                                </button>
                            </div>
                        </label>
                        <ul className="mt-2">
                            {sourceUrls.map((url, index) => (
                                <li key={index} className="flex items-center">
                                    {url}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => handleRemoveSourceUrl(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit">Submit</button>
                    <button className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded" onClick={handleCloseForm}>
                        Close
                    </button>
                </form>
            )}
        </div>
    );
};
