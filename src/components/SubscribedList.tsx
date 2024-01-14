"use client";
import React, {useState, useEffect, FormEvent} from 'react';
import {FetchSubscribedWebhookList, UpdateWebhookMapping} from "@/common/userAxiosWrapper";
import {UserWebhookMapping} from "@/Interfaces/UserWebhookMapping";
import {useRouter} from "next/navigation";
export default function SubscribedList() {
    const router = useRouter();
    const [list,setList] = useState<UserWebhookMapping[]>([]);
    const [editMode, setEditMode] = useState<string | null>(null);

    async function fetchWebhookList() {
        const response = await FetchSubscribedWebhookList();
        if(response.status==401){
            localStorage.clear();
            router.push('/login');
        }
        let webhooksList:UserWebhookMapping[] = [];
        if(response.data?.data!=null){
            webhooksList = response.data.data;
        }
        setList(webhooksList);
    }

    useEffect(() => {
        fetchWebhookList();
    }, []);
    const handleEditClick = (itemId: string,sourceUrls:string[]) => {
        setEditMode(itemId);
    };

    const handleCancelClick = () => {
        setEditMode(null);
    };

    const handleSubscriptionEditFormSubmit = async (itemId: string, updatedSourceUrls: string[]) => {
        await UpdateWebhookMapping(itemId,updatedSourceUrls,null);
        setEditMode(null);
        await fetchWebhookList();
    };

    const handleSubscriptionCancelClick = async (itemId: string, sourceUrls: string[]) => {
        await UpdateWebhookMapping(itemId, sourceUrls, true);
        setEditMode(null);
        await fetchWebhookList();
    };

    useEffect(() => {
        fetchWebhookList();
    }, []);

    return (
        <div className="flex-1 pr-8">
            <div className="bg-white p-3 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Subscribed Webhooks</h2>
                    {list.map((item) => (
                        <div key={item.webhook.name} className="mb-4 p-4 border rounded-md flex justify-between items-center">
                            {editMode === item.id ? (
                                <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();
                                    const updatedSourceUrls = Array.from(e.target.elements).filter((el) => {
                                        return el.type === "text"
                                    }).map(e => e.value);
                                    await handleSubscriptionEditFormSubmit(editMode, updatedSourceUrls);
                                }}>
                                    {item.sourceUrl.map((sourceUrl, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            defaultValue={sourceUrl}
                                            className="mr-2"
                                        />
                                    ))}
                                    <button type="submit" className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md">Submit</button>
                                    <button type="button" onClick={handleCancelClick} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
                                </form>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold">{item.webhook.name}</h3>
                                    <p>{item.sourceUrl.join(', ')}</p>
                                    <button onClick={() => handleEditClick(item.id, item.sourceUrl)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">Edit Source URL</button>
                                    <button onClick={() => handleSubscriptionCancelClick(item.id,item.sourceUrl)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel Subscription</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
