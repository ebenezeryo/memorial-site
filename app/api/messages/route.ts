import { NextResponse } from 'next/server';

// In-memory storage (resets on deployment, but good for demo)
// For production, use a database like Vercel KV, Postgres, or MongoDB
let storedMessages: Array<{ name: string; text: string; timestamp: string }> = [
  {
    name: "The Church Community",
    text: "Snr. Apostolic Mother was a pillar of faith and strength. Her dedication to the Lord and her family was unwavering. May her soul rest in perfect peace.",
    timestamp: new Date().toISOString()
  },
  {
    name: "Friends & Well-wishers",
    text: "A woman of grace, dignity, and unwavering faith. We celebrate 73 years of a life well spent. Sleep well, Mama.",
    timestamp: new Date().toISOString()
  }
];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add to stored messages
    storedMessages.unshift(data);
    
    // Log the message for admin viewing
    console.log('Farewell Message Received:', {
      name: data.name,
      message: data.text,
      timestamp: data.timestamp
    });
    
    // Send to Google Sheets if URL is configured
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, type: 'message' })
        });
      } catch (googleError) {
        console.error('Google Sheets error:', googleError);
        // Continue even if Google Sheets fails
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message posted successfully',
      data 
    });
  } catch (error) {
    console.error('Message Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to post message' 
    }, { status: 500 });
  }
}

export async function GET() {
  // Return all stored messages
  return NextResponse.json({ 
    success: true,
    messages: storedMessages 
  });
}
