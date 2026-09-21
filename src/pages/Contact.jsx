// ContactEnquirePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Send, X } from "lucide-react";
import useSEO from "../hooks/useSEO";

/** Cloudinary SVGs (must be used in-page) */
const ASSETS = {
  logo: "/images/Logo_Blue_mjicoa.svg",
  hamburger: "/images/hamburger_Icon_tegdhi.svg",
  email: "/images/footer_email_d2ijzo.svg",
  phone: "/images/footer_phone_e2vyjp.svg",
  location: "/images/footer_location_dph6is.svg",
};

/** Brand palette */
const COLORS = {
  blue: "#1C3664",
  orange: "#ED6D23",
  ink: "#0F0F0F",
  gray: "#666666",
  line: "#DADDE3",
};

export default function ContactEnquirePage() {
  useSEO({
    title: 'Contact Amatir Kanya Gurukul | Kurukshetra, Haryana',
    description: 'Contact Amatir Kanya Gurukul in Kurukshetra, Haryana for admissions and enquiries. Visit our campus, call our team or connect online for more information.',
    keywords: ''
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! Your enquiry has been recorded.");
  };
  const crmContainerRef = useRef(null);

  // Dynamically load the CRM iframe script on mount
  useEffect(() => {
    const container = crmContainerRef.current;
    if (container) {
      // Clear previous content (prevents duplicate iframes on re-render)
      container.innerHTML = "";

      const baseUrl = 'https://connect.amatir.org/CRM/forms/public/17';
      const currentUrl = window.location.href;
      const iframeSrc = baseUrl + '?embed=1&landing_url=' + encodeURIComponent(currentUrl);

      const iframe = document.createElement('iframe');
      iframe.id = 'crm-form-17';
      iframe.src = iframeSrc;
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = '0';

      container.appendChild(iframe);
    }
  }, []);

  return (
    <main className="w-screen py-8 overflow-x-hidden bg-white text-black" style={{ marginTop: "60px" }}>
      {/* MOBILE TOP BAR — logo | centered CTA | close (matches ref) */}




      {/* MAIN — mobile stack (Enquire first) / desktop two-column */}
      <section className="w-screen px-[4vw]">
        <div className="flex flex-col items-start md:flex-row" style={{ gap: "5vw" }}>
          {/* CONTACT (left on desktop, second on mobile) */}
          <div className="order-2 grow md:order-1 md:basis-[48%]">
            <h1
              className="cent-schbk-cyrill font-semibold leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: COLORS.ink,
                marginBottom: "4vh",
              }}
            >
              Contact us
            </h1>

            <ul>
              <ContactRow iconSrc={ASSETS.email} label="Email" href="mailto:info@amatir.org">
                info@amatir.org
              </ContactRow>

              <ContactRow iconSrc={ASSETS.phone} label="Phone" href="tel:+917027570124">
                7027570124
              </ContactRow>

              <ContactRow
                iconSrc={ASSETS.location}
                label="Location"
                href="https://maps.google.com/?q=Amatir%20Kanya%20Gurukul%20Kurukshetra"
              >
                <>
                  Amatir Kanya Gurukul, Bachgaon
                  <br />
                  Gamri, Lukhi Road, Kurukshetra,
                  <br />
                  Haryana 136119
                </>
              </ContactRow>
            </ul>

            {/* Map — full to padded edges */}
            <div
              className="w-full"
              style={{
                marginTop: "4vh",
                overflow: "hidden",
                borderStyle: "solid",
                borderColor: COLORS.line,
                borderWidth: "0.1rem",
                borderRadius: "1rem",
              }}
            >
              <iframe
                title="Amatir Kanya Gurukul Map"
                loading="lazy"
                className="block w-full"
                style={{ height: "46vh" }}
                src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed"
              />
            </div>
          </div>

          {/* ENQUIRE (right on desktop, first on mobile) */}
          <div className="order-1 grow md:order-2 md:basis-[48%]">

            <div
              className="mx-auto rounded-xl shadow-sm overflow-hidden p-6 md:p-8"
              style={{
                width: "500px",
                border: "1px solid #dadde3",
                overflow: "hidden",
                position: "relative",
                minHeight: "400px",
              }}
            >
              <h2
                className="cent-schbk-cyrill font-semibold leading-tight mb-6 md:mb-8"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  color: "#0F0F0F",
                }}
              >
                Enquire Now
              </h2>
              <div ref={crmContainerRef} id="crm-form-container-17" className="w-full h-full" />
            </div>
          </div>
        </div>


        {/* Accent divider */}
        <div
          className="w-screen"
          style={{
            height: "0.15rem",
            background:
              "linear-gradient(90deg, rgba(28,54,100,0.12), rgba(237,109,35,0.28), rgba(28,54,100,0.12))",
            marginTop: "8vh",
          }}
        />
      </section>
    </main >
  );
}

/* ---------- Reusable blocks (all sizing in rem/vw/vh) ---------- */
function Field({ label, children, className = "", style = {} }) {
  return (
    <label className={`block ${className}`} style={{ marginBottom: "2vh", ...style }}>
      <span
        className="univers-regular block"
        style={{
          fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
          marginBottom: "1vh",
          color: COLORS.gray,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

/** Render white SVGs as solid black using CSS mask (keeps icons crisp & brand-consistent) */
function MaskIcon({ src, label }) {
  return (
    <span
      aria-hidden="true"
      role="img"
      aria-label={label}
      style={{
        width: "1.4rem",
        height: "1.4rem",
        display: "inline-block",
        backgroundColor: "#000",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function ContactRow({ iconSrc, label, href, children }) {
  const content = (
    <span className="univers-regular" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.6 }}>{children}</span>
  );
  return (
    <li className="flex items-start" style={{ gap: "3.2vw", marginBottom: "2.2vh" }}>
      <MaskIcon src={iconSrc} label={label} />
      {href ? (
        <a href={href} className="hover:underline">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
