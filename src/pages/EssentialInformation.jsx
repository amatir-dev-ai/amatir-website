// EssentialGuidelines.jsx
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ===== Brand palette (aligned to screenshots) ===== */
const NAVY = "#0E2349";
const NAVY2 = "#1C3664";
const ORANGE = "#ED6D23";
const PALE_ORANGE = "#FEF0E5";
const PALE_BLUE = "#EAF1FB";

/* ===== Cloudinary assets (provided) ===== */
const ASSETS = {
  hero: "/images/AMATIR_6_dpfwbs.jpg",
  accent: "/images/Orange_Icon_i299iz.svg",

  // Icons
  academicCal: "/images/AcademicCalenderIcon_imxc41.svg",
  eventsCal: "/images/EventsCalenderIcon_qcydur.svg",
  holidayList: "/images/HolidayListDates_hycg6k.svg",
  bookReq: "/images/AcademicBookRequirementsIcon_prriwy.svg",
  transferCert: "/images/TransferCertificatesIcon_cfiyn9.svg",
  rulesHandbook: "/images/SchoolRulesHandbookIcon_ewnrqx.svg",
  newsletter: "/images/NewsLetterIocn_h68tzf.svg",
  feePolicy: "/images/feePolicyGuidelinesIcon_qx4xzg.svg",
  hostelHandbook: "/images/HostelHandbookIcon_pgdooh.svg",

  // Banners
  feeStructureBg: "/images/Rectangle_35_e2yzph.jpg",
  orangeBanner: "/images/Rectangle_63_pctc61.jpg",
};

const CARDS = [
  {
    title: "Academic & Event Calendar",
    desc: "Stay informed about the key academic dates, term schedules, and important events throughout the year.",
    icon: ASSETS.academicCal,
    bubble: PALE_ORANGE,
    href: "/ACADEMIC_CALANDER_2025-26.pdf",
  },
  {
    title: "Holiday List Dates",
    desc: "View detailed vacation periods and holiday list to help plan family activities and travel in advance.",
    icon: ASSETS.holidayList,
    bubble: PALE_ORANGE,
    href: "/Holidays_Exams_ PTM_2025-26.pdf"
  },
  {
    title: "Academic Book Requirements",
    desc: "Find the complete list of prescribed textbooks and learning materials for all classes.",
    icon: ASSETS.bookReq,
    bubble: PALE_ORANGE,
    href: "/Books-2026-27.xlsx"
  },
  {
    title: "Transfer Certificates",
    desc: "Download guidelines and application forms for obtaining transfer certificates smoothly.",
    icon: ASSETS.transferCert,
    bubble: PALE_BLUE,
    href: "/Transfer_Certificate_2024-25.pdf"
  },
  {
    title: "Hostel Handbook",
    desc: "Access mandatory disclosures and compliance documents as per CBSE affiliation requirements.",
    icon: ASSETS.hostelHandbook,
    bubble: PALE_ORANGE,
    href: "/hostel_handbook.pdf"
    
  },
  {
    title: "School Rules Handbook",
    desc: "Review our comprehensive handbook outlining school policies, student responsibilities, and code of conduct.",
    icon: ASSETS.rulesHandbook,
    bubble: PALE_ORANGE,
    href: "/school-rules.pdf"
  },
];

const GeneralInformation = [
  ["1", "Name of the School", "Amatir Kanya Gurukul", ""],
  ["2", "Affiliation No.", "530865"],
  ["3", "School Code", "40834"],
  [
    "4",
    "Complete Address with Pincode",
    "Amatir Kanya Gurukul, Bachgaon Gamri, Lukhi Road, Kurukshetra, Haryana 136119",
  ],
  ["5", "Principal Name & Qualification", "Mrs. Gadipalli Madhuri, MSc, BEd"],
  ["6", "School Email ID", "info@amatir.org"],
  ["7", "Contact Details", "+91 - 7027570124"],
];

const staffDetails = [
  ["1", "Principal", "Gadipalli Madhuri"],
  ["2", "Total No. Of&nbsp;Teachers", "37"],
  ["", "PGT", "19"],
  ["", "TGT", "07"],
  ["", "PRT", "05"],
  ["3", "Teachers Section Ratio", "1:15"],
  ["4", "Details Of Special Educator", "Ms. Malvika Lakhanpal"],
  ["5", "Details Of Counsellor And Wellness Teacher", "Ms. Malvika Lakhanpal"],
];

const schollInfra = [
  ["1", "Total Campus Area Of&nbsp;The School (In Sq Mtr)", "37158"],
  ["2", "No. And Size Of&nbsp;The Class Rooms (In Sq Mtr)", "40 & 432"],
  ["3", "No. And Size Of Laboratories Including Computer Labs (In Sq Mtr)", "05 & 432"],
  ["4", "Internet Facility", "Yes"],
  ["5", "No. Of Girls Toilets", "23"],
  ["6", "No. Of Boys Toilets", "05"],
  ["7", "Link Of&nbsp;Youtube Video Of&nbsp;The Inspection Of School Covering The Infrastructure Of&nbsp;The School", "<a href='https://www.youtube.com/watch?v=D-M4oYowgBU' target='_blank' class='underline'>https://www.youtube.com/watch?v=D-M4oYowgBU</a>"]
];

const DocumentInformation = [
  [
    "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
    "view",
    "/Affiliation_up_to_Senior_Secondary_Level.pdf",
  ],
  [
    "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
    "view",
    "/Trust_Registration.pdf",
  ],
  [
    "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT/UT",
    "view",
    "/Copy_of_No_objection_Certificate_noc.pdf",
  ],
  [
    "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND ITS RENEWAL IF APPLICABLE",
    "view",
    "/Copies_of_Recognition_Certificate_under_RTE_Act.pdf",
  ],
  [
    "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
    "view",
    "/Copy_of_Valid_Building_Certificate_as_per_the_National_Building_Code.pdf",
  ],
  [
    "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
    "view",
    "/Copy_of_Fire_Safety_Certificate.pdf",
  ],
  [
    "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL",
    "view",
    "/Certificate_issued_by_DEO-2022.pdf",
  ],
  [
    "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES",
    "view",
    "/Copies_of_Valid_Water,_Health_&_Sanitation_Certificates.pdf",
  ],
];

const ResultAcademics = [
  ["FEE STRUCTURE OF THE SCHOOL", "view", "/FEE_STRUCTURE_2025-26.pdf"],
  ["ANNUAL ACADEMIC CALENDAR", "view", "/ACADEMIC_CALANDER_2025-26.pdf"],
  [
    "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)",
    "view",
    "/School_Management_Committee.pdf",
  ],
  ["LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", "view", "/PARENTS_TEACHERS_ASSOCIATION.pdf"],
  [
    "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY",
    "view",
    "/Last_Three_Years_Board_Result.pdf",
  ],
];

const studentDetails = {
  class_x: [
    {
      sl_no: 1,
      year: 2025,
      registered_students: 58,
      students_passed: 58,
      pass_percentage: 100,
      remarks: "no",
    },
  ],
  class_xii: [
    {
      sl_no: 1,
      year: 2025,
      registered_students: 59,
      students_passed: 59,
      pass_percentage: 100,
      remarks: "no",
    },
  ],
};

export default function EssentialInformation() {
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const [showMore, setShowMore] = useState(false);

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return "calc(100vh - 4rem)"; // Account for mobile header (64px)
    if (isVerySmallScreen) return "calc(100vh - 5rem)"; // Account for small laptop header (80px)
    if (isLowHeight) return "calc(100vh - 4.5rem)"; // Account for low height screens
    return "calc(100vh - 5.5rem)"; // Account for desktop header (88px)
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800">
      {/* ====================== HERO (exact height rule) ====================== */}
      <section
        className="relative overflow-hidden w-full"
        style={{
          height: "100vh",
          marginTop: "60px",
          minHeight: isVerySmallScreen ? "400px" : "480px",
        }}
      >
        <img
          src={ASSETS.hero}
          alt="Essential Guidelines Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(14,35,73,0.42)]" />
        {/* Title at the bottom center */}
        <div className="relative h-full z-10 mx-auto max-w-[1262px] px-4 flex items-end mt-[-8%] justify-center">
          <div
            className="text-center w-full"
            style={{
              transform: isVerySmallScreen
                ? "translateY(-10%)"
                : isMobile
                ? "translateY(-5%)"
                : "translateY(0)",
              paddingTop: isVerySmallScreen ? "2rem" : isMobile ? "1rem" : "0",
              paddingBottom: isVerySmallScreen
                ? "2rem"
                : isMobile
                ? "1rem"
                : "0",
            }}
          >
            <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={ASSETS.accent}
              />
            </div>
            <h1
              className="cent-schbk-cyrill z-10002"
              style={{
                lineHeight: "1.1",
                color: "#fff",
                marginBottom: "10%",
              }}
            >
              Essential Information
            </h1>
          </div>
        </div>
      </section>

      {/* ====================== GRID OF CARDS ====================== */}
      <section className="mx-auto w-[92%] max-w-[1180px] py-12 md:py-16">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, idx) => (
            <article
              key={c.title + idx}
              className="flex flex-col items-center text-center"
            >
              <div
                className="mb-4 grid h-20 w-20 place-items-center rounded-full"
                style={{ background: c.bubble }}
              >
                <img src={c.icon} alt="" className="h-9 w-9" />
              </div>
              <h3
                className="font-serif text-[18px] md:text-[20px] text-[#1C3664] leading-tight"
                style={{ letterSpacing: "0.2px" }}
              >
                {c.title}
              </h3>
              <p className="mt-3 max-w-[280px] text-[13px] md:text-[14px] leading-6 text-[#3B3B3B]">
                {c.desc}
              </p>
              <a
                href={c.href}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ED6D23] px-4 py-2 text-[12px] font-medium text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ====================== FEE STRUCTURE STRIP ====================== */}
      <section className="relative overflow-hidden">
        <img
          src={ASSETS.feeStructureBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-[1] bg-[#0E2349]/85 px-6 py-16 md:py-20">
          <div className="mx-auto w-full max-w-[980px] text-center text-white">
            <h2 className="font-serif text-[24px] md:text-[28px]">
              Fee Structure
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-[14px] md:text-[15px] leading-7 text-white/90">
              Find all essential information about fees, concessions, and
              scholarships in the PDF attached below.
            </p>
            <a
              href="/FEE_STRUCTURE_2025-26.pdf"
              className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(237,109,35,0.35)] hover:brightness-105 transition"
              style={{ background: ORANGE }}
              target="_blank"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      </section>

      {/* ====================== CBSE DISCLOSURE (desktop table; mobile horizontal scroll of same) ====================== */}
      <section className="mx-auto w-[92%] max-w-[1080px] py-14 md:py-18" id="cbseDisclosure">
        <h2
          className="mb-6 text-center font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          CBSE Disclosure
        </h2>

        <h4
          className="mb-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          General Information
        </h4>

        {/* One markup for all sizes; on mobile it scrolls horizontally instead of reflowing */}
        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-center text-[14px]">
                S. No.
              </div>
              <div className="col-span-5 px-3 py-3 text-[14px]">
                INFORMATION
              </div>
              <div className="col-span-6 px-3 py-3 text-[14px]">DETAILS</div>
            </div>

            <div>
              {GeneralInformation.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 text-[14px] ${
                    i % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-center">
                    {row[0]}
                  </div>
                  <div className="col-span-5 px-3 py-3">{row[1]}</div>
                  <div className="col-span-6 px-3 py-3">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          Document Information
        </h4>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-center text-[14px]">
                S. No.
              </div>
              <div className="col-span-9 px-3 py-3 text-[14px] text-center">
                DOCUMENT / INFORMATION
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                UPLOADED
              </div>
            </div>
            <div>
              {DocumentInformation.map((row, i) => (
                <div
                  key={i + 3}
                  className={`grid grid-cols-12 text-[14px] ${
                    (i + 3) % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-center">
                    {i + 1}
                  </div>
                  <div className="col-span-9 px-3 py-3 text-lowercase">
                    {row[0]}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-center">
                    {row[1] === "view" && row[2] && (
                      <a
                        href={row[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        {row[1]}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          Result and Academics
        </h4>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-center text-[14px]">
                S. No.
              </div>
              <div className="col-span-9 px-3 py-3 text-[14px] text-center">
                DOCUMENT / INFORMATION
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                UPLOADED
              </div>
            </div>
            <div>
              {ResultAcademics.map((row, i) => (
                <div
                  key={i + 3}
                  className={`grid grid-cols-12 text-[14px] ${
                    (i + 3) % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-center">
                    {i + 1}
                  </div>
                  <div className="col-span-9 px-3 py-3 text-lowercase">
                    {row[0]}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-center">
                    {row[1] === "view" && row[2] && (
                      <a
                        href={row[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        {row[1]}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          Result Class: X
        </h4>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-[14px] text-center">
                SL NO.
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                YEAR
              </div>
              <div className="col-span-3 px-3 py-3 text-[14px] text-center">
                NO. OF REGISTERED STUDENTS
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                NO. OF STUDENTS PASSED
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                PASS PERCENTAGE
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                REMARKS
              </div>
            </div>
            <div>
              {studentDetails.class_x.map((row, i) => (
                <div
                  key={i + 3}
                  className={`grid grid-cols-12 text-[14px] ${
                    (i + 3) % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-[14px] text-center">
                    {row.sl_no}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.year}
                  </div>
                  <div className="col-span-3 px-3 py-3 text-[14px] text-center">
                    {row.registered_students}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.students_passed}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.pass_percentage}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.remarks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          Result Class: XII
        </h4>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-[14px] text-center">
                SL NO.
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                YEAR
              </div>
              <div className="col-span-3 px-3 py-3 text-[14px] text-center">
                NO. OF REGISTERED STUDENTS
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                NO. OF STUDENTS PASSED
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                PASS PERCENTAGE
              </div>
              <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                REMARKS
              </div>
            </div>
            <div>
              {studentDetails.class_xii.map((row, i) => (
                <div
                  key={i + 3}
                  className={`grid grid-cols-12 text-[14px] ${
                    (i + 3) % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-[14px] text-center">
                    {row.sl_no}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.year}
                  </div>
                  <div className="col-span-3 px-3 py-3 text-[14px] text-center">
                    {row.registered_students}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.students_passed}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.pass_percentage}
                  </div>
                  <div className="col-span-2 px-3 py-3 text-[14px] text-center">
                    {row.remarks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          Staff (Teaching)
        </h4>

        {/* One markup for all sizes; on mobile it scrolls horizontally instead of reflowing */}
        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-center text-[14px]">
                S. No.
              </div>
              <div className="col-span-5 px-3 py-3 text-[14px]">
                INFORMATION
              </div>
              <div className="col-span-6 px-3 py-3 text-[14px]">DETAILS</div>
            </div>

            <div>
              {staffDetails.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 text-[14px] ${
                    i % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-center">
                    {row[0]}
                  </div>
                  <div
                    className="col-span-5 px-3 py-3"
                    dangerouslySetInnerHTML={{ __html: row[1] }}
                  />
                  <div className="col-span-6 px-3 py-3">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4
          className="mb-6 mt-6 text-left font-serif text-[26px] md:text-[30px] text-[#1C3664]"
          style={{ letterSpacing: "0.2px" }}
        >
          School Infrastructure 
        </h4>

        {/* One markup for all sizes; on mobile it scrolls horizontally instead of reflowing */}
        <div className="overflow-x-auto rounded-md border border-slate-200">
          <div className="min-w-[860px] md:min-w-0">
            <div className="grid grid-cols-12 bg-[#0E2349] text-white">
              <div className="col-span-1 px-3 py-3 text-center text-[14px]">
                S. No.
              </div>
              <div className="col-span-5 px-3 py-3 text-[14px]">
                INFORMATION
              </div>
              <div className="col-span-6 px-3 py-3 text-[14px]">DETAILS</div>
            </div>

            <div>
              {schollInfra.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 text-[14px] ${
                    i % 2 ? "bg-[#F5F7FB]" : "bg-white"
                  }`}
                >
                  <div className="col-span-1 px-3 py-3 text-center">
                    {row[0]}
                  </div>
                  <div
                    className="col-span-6 px-3 py-3"
                    dangerouslySetInnerHTML={{ __html: row[1] }}
                  />
                  <div
                    className="col-span-5 px-3 py-3"
                    dangerouslySetInnerHTML={{ __html: row[2] }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== ORANGE CTA BANNER ====================== */}
      <section className="relative w-full">
        <img
          src={ASSETS.orangeBanner}
          alt=""
          className="h-[260px] w-full object-cover md:h-[300px]"
        />
        <div className="absolute inset-0 bg-[rgba(237,109,35,0.88)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h3 className="font-serif text-[24px] md:text-[28px]">
            Unlock her future!
          </h3>
          <p className="mt-2 max-w-[680px] text-[14px] leading-7 md:text-[15px]">
            Guided by Dharma, Prepared for the World.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0E2349] px-5 py-2 text-[14px] font-semibold text-white"
          >
            
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ====================== MAP ====================== */}
      <section className="relative w-full">
        <iframe
          title="Amatir Kanya Gurukul Location"
          className="h-[420px] w-full md:h-[520px]"
          src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed&z=12"
          loading="lazy"
        />
      </section>
    </div>
  );
}
