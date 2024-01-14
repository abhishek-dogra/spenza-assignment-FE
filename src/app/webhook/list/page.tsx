"use client";

import {useState} from "react";
import SubscribeFormButton from "@/components/SubscribeFormButton";
import SubscribedList from "@/components/SubscribedList";

export default function Page() {

    return (
        <div className="flex">
            <SubscribedList/>
            <div className="w-1/3">
                <div className="p-4">
                    <SubscribeFormButton />
                </div>
            </div>
        </div>
    );



}

