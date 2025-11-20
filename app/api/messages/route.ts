import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the message
    console.log('Message Received:', data);
    
    // You can integrate with email services or database here
    
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
  // Return stored messages
  // For now, return empty array
  return NextResponse.json({ messages: [] });
}
