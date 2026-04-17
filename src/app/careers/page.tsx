'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { brandGradient } from '@/lib/styles';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary_range?: string;
  status: string;
  created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [filter, setFilter] = useState({ department: '', type: '' });

  useEffect(() => {
    loadCareers();
  }, [filter]);

  const loadCareers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: 'active' });
      if (filter.department) params.append('department', filter.department);
      if (filter.type) params.append('type', filter.type);

      const res = await fetch(`${API_BASE}/api/careers?${params}`);
      const json = await res.json();
      setCareers(json.data || []);
    } catch (error) {
      console.error('Failed to load careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [...new Set(careers.map((c) => c.department))];
  const types = [...new Set(careers.map((c) => c.type))];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              background: brandGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Join Our Team
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Help us build the future of campus events. We're looking for passionate individuals to join our mission.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto flex gap-4 flex-wrap">
          <select
            value={filter.department}
            onChange={(e) => setFilter({ ...filter, department: e.target.value })}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Careers List */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 mt-4">Loading opportunities...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No open positions at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedCareer(career)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{career.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          📍 {career.location}
                        </span>
                        <span className="flex items-center gap-1">
                          💼 {career.department}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏰ {career.type}
                        </span>
                        <span className="flex items-center gap-1">
                          📊 {career.experience_level}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="rounded-full px-6 py-2 h-auto text-sm font-semibold"
                      style={{ background: brandGradient, color: '#000' }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Career Detail Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCareer(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCareer.title}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>📍 {selectedCareer.location}</span>
                  <span>💼 {selectedCareer.department}</span>
                  <span>⏰ {selectedCareer.type}</span>
                  <span>📊 {selectedCareer.experience_level}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCareer(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
            </div>

            {selectedCareer.salary_range && (
              <div className="mb-6 p-4 bg-white/5 rounded-xl">
                <p className="text-sm text-slate-400">Salary Range</p>
                <p className="text-lg font-semibold text-white">{selectedCareer.salary_range}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">About the Role</h3>
                <p className="text-slate-300 leading-relaxed">{selectedCareer.description}</p>
              </div>

              {selectedCareer.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedCareer.responsibilities.map((item, idx) => (
                      <li key={idx} className="text-slate-300 flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedCareer.requirements.map((item, idx) => (
                      <li key={idx} className="text-slate-300 flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedCareer.benefits.map((item, idx) => (
                      <li key={idx} className="text-slate-300 flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                className="flex-1 rounded-full px-6 py-3 h-auto text-base font-semibold"
                style={{ background: brandGradient, color: '#000' }}
                onClick={() => window.location.href = `mailto:careers@unifesto.com?subject=Application for ${selectedCareer.title}`}
              >
                Apply Now
              </Button>
              <Button
                className="rounded-full px-6 py-3 h-auto text-base font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10"
                onClick={() => setSelectedCareer(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
