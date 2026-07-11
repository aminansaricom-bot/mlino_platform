import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api, clearToken } from '@/lib/api';

type Organization = { id: string; name: string };
type Partner = { id: string; name: string };

export default function Dashboard() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [orgName, setOrgName] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.localStorage.getItem('mlino_token')) {
      router.push('/');
      return;
    }
    loadOrgs();
  }, []);

  async function loadOrgs() {
    try {
      const data = await api<Organization[]>('/organizations');
      setOrgs(data);
      if (data.length && !selectedOrg) setSelectedOrg(data[0].id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  useEffect(() => {
    if (selectedOrg) loadPartners(selectedOrg);
  }, [selectedOrg]);

  async function loadPartners(orgId: string) {
    try {
      const data = await api<Partner[]>(`/partners?organizationId=${orgId}`);
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  async function createOrg(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const org = await api<Organization>('/organizations', { method: 'POST', body: { name: orgName } });
      setOrgName('');
      await loadOrgs();
      setSelectedOrg(org.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  async function createPartner(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await api('/partners', {
        method: 'POST',
        body: { organizationId: selectedOrg, name: partnerName },
      });
      setPartnerName('');
      await loadPartners(selectedOrg);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    }
  }

  function logout() {
    clearToken();
    router.push('/');
  }

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
        <h1>داشبورد</h1>
        <button onClick={logout}>خروج</button>
      </div>
      {error && <div className="error">{error}</div>}

      <div className="card">
        <h3>سازمان‌ها</h3>
        {orgs.map((o) => (
          <div key={o.id} className="row" style={{ marginBottom: 8 }}>
            <button
              onClick={() => setSelectedOrg(o.id)}
              style={{ background: selectedOrg === o.id ? '#4f7cff' : '#1a1d24' }}
            >
              {o.name}
            </button>
          </div>
        ))}
        <form onSubmit={createOrg} className="row">
          <input
            placeholder="نام سازمان جدید"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
          <button type="submit">ایجاد</button>
        </form>
      </div>

      {selectedOrg && (
        <div className="card">
          <h3>پارتنرهای هوش مصنوعی</h3>
          {partners.map((p) => (
            <div key={p.id} className="row" style={{ marginBottom: 8 }}>
              <span style={{ flex: 2 }}>{p.name}</span>
              <button onClick={() => router.push(`/chat?org=${selectedOrg}&partner=${p.id}`)}>
                گفتگو
              </button>
            </div>
          ))}
          <form onSubmit={createPartner} className="row">
            <input
              placeholder="نام پارتنر (مثلاً: پارتنر فروش)"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              required
            />
            <button type="submit">ایجاد</button>
          </form>
        </div>
      )}
    </div>
  );
}
