import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import useSEO from '../hooks/useSEO';

const NAVY = '#1C3664';
const ORANGE = '#ED6D23';

function BlogCard({ blog }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e8eef6] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={`Read: ${blog.title}`}
    >
      {/* Cover */}
      <div className="relative overflow-hidden bg-[#f0f4f8] aspect-[16/9]">
        {blog.coverImage?.url ? (
          <img
            src={blog.coverImage.url}
            alt={blog.coverImage.altText || blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${NAVY}15, ${ORANGE}15)` }}
          >
            <svg className="w-12 h-12 text-[#cbd5e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        {blog.featured && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
            style={{ background: ORANGE }}
          >
            Featured
          </span>
        )}
        {blog.category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[#1C3664] backdrop-blur-sm">
            {blog.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h2
          className="text-[#1C3664] text-lg leading-snug mb-2 line-clamp-2 group-hover:text-[#ED6D23] transition-colors"
          style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
        >
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {blog.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: NAVY }}
            >
              {(blog.author?.name || 'A')[0].toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium text-[#1C3664] leading-none">{blog.author?.name || 'Amatir Team'}</p>
              {date && <p className="text-[10px] text-[#94a3b8] mt-0.5">{date}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#94a3b8]">
            {blog.readingTime > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blog.readingTime} min
              </span>
            )}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              style={{ color: ORANGE }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ blog }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-[#e8eef6]"
      aria-label={`Read featured post: ${blog.title}`}
    >
      <div className="relative md:w-1/2 bg-[#f0f4f8] aspect-[16/9] md:aspect-auto">
        {blog.coverImage?.url ? (
          <img
            src={blog.coverImage.url}
            alt={blog.coverImage.altText || blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
        ) : (
          <div
            className="w-full h-full min-h-[220px] flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #2a4a84)` }}
          >
            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
          style={{ background: ORANGE }}
        >
          Featured
        </span>
      </div>
      <div
        className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 bg-white"
      >
        {blog.category && (
          <span className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            {blog.category}
          </span>
        )}
        <h2
          className="text-[#1C3664] text-2xl md:text-3xl leading-tight mb-3 group-hover:text-[#ED6D23] transition-colors"
          style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
        >
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="text-[#64748b] text-sm leading-relaxed mb-5 line-clamp-3">{blog.excerpt}</p>
        )}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: NAVY }}
          >
            {(blog.author?.name || 'A')[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-[#1C3664]">{blog.author?.name || 'Amatir Team'}</p>
            {date && <p className="text-xs text-[#94a3b8]">{date}</p>}
          </div>
          <div className="ml-auto flex items-center gap-1.5 font-semibold text-sm" style={{ color: ORANGE }}>
            Read
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blogs() {
  useSEO({
    title: 'Blog — Amatir Kanya Gurukul',
    description: 'Insights, updates, and stories from Amatir Kanya Gurukul. Explore our latest articles on education, boarding life, academics, and more.',
    ogTitle: 'Blog — Amatir Kanya Gurukul',
    ogDescription: 'Insights and stories from Amatir Kanya Gurukul',
  });

  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page, limit: 9 });
      if (activeCategory) params.set('category', activeCategory);
      if (search) params.set('search', search);
      const { data } = await api.get(`/blogs?${params}`);
      setBlogs(data.blogs || []);
      setPagination(data.pagination || {});
    } catch {
      setError('Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, activeCategory, search]);

  const fetchFeatured = useCallback(async () => {
    try {
      const { data } = await api.get('/blogs?featured=true&limit=1');
      if (data.blogs?.length) setFeatured(data.blogs[0]);
    } catch {
      // non-critical
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get('/blogs/categories');
      setCategories(data.categories || []);
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
    fetchCategories();
  }, [fetchFeatured, fetchCategories]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
    setSearch('');
    setSearchInput('');
  };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a4a84 100%)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#ED6D23] text-xs font-bold uppercase tracking-[0.3em] mb-3">Our Blog</p>
          <h1
            className="text-white text-4xl md:text-5xl leading-tight mb-4"
            style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
          >
            Insights & Stories
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8">
            Explore articles on education, boarding life, academics, and the journey of nurturing excellence at Amatir Kanya Gurukul.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-5 pr-14 py-3.5 rounded-full text-sm text-[#1C3664] placeholder-[#94a3b8] bg-white focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
              aria-label="Search blogs"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === ''
                  ? 'text-white shadow-md'
                  : 'text-[#64748b] bg-white border border-[#e2e8f0] hover:border-[#1C3664] hover:text-[#1C3664]'
              }`}
              style={activeCategory === '' ? { background: NAVY } : {}}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white shadow-md'
                    : 'text-[#64748b] bg-white border border-[#e2e8f0] hover:border-[#1C3664] hover:text-[#1C3664]'
                }`}
                style={activeCategory === cat ? { background: NAVY } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Active search/filter info */}
        {(search || activeCategory) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-[#64748b]">
              {pagination.total ?? 0} result{(pagination.total ?? 0) !== 1 ? 's' : ''}
              {search ? ` for "${search}"` : ''}
              {activeCategory ? ` in "${activeCategory}"` : ''}
            </span>
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setActiveCategory(''); setPage(1); }}
              className="text-xs text-[#ED6D23] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured post (only on first page, no filters) */}
        {featured && page === 1 && !search && !activeCategory && (
          <div className="mb-12">
            <FeaturedCard blog={featured} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8eef6] animate-pulse">
                <div className="aspect-[16/9] bg-[#e2e8f0]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#e2e8f0] rounded w-3/4" />
                  <div className="h-3 bg-[#e2e8f0] rounded w-full" />
                  <div className="h-3 bg-[#e2e8f0] rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-sm mb-3">{error}</p>
            <button
              onClick={fetchBlogs}
              className="px-5 py-2 rounded-lg text-sm text-white font-medium"
              style={{ background: ORANGE }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-[#cbd5e1] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-[#1C3664] text-xl font-semibold mb-2" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
              No articles yet
            </h3>
            <p className="text-[#94a3b8] text-sm">Check back soon for new posts.</p>
          </div>
        )}

        {/* Blog grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={!pagination.hasPrev}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border border-[#e2e8f0] text-[#1C3664] disabled:opacity-40 hover:border-[#1C3664] transition-colors bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '…' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-[#94a3b8] text-sm">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => { setPage(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                      page === item
                        ? 'text-white shadow-md'
                        : 'text-[#64748b] bg-white border border-[#e2e8f0] hover:border-[#1C3664] hover:text-[#1C3664]'
                    }`}
                    style={page === item ? { background: NAVY } : {}}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={!pagination.hasNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border border-[#e2e8f0] text-[#1C3664] disabled:opacity-40 hover:border-[#1C3664] transition-colors bg-white"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
