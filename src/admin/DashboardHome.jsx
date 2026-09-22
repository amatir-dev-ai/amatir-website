import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import AdminLayout from './components/AdminLayout';
import { useAuth } from './AuthContext';

function StatCard({ label, value, icon, color, to }) {
  const inner = (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-[#64748b] text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-[#1C3664] text-2xl font-bold">{value ?? '—'}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

function QuickAction({ to, icon, label, description, accent }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-[#e2e8f0] p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
        style={{ background: accent + '1a' }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <p className="text-[#1C3664] text-sm font-semibold">{label}</p>
        <p className="text-[#64748b] text-xs mt-0.5 leading-relaxed">{description}</p>
      </div>
      <svg
        className="w-4 h-4 text-[#94a3b8] ml-auto mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function RecentBlogRow({ blog }) {
  const STATUS_COLORS = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#f1f5f9] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center shrink-0 overflow-hidden">
        {blog.coverImage?.url ? (
          <img src={blog.coverImage.url} alt={blog.coverImage.altText || ''} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#1C3664] text-sm font-medium truncate">{blog.title}</p>
        <p className="text-[#94a3b8] text-xs mt-0.5">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : ''}
        </p>
      </div>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${STATUS_COLORS[blog.status] ?? 'bg-gray-100 text-gray-600'}`}
      >
        {blog.status}
      </span>
      <Link
        to={`/dashboard/blogs/edit/${blog._id}`}
        className="shrink-0 p-1.5 rounded-lg text-[#64748b] hover:text-[#1C3664] hover:bg-[#f0f4f8] transition-colors"
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
    </div>
  );
}

export default function DashboardHome() {
  const { admin } = useAuth();
  const [stats, setStats] = useState({ total: null, published: null, draft: null });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get('/blogs/admin/all?page=1&limit=5');
        const blogs = data.blogs ?? [];
        setRecentBlogs(blogs);
        setStats({
          total: data.pagination?.total ?? blogs.length,
          published: blogs.filter((b) => b.status === 'published').length,
          draft: blogs.filter((b) => b.status === 'draft').length,
        });
      } catch {
        // silently fail — stats just show —
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <AdminLayout>
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #0E2349 0%, #1C3664 60%, #24407a 100%)' }}
      >
        <div>
          <p className="text-white/60 text-sm mb-1">{greeting},</p>
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
            {admin?.username ?? 'Admin'} 👋
          </h1>
          <p className="text-white/50 text-sm mt-1">Here's what's happening on your website today.</p>
        </div>
        <Link
          to="/dashboard/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 self-start sm:self-center"
          style={{ background: 'linear-gradient(135deg, #ED6D23, #f5883f)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Blog Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Posts"
          value={loading ? '…' : stats.total}
          to="/dashboard/blogs"
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
          value={loading ? '…' : stats.published}
          to="/dashboard/blogs?status=published"
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
          value={loading ? '…' : stats.draft}
          to="/dashboard/blogs?status=draft"
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#1C3664] text-base font-bold" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
              Recent Posts
            </h2>
            <Link to="/dashboard/blogs" className="text-[#ED6D23] text-xs font-semibold hover:underline">
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="py-8 flex items-center justify-center">
              <div className="w-7 h-7 border-4 border-[#1C3664] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentBlogs.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[#94a3b8] text-sm">No blog posts yet.</p>
              <Link
                to="/dashboard/blogs/new"
                className="mt-3 inline-block text-sm text-[#ED6D23] font-semibold hover:underline"
              >
                Create your first post →
              </Link>
            </div>
          ) : (
            <div>
              {recentBlogs.map((blog) => (
                <RecentBlogRow key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#1C3664] text-base font-bold" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
            Quick Actions
          </h2>
          <QuickAction
            to="/dashboard/blogs/new"
            accent="#ED6D23"
            label="Write a New Blog"
            description="Create and publish a new post for the website."
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          />
          <QuickAction
            to="/dashboard/blogs"
            accent="#1C3664"
            label="Manage All Blogs"
            description="Edit, publish, or delete existing blog posts."
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            }
          />
          <QuickAction
            to="/blogs"
            accent="#16a34a"
            label="View Live Blog"
            description="See how the blog looks on the public website."
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            }
          />
        </div>
      </div>
    </AdminLayout>
  );
}
