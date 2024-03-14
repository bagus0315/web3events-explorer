import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req:Request) {
    try {
        const result = await axios.get(`https://www.web3event.org/web3event/api/v1/index/countInfo`);
        return NextResponse.json({data: result.data.data}, {status:200});
    } catch (error: any) {
        console.error('Error fetching countInfo:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}