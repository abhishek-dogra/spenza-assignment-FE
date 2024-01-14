"use client";
import React, {useState, useEffect, FormEvent} from 'react';
import {FetchSubscribedWebhookList, UpdateWebhookMapping} from "@/common/userAxiosWrapper";
import {UserWebhookMapping} from "@/Interfaces/UserWebhookMapping";
import {useRouter} from "next/navigation";
export default function SubscribedList() {
    const router = useRouter();
    const [list, setList] = useState<UserWebhookMapping[]>([]);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [showFieldError, setShowFieldError] = useState<boolean>(false);
    const [fieldErrorMessage, setFieldErrorMessage] = useState<string>('');
    const [editedRetryCount, setEditedRetryCount] = useState<number>(1);

    async function fetchWebhookList() {
        const response = await FetchSubscribedWebhookList();
        if (response.status === 401) {
            localStorage.clear();
            router.push('/login');
        }
        let webhooksList: UserWebhookMapping[] = [];
        if (response.data?.data != null) {
            webhooksList = response.data.data;
        }
        setList(webhooksList);
    }

    useEffect(() => {
        fetchWebhookList();
    }, []);

    const handleEditClick = (itemId: string, retryCount: number) => {
        setShowFieldError(false);
        setEditMode(itemId);
        setEditedRetryCount(retryCount);
    };

    const handleCancelClick = () => {
        setEditMode(null);
        setEditedRetryCount(0);
    };

    const handleSubscriptionEditFormSubmit = async (itemId: string) => {
        if(editedRetryCount<0){
            setShowFieldError(true);
            setFieldErrorMessage('Retry count should be greater than equal to 0.');
            return;
        }
        setShowFieldError(false);
        await UpdateWebhookMapping(itemId, editedRetryCount,null);
        setEditMode(null);
        setEditedRetryCount(1);
        await fetchWebhookList();
    };

    const handleSubscriptionCancelClick = async (itemId: string) => {
        await UpdateWebhookMapping(itemId, null,true);
        setEditMode(null);
        await fetchWebhookList();
    };

    return (
        <div className="flex-1 pr-8">
            <div className="bg-white p-3 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Subscribed Webhooks</h2>
                    {list.map((item) => (
                        <div key={item.webhook.name} className="mb-4 p-4 border rounded-md flex justify-between items-center">
                            {editMode === item.id ? (
                                <form
                                    onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                        e.preventDefault();
                                        await handleSubscriptionEditFormSubmit(editMode);
                                    }}
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Retry Count:
                                                <input
                                                    type="number"
                                                    value={editedRetryCount}
                                                    onChange={(e) => setEditedRetryCount(parseInt(e.target.value))}
                                                    className="mt-1 p-2 border rounded-md"
                                                />
                                            </label>
                                        </div>
                                        {showFieldError && (
                                            <div className="text-red-500 ml-4">
                                                {fieldErrorMessage}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex mt-4">
                                        <button type="submit" className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md">
                                            Submit
                                        </button>
                                        <button type="button" onClick={handleCancelClick} className="px-4 py-2 bg-red-500 text-white rounded-md">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold mr-2 text-500">Webhook Name : </span>
                                        <h3 className="text-lg font-semibold text-indigo-700">{item.webhook.name}</h3>
                                    </div>
                                    <p className="text-md font-semibold">
                                        <span className="text-400">Source : </span>
                                        <span className="text-blue-400">{item.sourceUrl}</span>
                                    </p>
                                    <p className="text-md font-semibold">
                                        <span className="text-400">Retry Count : </span>
                                        <span className="text-blue-400">{item.retryCount}</span>
                                    </p>
                                    <button onClick={() => handleEditClick(item.id,item.retryCount)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">Edit Source URL</button>
                                    <button onClick={() => handleSubscriptionCancelClick(item.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel Subscription</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
