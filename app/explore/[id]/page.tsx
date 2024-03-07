import React from "react";
import { getWeb3eventDetail } from "@/app/api/fetchdata";
import { Web3eventDetail } from "@/app/components/web3eventType";
import { Navigation } from "@/app/components/nav";
import { EventDetailPage } from "./eventDetailPage";

interface PageProps {
    params: {
        id: number;
    };
}

 const Page: React.FC<PageProps> = async ({ params }) => {

    const { id } = params;
    const web3eventDetail: Web3eventDetail = await getWeb3eventDetail(id);

    return (
        <div>
            <Navigation/>
            <EventDetailPage web3eventDetail={ web3eventDetail }/>
        </div>
    );
}

export default Page;
