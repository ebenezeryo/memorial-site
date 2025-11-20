import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log to Vercel
    console.log('RSVP Received:', data);
    
    // Send to Google Sheets if URL is configured
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'rsvp' })
        });
      } catch (googleError) {
        console.error('Google Sheets error:', googleError);
        // Continue even if Google Sheets fails
      }
    }
    
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
