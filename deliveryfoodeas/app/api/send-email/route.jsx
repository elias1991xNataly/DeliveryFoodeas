import { NextResponse } from "next/server";
import {Resend} from "resend";

const resend= new Resend(process.env.RESEND_API_KEY)
export async function POST(req) {

    const response = await req.json();
    try {
        return NextResponse.json({})
    } catch (error) {
        return NextResponse.json({ error })
    }
}