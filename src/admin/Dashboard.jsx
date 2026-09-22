import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import AdminLayout from './components/AdminLayout';
import { cldUrl } from '../lib/cloudinary';

const STATUS_COLORS = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
};

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-[#e2e8f0]">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-[#64748b] text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-[#1C3664] text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const { data } = await api.get(`/blogs/admin/all?${params}`);
      setBlogs(data.blogs);
      setPagination(data.pagination);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load blogs', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/blogs/${id}`);
      showToast('Blog deleted');
      fetchBlogs();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (id) => {
    setToggling(id);
    try {
      const { data } = await api.patch(`/blogs/${id}/toggle-status`);
      setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, status: data.blog.status } : b)));
      showToast(`Blog ${data.blog.status === 'published' ? 'published' : 'set to draft'}`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Toggle failed', 'error');
    } finally {
      setToggling(null);
    }
  };

  const totalPublished = blogs.filter((b) => b.status === 'published').length;
  const totalDraft = blogs.filter((b) => b.status === 'draft').length;

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
          <h1 className="text-[#1C3664] text-2xl font-bold" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
            Blog Dashboard
          </h1>
          <p className="text-[#64748b] text-sm mt-0.5">Manage all your blog posts</p>
        </div>
        <Link
          to="/dashboard/blogs/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #ED6D23, #f5883f)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Blog Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Posts"
          value={pagination.total ?? blogs.length}
          color="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-[#1C3664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          }
        />
        <StatCard
          label="Published"
          value={totalPublished}
          color="bg-green-100"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Drafts"
          value={totalDraft}
          color="bg-yellow-100"
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          }
        />
        <StatCard
          label="Pages"
          value={pagination.pages ?? 1}
          color="bg-orange-100"
          icon={
            <svg className="w-6 h-6 text-[#ED6D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm mb-4 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search blogs…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] placeholder-[#94a3b8] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] focus:outline-none focus:border-[#1C3664] bg-white"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button
          onClick={() => {
            setSearch('');
            setStatusFilter('');
            setPage(1);
          }}
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
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center">
            <svg
              className="w-12 h-12 text-[#cbd5e1] mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-[#94a3b8] text-sm">No blog posts found</p>
            <Link
              to="/dashboard/blogs/new"
              className="text-[#ED6D23] text-sm font-medium mt-2 inline-block hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Post
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#f8fafc] transition-colors group">
                    {/* Post info */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        {blog.coverImage?.url ? (
                          <img
                            src={cldUrl(blog.coverImage.url, { w: 80, h: 80 })}
                            alt={blog.coverImage.altText || blog.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#e2e8f0]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
                            <svg
                              className="w-5 h-5 text-[#cbd5e1]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-[#1C3664] text-sm font-semibold truncate max-w-[200px]">{blog.title}</p>
                          <p className="text-[#94a3b8] text-xs truncate max-w-[200px]">/blogs/{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    {/* Status toggle */}
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <button
                        onClick={() => handleToggleStatus(blog._id)}
                        disabled={toggling === blog._id}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-all disabled:opacity-60 ${STATUS_COLORS[blog.status]}`}
                      >
                        {toggling === blog._id ? '…' : blog.status}
                      </button>
                    </td>
                    {/* Date */}
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-[#94a3b8]">
                        {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        {blog.status === 'published' && (
                          <a
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#1C3664] hover:bg-[#f1f5f9] transition-all"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </a>
                        )}
                        <Link
                          to={`/dashboard/blogs/edit/${blog._id}`}
                          className="p-1.5 rounded-lg text-[#64748b] hover:text-[#1C3664] hover:bg-[#f1f5f9] transition-all"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          disabled={deleting === blog._id}
                          className="p-1.5 rounded-lg text-[#64748b] hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === blog._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
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
              Page {pagination.page} of {pagination.pages} — {pagination.total} posts
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrev}
                className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1C3664] disabled:opacity-40 hover:bg-white transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
