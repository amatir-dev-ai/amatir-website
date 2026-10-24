import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import AdminLayout from './components/AdminLayout';

const STATUS_META = {
  new:             { label: 'New',            cls: 'bg-blue-100 text-blue-700' },
  contacted:       { label: 'Contacted',       cls: 'bg-yellow-100 text-yellow-700' },
  enrolled:        { label: 'Enrolled',        cls: 'bg-green-100 text-green-700' },
  'not-interested':{ label: 'Not Interested',  cls: 'bg-red-100 text-red-600' },
};

function StatCard({ label, value, color, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-[#e2e8f0]">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-[#64748b] text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-[#1C3664] text-2xl font-bold">{value ?? '—'}</p>
      </div>
    </div>
  );
}

export default function AdmissionLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admission-leads/admin/stats');
      setStats(data.stats);
    } catch (_) {}
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search)       params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (classFilter)  params.set('classApplying', classFilter);
      const { data } = await api.get(`/admission-leads/admin?${params}`);
      setLeads(data.leads);
      setPagination(data.pagination);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load leads', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, classFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete lead for "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/admission-leads/admin/${id}`);
      showToast('Lead deleted');
      fetchLeads();
      fetchStats();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admission-leads/admin/${id}`, { status: newStatus });
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)));
      showToast('Status updated');
      fetchStats();
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setClassFilter('');
    setPage(1);
  };

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 transition-all ${
            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          {toast.type === 'error' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-[#1C3664] text-2xl font-bold"
            style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
          >
            Admission Interested Leads
          </h1>
          <p className="text-[#64748b] text-sm mt-0.5">
            Students &amp; parents who submitted the admission interest form
          </p>
        </div>
        <a
          href="/interest-form"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#e2e8f0] text-[#64748b] hover:text-[#1C3664] hover:border-[#1C3664] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Form
        </a>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Leads"
            value={stats.total}
            color="bg-blue-100"
            icon={
              <svg className="w-6 h-6 text-[#1C3664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <StatCard
            label="New"
            value={stats.new}
            color="bg-blue-50"
            icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            color="bg-yellow-100"
            icon={
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          />
          <StatCard
            label="Enrolled"
            value={stats.enrolled}
            color="bg-green-100"
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm mb-4 p-4 flex flex-wrap gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search name, mobile, city, class…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] placeholder-[#94a3b8] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] focus:outline-none focus:border-[#1C3664] bg-white"
        >
          <option value="">All Status</option>
          {Object.entries(STATUS_META).map(([val, { label }]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1C3664] border border-[#e2e8f0] rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#1C3664] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center">
            <svg className="w-12 h-12 text-[#cbd5e1] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[#94a3b8] text-sm">No leads found</p>
            {(search || statusFilter || classFilter) && (
              <button onClick={clearFilters} className="text-[#ED6D23] text-sm font-medium mt-2 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                  {['Student', 'Parent / Mobile', 'Class', 'City / State', 'Status', 'Submitted', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-[#f8fafc] transition-colors"
                  >
                    {/* Student */}
                    <td className="px-4 py-3.5 min-w-[140px]">
                      <p className="text-[#1C3664] text-sm font-semibold">{lead.studentName}</p>
                    </td>

                    {/* Parent / Mobile */}
                    <td className="px-4 py-3.5 min-w-[160px]">
                      <p className="text-[#1C3664] text-sm">{lead.parentName}</p>
                      <p className="text-[#64748b] text-xs mt-0.5">+91 {lead.mobile}</p>
                    </td>

                    {/* Class */}
                    <td className="px-4 py-3.5 min-w-[110px]">
                      <span className="text-xs bg-[#f0f4f8] text-[#1C3664] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {lead.classApplying}
                      </span>
                    </td>

                    {/* City / State */}
                    <td className="px-4 py-3.5 min-w-[130px]">
                      <p className="text-sm text-[#1C3664]">{lead.city}</p>
                      <p className="text-xs text-[#64748b]">{lead.state}</p>
                    </td>

                    {/* Status — inline dropdown */}
                    <td className="px-4 py-3.5 min-w-[140px]">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1C3664]/20 ${STATUS_META[lead.status]?.cls || 'bg-gray-100 text-gray-700'}`}
                      >
                        {Object.entries(STATUS_META).map(([val, { label }]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 min-w-[100px]">
                      <span className="text-xs text-[#94a3b8] whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        {/* View detail */}
                        <button
                          onClick={() => navigate(`/dashboard/admission-leads/${lead._id}`)}
                          className="p-1.5 rounded-lg text-[#64748b] hover:text-[#1C3664] hover:bg-[#f1f5f9] transition-all"
                          title="View detail"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(lead._id, lead.studentName)}
                          disabled={deleting === lead._id}
                          className="p-1.5 rounded-lg text-[#64748b] hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === lead._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e8f0] bg-[#f8fafc]">
            <p className="text-xs text-[#64748b]">
              Page {pagination.page} of {pagination.pages} — {pagination.total} leads
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(1)}
                disabled={!pagination.hasPrev}
                className="px-2 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                «
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrev}
                className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                ← Prev
              </button>
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(page - 2, pagination.pages - 4));
                const p = startPage + i;
                if (p < 1 || p > pagination.pages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-xs border rounded-lg transition-colors ${
                      p === page
                        ? 'bg-[#1C3664] text-white border-[#1C3664]'
                        : 'border-[#e2e8f0] text-[#1C3664] hover:bg-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                Next →
              </button>
              <button
                onClick={() => setPage(pagination.pages)}
                disabled={!pagination.hasNext}
                className="px-2 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
