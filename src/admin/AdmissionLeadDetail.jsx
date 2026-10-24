import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import AdminLayout from './components/AdminLayout';

const STATUS_META = {
  new:              { label: 'New',            cls: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  contacted:        { label: 'Contacted',       cls: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  enrolled:         { label: 'Enrolled',        cls: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  'not-interested': { label: 'Not Interested',  cls: 'bg-red-100 text-red-600',      dot: 'bg-red-500' },
};

function DetailRow({ label, value, mono = false }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 py-3 border-b border-[#f1f5f9] last:border-0">
      <dt className="text-[#64748b] text-sm w-44 shrink-0">{label}</dt>
      <dd className={`text-[#1C3664] text-sm font-medium flex-1 ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  );
}

export default function AdmissionLeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState(null);
  const [lightbox, setLightbox] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admission-leads/admin/${id}`);
        setLead(data.lead);
        setStatus(data.lead.status);
        setNotes(data.lead.adminNotes || '');
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to load lead', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/admission-leads/admin/${id}`, {
        status,
        adminNotes: notes,
      });
      setLead(data.lead);
      showToast('Lead updated successfully');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete lead for "${lead?.studentName}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await api.delete(`/admission-leads/admin/${id}`);
      navigate('/dashboard/admission-leads', { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#1C3664] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-[#94a3b8] text-sm mb-3">Lead not found.</p>
          <Link to="/dashboard/admission-leads" className="text-[#ED6D23] font-medium hover:underline">
            ← Back to leads
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const sm = STATUS_META[lead.status] || STATUS_META.new;
  const isImage = lead.paymentScreenshot?.url && !lead.paymentScreenshot.url.includes('.pdf');

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
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

      {/* Lightbox */}
      {lightbox && isImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lead.paymentScreenshot.url}
            alt="Payment screenshot"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#94a3b8] mb-5">
        <Link to="/dashboard/admission-leads" className="hover:text-[#1C3664] transition-colors">
          Admission Leads
        </Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[#1C3664] font-medium truncate">{lead.studentName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Student Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h1
                  className="text-[#1C3664] text-xl font-bold"
                  style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
                >
                  {lead.studentName}
                </h1>
                <p className="text-[#64748b] text-sm mt-0.5">
                  Submitted on{' '}
                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  {' '}at{' '}
                  {new Date(lead.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${sm.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                {sm.label}
              </span>
            </div>

            <dl>
              <DetailRow label="Student Name"         value={lead.studentName} />
              <DetailRow label="Class Applying For"   value={lead.classApplying} />
              <DetailRow label="Parent / Guardian"    value={lead.parentName} />
              <DetailRow label="Mobile"               value={`+91 ${lead.mobile}`} mono />
              <DetailRow label="City"                 value={lead.city} />
              <DetailRow label="State"                value={lead.state} />
              <DetailRow label="UPI Transaction ID"   value={lead.upiTransactionId || '—'} mono />
              <DetailRow label="Source"               value={lead.source || 'direct'} />
            </dl>
          </div>

          {/* Payment Screenshot */}
          {lead.paymentScreenshot?.url ? (
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-6">
              <h2 className="text-[#1C3664] font-semibold text-base mb-4">Payment Screenshot</h2>
              {isImage ? (
                <div>
                  <img
                    src={lead.paymentScreenshot.url}
                    alt="Payment screenshot"
                    className="max-h-72 rounded-xl object-contain border border-[#e2e8f0] cursor-zoom-in hover:opacity-95 transition-opacity"
                    onClick={() => setLightbox(true)}
                  />
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => setLightbox(true)}
                      className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#1C3664] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Full view
                    </button>
                    <a
                      href={lead.paymentScreenshot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#1C3664] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in Cloudinary
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  href={lead.paymentScreenshot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] hover:bg-white transition-colors group"
                >
                  <svg className="w-8 h-8 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-[#1C3664] text-sm font-medium group-hover:underline">payment-screenshot.pdf</p>
                    <p className="text-[#94a3b8] text-xs">Click to open PDF</p>
                  </div>
                  <svg className="w-4 h-4 text-[#94a3b8] ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-6">
              <h2 className="text-[#1C3664] font-semibold text-base mb-3">Payment Screenshot</h2>
              <div className="flex items-center gap-2 text-[#94a3b8] text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                No screenshot uploaded
              </div>
            </div>
          )}
        </div>

        {/* Right: Admin Panel */}
        <div className="space-y-5">
          {/* Update Status */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5">
            <h2 className="text-[#1C3664] font-semibold text-sm uppercase tracking-wide mb-4">Update Lead</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-[#64748b] uppercase tracking-wide mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10 bg-white"
              >
                {Object.entries(STATUS_META).map(([val, { label }]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-[#64748b] uppercase tracking-wide mb-2">
                Admin Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this lead…"
                rows={5}
                className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] placeholder-[#94a3b8] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10 resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #1C3664, #2a4d8f)' }}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5">
            <h2 className="text-[#1C3664] font-semibold text-sm uppercase tracking-wide mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a
                href={`tel:+91${lead.mobile}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#1C3664] hover:bg-[#f0f4f8] transition-colors"
              >
                <svg className="w-4 h-4 text-[#ED6D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +91 {lead.mobile}
              </a>
              <a
                href={`https://wa.me/91${lead.mobile}?text=Hello%20${encodeURIComponent(lead.parentName)}%2C%20we%20received%20your%20admission%20interest%20form%20for%20${encodeURIComponent(lead.studentName)}.%20We%20will%20get%20in%20touch%20with%20you%20shortly.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#1C3664] hover:bg-[#f0f4f8] transition-colors"
              >
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Message
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
                Delete Lead
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5">
            <h2 className="text-[#1C3664] font-semibold text-sm uppercase tracking-wide mb-3">Metadata</h2>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-[#94a3b8]">Lead ID</dt>
                <dd className="text-[#1C3664] font-mono">{lead._id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#94a3b8]">Created</dt>
                <dd className="text-[#1C3664]">
                  {new Date(lead.createdAt).toLocaleString('en-IN')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#94a3b8]">Last Updated</dt>
                <dd className="text-[#1C3664]">
                  {new Date(lead.updatedAt).toLocaleString('en-IN')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#94a3b8]">Source</dt>
                <dd className="text-[#1C3664]">{lead.source || 'direct'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
