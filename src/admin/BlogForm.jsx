import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import AdminLayout from './components/AdminLayout';
import TipTapEditor from './components/TipTapEditor';

const INITIAL = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  status: 'draft',
  featured: false,
  author: { name: 'Amatir Team', bio: '' },
  seo: { metaTitle: '', metaDescription: '', canonicalUrl: '', keywords: '' },
  coverImage: { url: '', publicId: '', altText: '' },
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function Field({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[#1C3664]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-[#94a3b8]">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] placeholder-[#94a3b8] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10 transition-all bg-white ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] placeholder-[#94a3b8] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10 transition-all bg-white resize-none ${className}`}
      {...props}
    />
  );
}

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const coverInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // content | seo | author

  // Fetch existing blog on edit
  useEffect(() => {
    if (!isEdit) return;
    setFetching(true);
    api
      .get(`/blogs/admin/${id}`)
      .then(({ data }) => {
        const b = data.blog;
        setForm({
          title: b.title || '',
          slug: b.slug || '',
          excerpt: b.excerpt || '',
          content: b.content || '',
          category: b.category || '',
          tags: (b.tags || []).join(', '),
          status: b.status || 'draft',
          featured: b.featured || false,
          author: b.author || { name: 'Amatir Team', bio: '' },
          seo: {
            metaTitle: b.seo?.metaTitle || '',
            metaDescription: b.seo?.metaDescription || '',
            canonicalUrl: b.seo?.canonicalUrl || '',
            keywords: (b.seo?.keywords || []).join(', '),
          },
          coverImage: b.coverImage || { url: '', publicId: '', altText: '' },
        });
        if (b.coverImage?.url) setCoverPreview(b.coverImage.url);
      })
      .catch(() => setError('Failed to load blog post'))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || prev.slug === '' ? slugify(title) : prev.slug,
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle === prev.title ? title.slice(0, 70) : prev.seo.metaTitle,
      },
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (group, field, value) => {
    setForm((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview('');
    setForm((prev) => ({ ...prev, coverImage: { url: '', publicId: '', altText: '' } }));
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const handleSubmit = async (e, statusOverride) => {
    e?.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.content || form.content === '<p></p>' || form.content.trim() === '') {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const blogData = {
        ...form,
        status: statusOverride || form.status,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        seo: {
          ...form.seo,
          keywords: form.seo.keywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        },
      };

      const formData = new FormData();
      formData.append('blogData', JSON.stringify(blogData));
      if (coverFile) formData.append('coverImage', coverFile);

      const { data } = isEdit
        ? await api.put(`/blogs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      if (!isEdit) {
        navigate(`/dashboard/blogs/edit/${data.blog._id}`, { replace: true });
      } else {
        // Update cover preview if returned
        if (data.blog.coverImage?.url) setCoverPreview(data.blog.coverImage.url);
        setForm((prev) => ({ ...prev, status: data.blog.status, slug: data.blog.slug }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-[#1C3664] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const metaDescLen = form.seo.metaDescription.length;
  const metaTitleLen = form.seo.metaTitle.length;

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} noValidate>
        {/* ── Page header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[#1C3664] text-2xl font-bold" style={{ fontFamily: 'CentSchbkCyrill BT, serif' }}>
              {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
            </h1>
            <p className="text-[#64748b] text-sm mt-0.5">
              {isEdit ? `Editing: ${form.title || '…'}` : 'Fill in the details to create a new post'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm text-[#64748b] border border-[#e2e8f0] rounded-lg hover:bg-[#f1f5f9] transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading}
              className="px-4 py-2 text-sm text-[#1C3664] border border-[#1C3664] rounded-lg hover:bg-[#1C3664]/5 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 text-sm text-white rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #ED6D23, #f5883f)' }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {form.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        {saved && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-700 text-sm font-medium">Saved successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* ── Left: main editor ── */}
          <div className="space-y-5">
            {/* Title */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 space-y-4">
              <Field label="Title" required>
                <Input
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Enter a compelling blog title…"
                  maxLength={200}
                />
              </Field>
              <Field label="Slug" hint="Auto-generated from title. Lowercase, hyphens only.">
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-[#f8fafc] border border-r-0 border-[#e2e8f0] rounded-l-lg text-xs text-[#94a3b8]">
                    /blogs/
                  </span>
                  <Input
                    value={form.slug}
                    onChange={(e) => handleChange('slug', slugify(e.target.value))}
                    placeholder="your-post-slug"
                    className="rounded-l-none"
                  />
                </div>
              </Field>
              <Field label="Excerpt" hint="Brief summary shown on the blog listing page (max 500 chars)">
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  rows={3}
                  placeholder="Write a short, engaging excerpt…"
                  maxLength={500}
                />
                <p className="text-right text-xs text-[#94a3b8] mt-1">{form.excerpt.length}/500</p>
              </Field>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="flex border-b border-[#e2e8f0]">
                {[
                  { key: 'content', label: 'Content' },
                  { key: 'seo', label: 'SEO' },
                  { key: 'author', label: 'Author' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === key
                        ? 'border-[#ED6D23] text-[#ED6D23]'
                        : 'border-transparent text-[#64748b] hover:text-[#1C3664]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Content tab */}
                {activeTab === 'content' && (
                  <TipTapEditor content={form.content} onChange={(html) => handleChange('content', html)} />
                )}

                {/* SEO tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-4">
                    <Field label="Meta Title" hint={`${metaTitleLen}/70 chars — ideal: 50–70`}>
                      <Input
                        value={form.seo.metaTitle}
                        onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)}
                        placeholder="SEO title for search engines"
                        maxLength={70}
                      />
                      <div className="mt-1 h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${metaTitleLen > 70 ? 'bg-red-500' : metaTitleLen >= 50 ? 'bg-green-500' : 'bg-yellow-400'}`}
                          style={{ width: `${Math.min(100, (metaTitleLen / 70) * 100)}%` }}
                        />
                      </div>
                    </Field>
                    <Field label="Meta Description" hint={`${metaDescLen}/160 chars — ideal: 120–160`}>
                      <Textarea
                        value={form.seo.metaDescription}
                        onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)}
                        rows={3}
                        placeholder="Describe this post for search engines…"
                        maxLength={160}
                      />
                      <div className="mt-1 h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${metaDescLen > 160 ? 'bg-red-500' : metaDescLen >= 120 ? 'bg-green-500' : 'bg-yellow-400'}`}
                          style={{ width: `${Math.min(100, (metaDescLen / 160) * 100)}%` }}
                        />
                      </div>
                    </Field>
                    <Field label="Canonical URL" hint="Leave blank to use the default blog URL">
                      <Input
                        value={form.seo.canonicalUrl}
                        onChange={(e) => handleNestedChange('seo', 'canonicalUrl', e.target.value)}
                        placeholder="https://example.com/blogs/your-post"
                        type="url"
                      />
                    </Field>
                    <Field label="Keywords" hint="Comma-separated keywords for meta tags">
                      <Input
                        value={form.seo.keywords}
                        onChange={(e) => handleNestedChange('seo', 'keywords', e.target.value)}
                        placeholder="education, gurukul, boarding school…"
                      />
                    </Field>

                    {/* SERP Preview */}
                    <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] p-4">
                      <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">SERP Preview</p>
                      <p className="text-[#1a0dab] text-base font-medium leading-tight truncate">
                        {form.seo.metaTitle || form.title || 'Page Title'}
                      </p>
                      <p className="text-green-700 text-xs mt-0.5">amatir.in/blogs/{form.slug || 'your-post-slug'}</p>
                      <p className="text-[#4d5156] text-sm mt-1 leading-relaxed line-clamp-2">
                        {form.seo.metaDescription || form.excerpt || 'Page description will appear here…'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Author tab */}
                {activeTab === 'author' && (
                  <div className="space-y-4">
                    <Field label="Author Name">
                      <Input
                        value={form.author.name}
                        onChange={(e) => handleNestedChange('author', 'name', e.target.value)}
                        placeholder="Author name"
                      />
                    </Field>
                    <Field label="Author Bio" hint="Shown at the bottom of the blog post">
                      <Textarea
                        value={form.author.bio}
                        onChange={(e) => handleNestedChange('author', 'bio', e.target.value)}
                        rows={4}
                        placeholder="Brief author biography…"
                      />
                    </Field>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: metadata sidebar ── */}
          <div className="space-y-4">
            {/* Publish */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#1C3664] uppercase tracking-wider">Publish</h3>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-lg text-sm text-[#1C3664] focus:outline-none focus:border-[#1C3664] focus:ring-2 focus:ring-[#1C3664]/10 bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                  />
                  <div
                    className={`w-10 h-5 rounded-full transition-colors ${form.featured ? 'bg-[#ED6D23]' : 'bg-[#e2e8f0]'}`}
                  />
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : ''}`}
                  />
                </div>
                <span className="text-sm text-[#1C3664] font-medium">Featured Post</span>
              </label>
              <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'draft')}
                  disabled={loading}
                  className="w-full py-2 text-sm text-[#1C3664] border border-[#1C3664] rounded-lg hover:bg-[#1C3664]/5 transition-colors font-medium disabled:opacity-50"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'published')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-white rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #ED6D23, #f5883f)' }}
                >
                  {loading && (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {form.status === 'published' ? 'Update Post' : 'Publish Now'}
                </button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#1C3664] uppercase tracking-wider">Cover Image</h3>
              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-40 object-cover rounded-lg border border-[#e2e8f0]"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#e2e8f0] rounded-lg cursor-pointer hover:border-[#1C3664]/40 hover:bg-[#f8fafc] transition-all">
                  <svg className="w-8 h-8 text-[#cbd5e1] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-[#94a3b8]">Click to upload cover image</p>
                  <p className="text-xs text-[#cbd5e1] mt-0.5">PNG, JPG, WebP — max 8MB</p>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </label>
              )}
              <Field label="Alt Text">
                <Input
                  value={form.coverImage.altText}
                  onChange={(e) => handleNestedChange('coverImage', 'altText', e.target.value)}
                  placeholder="Describe the image…"
                />
              </Field>
            </div>

            {/* Category & Tags */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#1C3664] uppercase tracking-wider">Classification</h3>
              <Field label="Category">
                <Input
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  placeholder="e.g. Education, Academics…"
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  {[
                    'Education',
                    'Academics',
                    'Boarding',
                    'Life at Amatir',
                    'Admissions',
                    'Events',
                    'News',
                    'General',
                  ].map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field label="Tags" hint="Comma-separated">
                <Input
                  value={form.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="gurukul, education, boarding…"
                />
                {form.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tags
                      .split(',')
                      .filter((t) => t.trim())
                      .map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#f1f5f9] text-[#1C3664] text-xs rounded-full">
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                )}
              </Field>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
