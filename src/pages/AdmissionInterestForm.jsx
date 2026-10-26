import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CLASS_OPTIONS = [
  'Pre-Nursery',
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Chandigarh',
  'Ladakh',
  'Jammu & Kashmir',
  'Puducherry',
  'Other',
];

const INITIAL_FORM = {
  studentName: '',
  classApplying: '',
  parentName: '',
  mobile: '',
  city: '',
  state: 'Haryana',
  upiTransactionId: '',
};

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {msg}
    </p>
  );
}

function validate(form, file) {
  const errs = {};
  if (!form.studentName.trim()) errs.studentName = 'Student name is required';
  if (!form.classApplying) errs.classApplying = 'Please select a class';
  if (!form.parentName.trim()) errs.parentName = 'Parent / Guardian name is required';
  if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errs.mobile = 'Enter a valid 10-digit mobile number';
  if (!form.city.trim()) errs.city = 'City is required';
  if (!form.state) errs.state = 'State is required';
  if (!file) errs.paymentScreenshot = 'Payment screenshot is required';
  return errs;
}

export default function AdmissionInterestForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowed.includes(f.type)) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Only JPG, PNG or PDF files are allowed' }));
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'File size must be under 5 MB' }));
      return;
    }
    setFile(f);
    setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setFilePreview(ev.target.result);
      reader.readAsDataURL(f);
    } else {
      setFilePreview('pdf');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errs = validate(form, file);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = document.querySelector('[data-error="true"]');
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('paymentScreenshot', file);
      fd.append('source', 'interest-form');

      // Use plain axios so FormData boundary isn't overridden by api.js defaults
      const BASE = import.meta.env.VITE_API_URL || '/api';
      await axios.post(`${BASE}/admission-leads`, fd);

      navigate('/thank-you');
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        err.message ||
        'Submission failed. Please try again.';
      setApiError(`${err.response?.status ? `(${err.response.status}) ` : ''}${msg}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (field) =>
    `w-full bg-[#1e2d4a] border ${errors[field] ? 'border-red-500' : 'border-[#2a3d5e]'} rounded-lg px-4 py-3 text-white placeholder-[#6b82a4] text-sm focus:outline-none focus:border-[#ED6D23] focus:ring-2 focus:ring-[#ED6D23]/20 transition-all`;

  const labelCls = 'block text-sm font-medium text-[#c5d0e0] mb-1.5';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0a1929 0%, #0E2349 100%)' }}>
      {/* Header strip */}
      <div className="pt-8 pb-4 px-4">
        <div className="max-w-[540px] mx-auto flex items-center gap-3">
          <img
            src="/images/Logo_Blue_vl2ust.svg"
            alt="Amatir Kanya Gurukul"
            className="w-16 h-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <p className="text-[#ED6D23] text-lg font-semibold tracking-widest uppercase mb-1">AMATIR KANYA GURUKUL</p>
            <p className="text-[#8fa3bf] text-[16px]">
              Bachgaon Gamri, Lukhi Road, Kurukshetra, Haryana 136119 · CBSE Affiliated
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12">
        <div className="max-w-[540px] mx-auto">
          {/* Title card */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{ background: 'linear-gradient(135deg, #1C3664 0%, #ED6D23 100%)' }}
          >
            <h1 className="text-white text-xl font-bold mb-1">Admission Interest Form</h1>
            <p className="text-white/80 text-sm leading-relaxed">
              Fill in your details and pay the registration fee of <strong>₹2,100</strong> to register your daughter's
              interest for admission.
            </p>
          </div>

          {/* API error */}
          {apiError && (
            <div className="mb-4 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-300 text-sm flex gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Section 1 */}
            <div className="bg-[#132239] rounded-2xl p-5 border border-[#1e3356]">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#ED6D23] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <h2 className="text-white font-semibold text-base">Student &amp; Parent Details</h2>
              </div>

              <div className="space-y-4">
                {/* Student Name */}
                <div data-error={!!errors.studentName}>
                  <label className={labelCls} htmlFor="studentName">
                    Name of the Student <span className="text-[#ED6D23]">*</span>
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    autoComplete="name"
                    value={form.studentName}
                    onChange={handleChange}
                    placeholder="Full name of the student"
                    className={inputCls('studentName')}
                  />
                  <FieldError msg={errors.studentName} />
                </div>

                {/* Class */}
                <div data-error={!!errors.classApplying}>
                  <label className={labelCls} htmlFor="classApplying">
                    Class (seeking admission in) <span className="text-[#ED6D23]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="classApplying"
                      name="classApplying"
                      value={form.classApplying}
                      onChange={handleChange}
                      className={`${inputCls('classApplying')} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select class</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b82a4]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <FieldError msg={errors.classApplying} />
                </div>

                {/* Parent Name */}
                <div data-error={!!errors.parentName}>
                  <label className={labelCls} htmlFor="parentName">
                    Name of the Parent / Guardian <span className="text-[#ED6D23]">*</span>
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    autoComplete="name"
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="Father's or mother's name"
                    className={inputCls('parentName')}
                  />
                  <FieldError msg={errors.parentName} />
                </div>

                {/* Mobile */}
                <div data-error={!!errors.mobile}>
                  <label className={labelCls} htmlFor="mobile">
                    Mobile No. <span className="text-[#ED6D23]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center bg-[#1e2d4a] border border-[#2a3d5e] rounded-lg px-3 text-[#8fa3bf] text-sm shrink-0 select-none">
                      +91
                    </div>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      value={form.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setForm((prev) => ({ ...prev, mobile: val }));
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                      }}
                      placeholder="10-digit number"
                      className={`flex-1 ${inputCls('mobile')}`}
                    />
                  </div>
                  <FieldError msg={errors.mobile} />
                </div>

                {/* City + State */}
                <div className="grid grid-cols-2 gap-3">
                  <div data-error={!!errors.city}>
                    <label className={labelCls} htmlFor="city">
                      City <span className="text-[#ED6D23]">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className={inputCls('city')}
                    />
                    <FieldError msg={errors.city} />
                  </div>
                  <div data-error={!!errors.state}>
                    <label className={labelCls} htmlFor="state">
                      State <span className="text-[#ED6D23]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={`${inputCls('state')} appearance-none pr-8 cursor-pointer`}
                      >
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b82a4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <FieldError msg={errors.state} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 — Payment */}
            <div className="bg-[#132239] rounded-2xl p-5 border border-[#1e3356]">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#ED6D23] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <h2 className="text-white font-semibold text-base">Pay Registration Fee</h2>
              </div>

              {/* Amount */}
              <div className="text-center mb-4">
                <p className="text-white text-3xl font-bold">
                  ₹2,100 <span className="text-[#8fa3bf] text-sm font-normal">one-time</span>
                </p>
                <p className="text-[#8fa3bf] text-xs mt-1">Scan with any UPI app — Google Pay, PhonePe, Paytm, BHIM</p>
              </div>

              {/* QR code */}
              <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl mb-4">
                <img
                  src="/qr-code-img.jpeg"
                  alt="UPI QR Code — Amatir Kanya Gurukul"
                  className="w-114 lg:h-114 object-contain"
                />
                {/* Fallback when QR image is missing */}
                <div
                  className="w-44 h-44 hidden items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                  style={{ display: 'none' }}
                >
                  <div className="text-center px-4">
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">QR Code</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-[#8fa3bf] text-xs">
                UPI ID: <span className="text-white font-mono font-medium">vyapar.176599997217@hdfcbank</span> · Payee:{' '}
                <span className="text-[#ED6D23] font-medium">Amatir Kanya Gurukul</span>
              </p>
            </div>

            {/* Section 3 — Upload Screenshot */}
            <div className="bg-[#132239] rounded-2xl p-5 border border-[#1e3356]">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#ED6D23] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <h2 className="text-white font-semibold text-base">Upload Payment Screenshot</h2>
              </div>

              <div
                data-error={!!errors.paymentScreenshot}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload payment screenshot"
                className={`border-2 border-dashed ${
                  errors.paymentScreenshot
                    ? 'border-red-500 bg-red-900/10'
                    : 'border-[#2a3d5e] hover:border-[#ED6D23]/60'
                } rounded-xl p-6 text-center cursor-pointer transition-all`}
              >
                {filePreview ? (
                  <div className="space-y-2">
                    {filePreview === 'pdf' ? (
                      <div className="flex items-center justify-center gap-2 text-[#ED6D23]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium">{file?.name}</span>
                      </div>
                    ) : (
                      <img
                        src={filePreview}
                        alt="Payment screenshot preview"
                        className="max-h-36 mx-auto rounded-lg object-contain border border-[#2a3d5e]"
                      />
                    )}
                    <p className="text-[#8fa3bf] text-xs">Tap to change</p>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 text-[#4a6380] mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <p className="text-white text-sm font-medium">Tap to attach screenshot</p>
                    <p className="text-[#6b82a4] text-xs mt-1">JPG, PNG or PDF · up to 5 MB</p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={handleFile}
                aria-label="Payment screenshot"
              />
              <FieldError msg={errors.paymentScreenshot} />

              {/* UPI Transaction ID */}
              <div className="mt-4">
                <label className={labelCls} htmlFor="upiTransactionId">
                  UPI Transaction ID / UTR <span className="text-[#6b82a4] font-normal">(optional)</span>
                </label>
                <input
                  id="upiTransactionId"
                  name="upiTransactionId"
                  type="text"
                  inputMode="numeric"
                  maxLength={50}
                  value={form.upiTransactionId}
                  onChange={handleChange}
                  placeholder="12-digit number shown in your UPI app"
                  className={inputCls('upiTransactionId')}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: submitting ? '#6b82a4' : 'linear-gradient(135deg, #ED6D23, #f5883f)' }}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                'Submit Form'
              )}
            </button>

            <p className="text-center text-[#6b82a4] text-xs pb-2">
              For help, call <span className="text-white">+91 7027570124</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
