import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {

  const data = await req.json();

  try {
    const result = await axios.post(
      `https://www.web3event.org/web3event/api/v2/map/events/query`,
      data
    )
    return NextResponse.json({ data: result.data.data }, { status: 200 })

    // return res.status(200).json({data: result.data.data});
  } catch (error: any) {
    console.error('Error fetching web3event data:', error);
  return NextResponse.json({ error: error.message }, { status: 500 })
  };
  
}