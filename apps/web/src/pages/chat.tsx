import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api';

type Message = { id: string; role: 'user' | 'assistant'; content: string };
type Conversation = { id: string; title: string };

export default function ChatPage() {
  const router = useRouter();
  const { org, partner } = router.query as { org?: string; partner?: string };
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.localStorage.getItem('mlino_token')) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (org && partner) loadConversations();
  }, [org, partner]);

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [messages]);

  async function loadConversations() {
    try {
      const data = await api<Conversation[]>(
        `/conversations?organizationId=${org}&partnerId=${partner}`,
      );
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  async function openConversation(id: string) {
    try {
      const data = await api<{ messages: Message[] }>(
        `/conversations/${id}?organizationId=${org}`,
      );
      setConversationId(id);
      setMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  function startNewConversation() {
    setConversationId(undefined);
    setMessages([]);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !org || !partner) return;
    setError('');
    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { id: `tmp-${Date.now()}`, role: 'user', content: userText }]);
    setLoading(true);
    try {
      const data = await api<{ conversationId: string; reply: string }>('/chat', {
        method: 'POST',
        body: { organizationId: org, partnerId: partner, conversationId, message: userText },
      });
      setConversationId(data.conversationId);
      setMessages((prev) => [
        ...prev,
        { id: `tmp-a-${Date.now()}`, role: 'assistant', content: data.reply },
      ]);
      loadConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>گفتگو</h1>
        <button onClick={() => router.push('/dashboard')}>بازگشت</button>
      </div>
      {error && <div className="error">{error}</div>}

      <div className="card">
        <div className="row" style={{ marginBottom: 12 }}>
          <button onClick={startNewConversation}>+ مکالمه جدید</button>
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => openConversation(c.id)}
              style={{ background: conversationId === c.id ? '#4f7cff' : '#1a1d24' }}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="chat-log" ref={logRef}>
          {messages.map((m) => (
            <div key={m.id} className={m.role === 'user' ? 'msg-user' : 'msg-assistant'}>
              {m.content}
            </div>
          ))}
          {loading && <div className="msg-assistant">در حال فکر کردن...</div>}
        </div>

        <form onSubmit={send} className="row">
          <input
            placeholder="پیام خود را بنویسید..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}
