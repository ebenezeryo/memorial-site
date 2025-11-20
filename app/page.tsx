'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; author: string }>>([]);
  const scrollContainerRef = useState<HTMLDivElement | null>(null)[0];

  // Load messages on page load
  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.messages) {
          setMessages(data.messages.map((m: { text: string; name: string }) => ({ text: m.text, author: m.name })));
        }
      })
      .catch(err => console.error('Failed to load messages:', err));
  }, []);

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const relationship = formData.get('relationship');
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, relationship, timestamp: new Date().toISOString() })
      });
      
      if (response.ok) {
        setRsvpMessage(`Thank you, ${name}. Your RSVP has been received. We look forward to seeing you.`);
        form.reset();
        setTimeout(() => setRsvpMessage(''), 5000);
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      setRsvpMessage('There was an error submitting your RSVP. Please try again.');
    }
  };

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('messageName') as string;
    const text = formData.get('messageText') as string;
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text, timestamp: new Date().toISOString() })
      });
      
      if (response.ok) {
        setMessages([{ text, author: name }, ...messages]);
        setMessageStatus('Your message has been posted. Thank you for your kind words.');
        form.reset();
        setTimeout(() => setMessageStatus(''), 5000);
      }
    } catch (error) {
      console.error('Message submission error:', error);
      setMessageStatus('There was an error posting your message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl">
        <header className="bg-gradient-to-br from-gray-700 to-gray-600 text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-yellow-600/10 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="text-6xl mb-6 animate-bounce flex justify-center md:justify-start">🕊️</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">Celebration of a Life Well Spent</h1>
                <h2 className="text-3xl md:text-4xl font-light mb-2">Snr. Apostolic Mother Florence Modupe Akintunde</h2>
                <p className="text-xl italic mb-6 opacity-90">(née Oyeleye)</p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto md:mx-0 mb-6"></div>
                <p className="text-lg italic opacity-95">Aged 73 Years | Slept in the Lord on 29th August, 2025</p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-lg transform rotate-3"></div>
                  <img 
                    src="/mama akin3.jpg" 
                    alt="Snr. Apostolic Mother Florence Modupe Akintunde" 
                    className="relative rounded-lg shadow-2xl w-full border-4 border-yellow-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Photo Gallery - Auto Scrolling */}
        <section className="py-12 px-6 bg-white overflow-hidden">
          <div className="max-w-full mx-auto">
            <h3 className="text-3xl font-bold text-center text-yellow-600 mb-8">Cherished Memories</h3>
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('photo-scroll');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-yellow-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Right Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('photo-scroll');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-yellow-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div id="photo-scroll" className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'thin' }}>
                <img src="/mama akin1.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/mama akin2.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/mama_akin.png" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0010.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0011.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0012.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0013.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0014.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0015.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0016.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0017.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0018.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0019.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0020.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0021.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0022.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0023.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0024.JPG" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0013.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0014.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0015.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0016.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0017.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0018.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0019.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0020.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0021.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0022.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0023.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0024.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0025.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0026.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0027.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0028.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0029.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0030.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0031.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0032.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0033.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0036.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0037.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0038.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0039.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
                <img src="/IMG-20251118-WA0040.jpg" alt="Memory" className="h-80 w-auto rounded-lg shadow-lg border-2 border-yellow-500" />
              </div>
            </div>
            <p className="mt-8 text-center text-gray-600 italic text-lg">
              &quot;A life of faith, grace, and unwavering love&quot;
            </p>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 bg-gray-50">
          <h3 className="text-4xl font-bold text-center text-yellow-600 mb-3">Obsequies</h3>
          <p className="text-center text-gray-700 font-semibold mb-12">The family of AKINTUNDE cordially invites you</p>
          
          <div className="space-y-8">
            <div className="bg-white border-l-4 border-yellow-500 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🕯️</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Wake Service / Service of Songs</h4>
              <div className="space-y-2 text-gray-600">
                <p><strong className="text-gray-800">Date:</strong> 16th December, 2025</p>
                <p><strong className="text-gray-800">Time:</strong> 4pm</p>
                <p><strong className="text-gray-800">Venue:</strong> 90 Idimu Road, Ejigbo, Lagos</p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-yellow-500 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⛪</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Interment</h4>
              <div className="space-y-2 text-gray-600">
                <p><strong className="text-gray-800">Date:</strong> 17th December, 2025</p>
                <p><strong className="text-gray-800">Time:</strong> 12noon</p>
                <p><strong className="text-gray-800">Venue:</strong> Oja Oba, off Anaye Street, Stardom, Ipetu Ijesa, Osun State</p>
                <p className="italic text-gray-500 mt-3">At her residence</p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-yellow-500 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🙏</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Thanksgiving Service</h4>
              <div className="space-y-2 text-gray-600">
                <p><strong className="text-gray-800">Date:</strong> 19th December, 2025</p>
                <p><strong className="text-gray-800">Time:</strong> 10am</p>
                <p><strong className="text-gray-800">Venue:</strong> The Light Everlasting Church, Cherubim & Seraphim (Mt Zion), 1 Alade Street Oshodi</p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-yellow-500 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌸</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Entertainment of Guests</h4>
              <div className="space-y-2 text-gray-600">
                <p><strong className="text-gray-800">Date:</strong> 19th December, 2025</p>
                <p><strong className="text-gray-800">Time:</strong> 1pm</p>
                <p><strong className="text-gray-800">Venue:</strong> Nikoms Events Centre, 1 Taylor Drive, off Edmund Crescent, behind The Presbyterian Church, Yaba, Lagos</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 bg-white">
          <h3 className="text-4xl font-bold text-center text-yellow-600 mb-3">RSVP</h3>
          <p className="text-center text-gray-600 mb-12">Please contact: Mr Sanmi Makinde - 09155130779 | Pst. Gbenga - 08134239523</p>
          
          <form onSubmit={handleRSVP} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-gray-800 font-bold mb-2">Full Name *</label>
              <input type="text" name="name" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-800 font-bold mb-2">Phone Number *</label>
              <input type="tel" name="phone" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-800 font-bold mb-2">Email Address *</label>
              <input type="email" name="email" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-800 font-bold mb-2">Relationship to Family *</label>
              <input type="text" name="relationship" placeholder="e.g., Friend, Colleague, Family" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400" />
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-500 font-bold text-lg rounded-lg hover:shadow-lg transition-all">
              Submit RSVP
            </button>
          </form>
          
          {rsvpMessage && (
            <div className="mt-6 max-w-2xl mx-auto p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
              {rsvpMessage}
            </div>
          )}
        </section>

        <section className="py-16 px-6 md:px-12 bg-gray-50">
          <h3 className="text-4xl font-bold text-center text-yellow-600 mb-3">Farewell Messages</h3>
          <p className="text-center text-gray-600 mb-12">Share your tributes, prayers, and memories</p>
          
          <form onSubmit={handleMessage} className="max-w-2xl mx-auto space-y-6 mb-12">
            <div>
              <label className="block text-gray-800 font-bold mb-2">Your Name *</label>
              <input type="text" name="messageName" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-800 font-bold mb-2">Your Message *</label>
              <textarea name="messageText" rows={4} placeholder="Share your memories, prayers, or tributes..." required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-gray-800 placeholder:text-gray-400"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-500 font-bold text-lg rounded-lg hover:shadow-lg transition-all">
              Post Message
            </button>
          </form>

          {messageStatus && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
              {messageStatus}
            </div>
          )}

          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-white p-6 border-l-4 border-pink-500 shadow-md">
                <p className="text-gray-600 italic mb-3 leading-relaxed">&quot;{msg.text}&quot;</p>
                <p className="text-gray-800 font-bold text-right">- {msg.author}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-gradient-to-br from-gray-700 to-gray-600 text-yellow-500 text-center py-12 px-6">
          <div className="text-5xl mb-4">🕊️</div>
          <p className="text-white mb-2">Forever in our hearts</p>
          <p className="text-2xl font-bold mb-2">Snr. Apostolic Mother Florence Modupe Akintunde</p>
          <p className="text-white text-sm">Aged 73 Years</p>
        </footer>
      </div>
    </div>
  );
}