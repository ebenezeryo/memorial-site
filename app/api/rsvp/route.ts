import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Send email notification using a service
    // For now, we'll just log it and return success
    console.log('RSVP Received:', data);
    
    // You can integrate with email services like:
    // - Resend (https://resend.com)
    // - SendGrid
    // - Nodemailer
    
    // For now, return the data so you can see it in Vercel logs
    return NextResponse.json({ 
      success: true, 
      message: 'RSVP received successfully',
      data 
    });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process RSVP' 
    }, { status: 500 });
  }
}
