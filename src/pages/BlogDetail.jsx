import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { cldUrl } from '../lib/cloudinary';

const NAVY = '#1C3664';
const ORANGE = '#ED6D23';

// ── SEO helmet (injects into document head) ───────────────────────────────────
function BlogSEO({ blog }) {
  useEffect(() => {
    if (!blog) return;

    const metaTitle = blog.seo?.metaTitle || blog.title;
    const metaDesc = blog.seo?.metaDescription || blog.excerpt || '';
    const ogImg = blog.seo?.ogImage || cldUrl(blog.coverImage?.url, { w: 1200 }) || '';
    const canonical = blog.seo?.canonicalUrl || `${window.location.origin}/blogs/${blog.slug}`;
    const keywords = blog.seo?.keywords?.join(', ') || blog.tags?.join(', ') || '';

    document.title = `${metaTitle} — Amatir Kanya Gurukul`;

    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', metaDesc);
    setMeta('keywords', keywords);
    setMeta('author', blog.author?.name || 'Amatir Team');
    setMeta('og:title', metaTitle, true);
    setMeta('og:description', metaDesc, true);
    setMeta('og:image', ogImg, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', canonical, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', metaTitle);
    setMeta('twitter:description', metaDesc);
    setMeta('twitter:image', ogImg);
    if (blog.publishedAt) setMeta('article:published_time', new Date(blog.publishedAt).toISOString(), true);
    if (blog.updatedAt) setMeta('article:modified_time', new Date(blog.updatedAt).toISOString(), true);
    setLink('canonical', canonical);

    return () => {
      // Restore default title on unmount
      document.title = 'Amatir Kanya Gurukul';
    };
  }, [blog]);

  return null;
}

// ── Prose styles injected into the rendered HTML ──────────────────────────────
const PROSE_STYLES = `
  .blog-prose h1 { font-family: 'CentSchbkCyrill BT', serif; font-size: clamp(1.6rem,3vw,2rem); color: #1C3664; margin: 1.5em 0 0.5em; line-height: 1.25; }
  .blog-prose h2 { font-family: 'CentSchbkCyrill BT', serif; font-size: clamp(1.3rem,2.5vw,1.6rem); color: #1C3664; margin: 1.4em 0 0.5em; line-height: 1.3; }
  .blog-prose h3 { font-family: 'CentSchbkCyrill BT', serif; font-size: clamp(1.1rem,2vw,1.3rem); color: #1C3664; margin: 1.2em 0 0.4em; }
  .blog-prose h4, .blog-prose h5, .blog-prose h6 { font-family: 'CentSchbkCyrill BT', serif; color: #1C3664; margin: 1em 0 0.3em; }
  .blog-prose p { font-size: 1.0625rem; line-height: 1.8; color: #374151; margin: 0 0 1em; }
  .blog-prose a { color: #ED6D23; text-decoration: underline; text-underline-offset: 2px; }
  .blog-prose a:hover { color: #1C3664; }
  .blog-prose strong { font-weight: 700; color: #1C3664; }
  .blog-prose em { font-style: italic; }
  .blog-prose u { text-decoration: underline; }
  .blog-prose s { text-decoration: line-through; }
  .blog-prose code { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.15em 0.45em; font-size: 0.875em; font-family: 'Fira Code', 'Courier New', monospace; color: #1C3664; }
  .blog-prose pre { background: #0f172a; border-radius: 10px; padding: 1.25em 1.5em; overflow-x: auto; margin: 1.5em 0; }
  .blog-prose pre code { background: none; border: none; padding: 0; color: #e2e8f0; font-size: 0.875em; }
  .blog-prose blockquote { border-left: 4px solid #ED6D23; margin: 1.5em 0; padding: 0.75em 0 0.75em 1.25em; background: #fff8f5; border-radius: 0 8px 8px 0; }
  .blog-prose blockquote p { color: #64748b; font-style: italic; margin: 0; }
  .blog-prose ul { list-style: disc; padding-left: 1.5em; margin: 1em 0; }
  .blog-prose ol { list-style: decimal; padding-left: 1.5em; margin: 1em 0; }
  .blog-prose li { margin: 0.35em 0; color: #374151; line-height: 1.7; }
  .blog-prose hr { border: none; border-top: 2px solid #e2e8f0; margin: 2em 0; }
  .blog-prose img { max-width: 100%; border-radius: 10px; margin: 1.5em auto; display: block; }
  .blog-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 0.9375rem; overflow-x: auto; display: block; }
  .blog-prose table th { background: #1C3664; color: white; padding: 0.65em 1em; text-align: left; font-weight: 600; }
  .blog-prose table td { padding: 0.6em 1em; border-bottom: 1px solid #e2e8f0; color: #374151; }
  .blog-prose table tr:nth-child(even) td { background: #f8fafc; }
  .blog-prose mark { background: #fef08a; border-radius: 2px; padding: 0.1em 0.2em; }
`;

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setBlog(null);

    api
      .get(`/blogs/${slug}`)
      .then(({ data }) => {
        setBlog(data.blog);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('not_found');
        } else {
          setError('server_error');
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="animate-pulse space-y-5">
            <div className="h-4 bg-[#e2e8f0] rounded w-1/4" />
            <div className="h-8 bg-[#e2e8f0] rounded w-3/4" />
            <div className="h-8 bg-[#e2e8f0] rounded w-1/2" />
            <div className="aspect-video bg-[#e2e8f0] rounded-2xl" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-[#e2e8f0] rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (error === 'not_found') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-24 text-center">
        <svg className="w-16 h-16 text-[#cbd5e1] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-[#1C3664] text-3xl mb-2" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
          Article Not Found
        </h1>
        <p className="text-[#64748b] text-sm mb-6">This post doesn't exist or may have been removed.</p>
        <Link
          to="/blogs"
          className="px-6 py-2.5 rounded-full text-white text-sm font-semibold"
          style={{ background: ORANGE }}
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Server error
  if (error === 'server_error') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-red-500 mb-4">Something went wrong. Please try again.</p>
        <button
          onClick={() => navigate(0)}
          className="px-5 py-2 rounded-lg text-white text-sm"
          style={{ background: ORANGE }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!blog) return null;

  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const updatedDate = blog.updatedAt
    ? new Date(blog.updatedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <>
      <BlogSEO blog={blog} />
      <style>{PROSE_STYLES}</style>

      {/* ── Hero Banner (themed, no image bg) ── */}
      <div
        className="pt-30 pb-32 px-4 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a6e 60%, #0e2349 100%)` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5" style={{ background: ORANGE }} />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full opacity-5" style={{ background: ORANGE }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li>
                <Link to="/" className="text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link to="/blogs" className="text-white  transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white/40 truncate max-w-[200px]">{blog.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
          >
            {blog.title}
          </h1>

          {/* Author + Date + Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div>
                <p className="text-white text-sm font-semibold leading-none">{blog.author?.name || 'Amatir Team'}</p>
                {publishDate && <p className="text-white/50 text-xs mt-1">{publishDate}</p>}
              </div>
            </div>

            <div className="ml-auto">
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => alert('Link copied!'))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/70 border border-white/20 hover:border-white/50 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover Image (full width, below hero) ── */}
      {blog.coverImage?.url && (
        <div className="bg-white -mt-[80px] ">
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* ── Main Article ── */}
              <div className="flex-1 min-w-0 bg-white p-5 rounded-xl blog-content-wrapper border border-[#dce6f0] shadow-[0_4px_24px_rgba(28,54,100,0.08),0_1px_4px_rgba(28,54,100,0.05)]">
                <div className="relative mb-4">
                  <img
                    src={cldUrl(blog.coverImage.url, { w: 1200 })}
                    alt={blog.coverImage.altText || blog.title}
                    className="w-full object-cover max-h-[520px] rounded-xl"
                    loading="eager"
                  />
                </div>
                {/* Excerpt */}
                {blog.excerpt && (
                  <p
                    className="text-lg text-[#374151] leading-relaxed italic border-l-4 pl-5 mb-8 py-1"
                    style={{ borderColor: ORANGE }}
                  >
                    {blog.excerpt}
                  </p>
                )}

                {/* Content */}
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: blog.content }} />

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="mt-8 bg-white rounded-2xl border border-[#e8eef6] shadow-sm p-5">
                    <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/blogs?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1C3664] bg-[#f0f4f8] hover:bg-[#1C3664] hover:text-white transition-all"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author bio */}
                {blog.author?.bio && (
                  <div className="mt-6 bg-white rounded-2xl border border-[#e8eef6] shadow-sm p-6 flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                      style={{ background: NAVY }}
                    >
                      {(blog.author.name || 'A')[0].toUpperCase()}
                    </div>
                    <div>
                      <p
                        className="text-base font-bold text-[#1C3664]"
                        style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
                      >
                        {blog.author.name}
                      </p>
                      <p className="text-sm text-[#64748b] mt-1 leading-relaxed">{blog.author.bio}</p>
                    </div>
                  </div>
                )}

                {/* Updated notice */}
                {updatedDate && updatedDate !== publishDate && (
                  <p className="mt-4 text-xs text-center text-[#94a3b8]">Last updated: {updatedDate}</p>
                )}
              </div>

              <aside className="lg:w-72 xl:w-80 space-y-6 shrink-0">
                {/* CTA box */}
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a4a84 100%)` }}
                >
                  <p className="text-white text-lg mb-2" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
                    Join Amatir Kanya Gurukul
                  </p>
                  <p className="text-white/70 text-xs mb-4 leading-relaxed">
                    Discover a transformative residential education rooted in values and excellence.
                  </p>
                  <Link
                    to="/admissions"
                    className="inline-block w-full py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: ORANGE }}
                  >
                    Apply Now
                  </Link>
                </div>
              </aside>
            </div>
            <div className="my-8">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: ORANGE }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
