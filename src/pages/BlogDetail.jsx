import React, { useEffect, useRef, useState } from 'react';
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
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const crmContainerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    setBlog(null);

    api
      .get(`/blogs/${slug}`)
      .then(({ data }) => {
        const fetchedBlog = data.blog;
        setBlog(fetchedBlog);

        // Fetch related: tag-filtered + latest, merge deduplicated, exclude current
        const currentSlug = fetchedBlog?.slug || slug;
        const tag = fetchedBlog?.tags?.[0];
        const tagPromise = tag
          ? api
              .get(`/blogs?tag=${encodeURIComponent(tag)}&limit=4`)
              .then((r) => r.data.blogs || [])
              .catch(() => [])
          : Promise.resolve([]);
        const latestPromise = api
          .get('/blogs?limit=6')
          .then((r) => r.data.blogs || [])
          .catch(() => []);
        return Promise.all([tagPromise, latestPromise]).then(([tagBlogs, latestBlogs]) => {
          const seen = new Set([currentSlug]);
          const result = [];
          for (const b of [...tagBlogs, ...latestBlogs]) {
            if (!seen.has(b.slug)) {
              seen.add(b.slug);
              result.push(b);
            }
            if (result.length === 3) break;
          }
          setRelatedBlogs(result);
        });
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

  // CRM iframe — runs once the container div actually mounts (after loading completes)
  useEffect(() => {
    if (loading || !blog) return;
    const container = crmContainerRef.current;
    if (!container) return;
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.id = 'crm-form-33';
    iframe.src = `https://crm.mediagarh.com/CRM/forms/public/33?embed=1&landing_url=${encodeURIComponent(window.location.href)}`;
    iframe.style.width = '100%';
    iframe.style.height = '420px';
    iframe.style.border = '0';
    iframe.style.background = 'transparent';
    container.appendChild(iframe);
  }, [loading, blog]);

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
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
                }}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={{
                  color: copied ? '#fff' : 'rgba(255,255,255,0.7)',
                  borderColor: copied ? ORANGE : 'rgba(255,255,255,0.2)',
                  background: copied ? ORANGE : 'transparent',
                }}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover Image (full width, below hero) ── */}
      {blog.coverImage?.url && (
        <div className="bg-white -mt-[80px] mx-[14px]">
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* ── Main Article ── */}
              <div className="flex-1 min-w-0 bg-white lg:p-5 p-3 rounded-xl blog-content-wrapper border border-[#dce6f0] shadow-[0_4px_24px_rgba(28,54,100,0.08),0_1px_4px_rgba(28,54,100,0.05)]">
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
                    className="lg:text-lg text-[16px] text-[#374151] leading-relaxed italic border-l-4 pl-5 mb-8 py-1"
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
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1C3664] bg-[#f0f4f8] transition-all"
                        >
                          #{tag}
                        </span>
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
                {/* CRM enquiry form */}
                <div className="rounded-2xl overflow-hidden border border-[#e8eef6] bg-white shadow-sm">
                  <div
                    className="px-5 pt-5 pb-3"
                    style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a4a84 100%)` }}
                  >
                    <p className="text-white text-lg mb-1" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
                      Enquire Now
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Interested in Amatir Kanya Gurukul? We'll get back to you.
                    </p>
                  </div>
                  <div ref={crmContainerRef} id="crm-form-container-33" className="w-full h-full bg-white p-3" />
                </div>

                {/* Related blogs */}
                {relatedBlogs.length > 0 && (
                  <div className="rounded-2xl border border-[#e8eef6] bg-white shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#e8eef6]">
                      <p
                        className="text-base font-bold text-[#1C3664]"
                        style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}
                      >
                        Related Articles
                      </p>
                    </div>
                    <ul className="divide-y divide-[#f0f4f8]">
                      {relatedBlogs.map((rb) => {
                        const rbDate = rb.publishedAt
                          ? new Date(rb.publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '';
                        return (
                          <li key={rb._id || rb.slug}>
                            <Link
                              to={`/blogs/${rb.slug}`}
                              className="flex gap-3 p-4 hover:bg-[#f8fafc] transition-colors group"
                            >
                              {rb.coverImage?.url && (
                                <img
                                  src={cldUrl(rb.coverImage.url, { w: 120 })}
                                  alt={rb.coverImage.altText || rb.title}
                                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#1C3664] leading-snug line-clamp-2 group-hover:text-[#ED6D23] transition-colors">
                                  {rb.title}
                                </p>
                                {rbDate && <p className="text-xs text-[#94a3b8] mt-1">{rbDate}</p>}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="px-5 py-3 border-t border-[#f0f4f8]">
                      <Link
                        to="/blogs"
                        className="text-xs font-semibold transition-colors hover:opacity-80"
                        style={{ color: ORANGE }}
                      >
                        View all articles →
                      </Link>
                    </div>
                  </div>
                )}
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
