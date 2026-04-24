// ── ShopAll Chatbot Widget ──
// Currently runs in DEMO mode (no backend).
// When Python backend is ready, flip DEMO_MODE to false.

const DEMO_MODE = false;
const API_URL   = 'http://127.0.0.1:5000/chat';

const toggle    = document.getElementById('chat-toggle');
const modal     = document.getElementById('chat-modal');
const messages  = document.getElementById('chat-messages');
const input     = document.getElementById('chat-input');
const sendBtn   = document.getElementById('chat-send');
const iconChat  = document.getElementById('icon-chat');
const iconClose = document.getElementById('icon-close');

let isOpen = false;
let greeted = false;

// ── Toggle modal open/close ──
toggle.addEventListener('click', () => {
  isOpen = !isOpen;
  modal.classList.toggle('open', isOpen);
  iconChat.style.display  = isOpen ? 'none'  : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';

  if (isOpen && !greeted) {
    setTimeout(() => botSay("👋 Hi! I'm the ShopAll assistant. Ask me anything about our products, pricing, store hours, returns, or how to place an order."), 300);
    greeted = true;
  }

  if (isOpen) input.focus();
});

// ── Append a message bubble ──
function appendMsg(text, role) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function botSay(text) { appendMsg(text, 'bot'); }
function userSay(text) { appendMsg(text, 'user'); }

// ── Typing indicator ──
function showTyping() {
  const el = document.createElement('div');
  el.className = 'typing-indicator';
  el.id = 'typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

// ── Demo responses (used when DEMO_MODE = true) ──
const demoRules = [
    {
    patterns: ['your name'],
    response: "My name is Demark bot, nice to meet you."
  },
  {
    patterns: ['hour', 'open', 'close', 'time', 'when'],
    response: "We're open Monday–Saturday, 8am–8pm, and Sunday 10am–6pm (WAT)."
  },
  {
    patterns: ['location', 'address', 'where', 'find you', 'store'],
    response: "ShopAll is located at 14 Commerce Road, Ikeja, Lagos. We also deliver nationwide."
  },
  {
    patterns: ['return', 'refund', 'exchange', 'send back'],
    response: "You can return any item within 7 days of delivery for a full refund, as long as it's unused and in original packaging. Visit our Returns page to start a request."
  },
  {
    patterns: ['order', 'buy', 'purchase', 'how to'],
    response: "To place an order: browse our products, click the one you want, and follow the checkout steps. We accept bank transfer, card, and cash on delivery."
  },
  {
    patterns: ['price', 'cost', 'how much', 'expensive', 'cheap', 'afford'],
    response: "Our prices are shown on each product card in Nigerian Naira (₦). We run weekly deals — keep an eye on the homepage for discounts."
  },
  {
    patterns: ['electronic', 'gadget', 'phone', 'laptop', 'keyboard', 'mouse', 'headphone'],
    response: "We stock a wide range of electronics — headphones, keyboards, mice, lamps, and power banks. Check the Electronics category for the full list."
  },
  {
    patterns: ['fashion', 'cloth', 'shirt', 'dress', 'shoe', 'bag', 'sunglass'],
    response: "Our Fashion section has shirts, dresses, sneakers, leather bags, and sunglasses. Sizes and colour options are listed on each product."
  },
  {
    patterns: ['food', 'eat', 'snack', 'honey', 'nut'],
    response: "We carry a small selection of quality food items including organic honey and mixed nut gift boxes."
  },
  {
    patterns: ['deliver', 'ship', 'shipping', 'days'],
    response: "We deliver nationwide in Nigeria. Lagos orders arrive in 1–2 days; other states take 3–5 business days. Delivery fees vary by location."
  },
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'],
    response: "Hello! How can I help you today? You can ask about products, pricing, orders, returns, or our store location."
  },
  {
    patterns: ['thank', 'thanks', 'appreciate'],
    response: "You're welcome! Is there anything else I can help you with?"
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later'],
    response: "Goodbye! Feel free to come back anytime. Happy shopping! 🛍️"
  },
  {
    patterns: ['complain', 'issue', 'problem', 'wrong', 'damaged', 'broken', 'not working'],
    response: "I'm sorry to hear that. For unresolved issues, please reach our live support team directly — click the 'Live Chat' link in the footer and an agent will assist you right away."
  },
];

function demoRespond(text) {
  const lower = text.toLowerCase();
  for (const rule of demoRules) {
    if (rule.patterns.some(p => lower.includes(p))) {
      return rule.response;
    }
  }
  return "I'm not sure about that one. For further assistance, you can reach our live support team via the Live Chat link in the footer. They'll be happy to help!";
}

// ── Send message ──
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  userSay(text);
  input.value = '';
  showTyping();

  if (DEMO_MODE) {
    setTimeout(() => {
      hideTyping();
      botSay(demoRespond(text));
    }, 800);
    return;
  }

  // ── Live mode: call Python backend ──
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    hideTyping();
    botSay(data.response || "Sorry, I didn't get a response. Try again.");
  } catch {
    hideTyping();
    botSay("I'm having trouble connecting right now. Please try again shortly.");
  }
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
