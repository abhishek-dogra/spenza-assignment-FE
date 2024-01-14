"use client";

import {useState} from "react";
import SubscribeFormButton from "@/components/SubscribeFormButton";
import SubscribedList from "@/components/SubscribedList";

export default function Page() {

    const [webhookListKey, setWebhookListKey] = useState(0);

    const handleFormSubmit = () => {
        setWebhookListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="flex">
            <div className="w-2/3">
                <SubscribedList key={webhookListKey}/>
            </div>
            <div className="w-1/3">
                <div className="p-4">
                    <SubscribeFormButton onFormSubmit={handleFormSubmit}/>
                </div>
            </div>
        </div>
    );
}

