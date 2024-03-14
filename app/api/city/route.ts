import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const result = await axios.get(`https://www.web3event.org/web3event/api/v1/city/${id}`)
        return NextResponse.json({data: result.data.data}, {status: 200})
    } catch (error: any) {
        console.error('Error popular cities data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })        
    }
}

export async function POST(req: Request) {

    const data = await req.json();
  
    try {
      const result = await axios.post(
        `https://www.web3event.org/web3event/api/v2/city/events`,
        data
      )
      return NextResponse.json({ data: result.data.data.list }, { status: 200 })
  
    } catch (error: any) {
      console.error('Error fetching city event data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 })
    };
    
}