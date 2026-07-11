import { useState } from 'react';
import { useRouter } from 'next/router';
import { api, setToken } from '@/lib/api';

export default function LandingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login' ? { email, password } : { email, password, name };
      const data = await api<{ accessToken: string }>(path, { method: 'POST', body });
      setToken(data.accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>MLINO</h1>
      <p>یک پارتنر تجاری هوش مصنوعی — نه یک چت‌بات، نه یک ERP.</p>

      <div className="card">
        <div className="row" style={{ marginBottom: 16 }}>
          <button onClick={() => setMode('login')} disabled={mode === 'login'}>
            ورود
          </button>
          <button onClick={() => setMode('register')} disabled={mode === 'register'}>
            ثبت‌نام
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <input
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? '...' : mode === 'login' ? 'ورود' : 'ساخت حساب'}
          </button>
        </form>
      </div>
    </div>
  );
}
