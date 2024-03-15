import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const result = await axios.get(`https://www.web3event.org/web3event/api/v3/event/detail/${id}`)
        return NextResponse.json({data: result.data.data}, {status: 200})
    } catch (error: any) {
        console.error('Error fetching web3event detail:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })        
    }
}
