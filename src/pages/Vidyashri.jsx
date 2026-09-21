import React, { useRef, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
 

import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
const IMG = {
    hero: "/images/vidyashri/studentGirl.png",
    call: "/images/vidyashri/call.png",
    website: "/images/vidyashri/website.png",
    logoAmatir: "/images/pn_logo.png",
    logoGenesis: "/images/vidyashri/logo-genesis.png",
    schoolbuilding: "/images/school_building.jpg",
    scanner: "/images/vidyashri/scanner.jpg",
};

const highlights = [
    "Only 40 Seats Available – 20 Seats for Class 9th & 20 Seats for Class 11th (Science)",
    "100% Financial Support – Covers school fee, books, uniform etc.",
    "100% Free Guidance – By Genesis Classes for NEET, JEE, NDA",
    "Selection Criteria – Written Test + Interview + Economically Weak Background",
    "Scholarship Test – 30th March 2025, 2:00 PM",
    "Exam Venue – Amatir Kanya Gurukul, Kurukshetra, Haryana",
];

const Vidyashri = () => {
    const { t } = useTranslation();
    const buttonRef = useRef(null);
    const touchRef = useRef(null);
    const [hideButton, setHideButton] = useState(false);
    const { i18n } = useTranslation();
    const isHindi = i18n.language === "hi";
    const formURL = isHindi
        ? "https://forms.zohopublic.in/adminama1/form/RequestCallBackVidyaShri/formperma/LBCYSUXWMOCYGJ-1kVRKeZSi5yYs8Y13RTy9wUlXQUo?zf_lang=hi"
        : "https://forms.zohopublic.in/adminama1/form/RequestCallBackVidyaShri/formperma/LBCYSUXWMOCYGJ-1kVRKeZSi5yYs8Y13RTy9wUlXQUo";


    const currentLang = i18n.language;
    useEffect(() => {
        if (!touchRef.current) return;

        const offset = 40;

        const handleScroll = () => {
            const sectionTop =
                touchRef.current.getBoundingClientRect().top + window.scrollY - offset;

            const scrollY = window.scrollY; // adjust for offset

            if (scrollY >= sectionTop) {
                setHideButton(true); // hide from section downward
            } else {
                setHideButton(false); // show again above section
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // run once on mount

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="vidyashri_scolarship pt-8">
            <section className="banner-section w-full bg-white lg:mt-12 mt-15 px-4 md:px-10">
                <div className="flex justify-end pt-12"></div>
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 md:items-start items-center gap-10">
                    {/* LEFT CONTENT */}
                    <div className="space-y-5">
                        <h1 className="text-3xl md:text-[1.5rem] font-bold text-gray-900 leading-tight text-center md:text-left uppercase">
                            <Trans i18nKey="hero.trust">
                                Initiative by Anant Charitable Trust
                            </Trans>
                        </h1>

                        <div className="w-full flex justify-center lg:justify-start">
                            <div className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] transition-all duration-300">
                                <img
                                    src={
                                        currentLang === "hi"
                                            ? "/images/vidyashri/logo-hi.png"
                                            : "/images/vidyashri/logo-en.png"
                                    }
                                    alt="Scholarship Logo"
                                    className="w-full h-auto object-contain drop-shadow-md"
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-[1.5rem] font-bold text-gray-900 leading-tight text-center md:text-left">
                            <Trans i18nKey="hero.title">
                                Empowering the
                                <br /> Brightest Daughters of Bharat
                            </Trans>
                        </h1>

                        <p className="text-gray-700 max-w-lg font-bold text-center md:text-left">
                            <Trans
                                i18nKey="hero.description"
                                components={{
                                    highlight: <span className="font-bold text-orange-600" />,
                                }}
                            />
                        </p>
                        <div className="relative lg:hidden flex justify-center lg:justify-end w-full">
                            <img
                                src="/images/vidyashri/pw-vidyapeeth-banner.svg"
                                alt="PW Vidyapeeth"
                                className="
                                        w-full
                                        max-w-[320px]
                                        sm:max-w-[480px]
                                        md:max-w-[600px]
                                        lg:max-w-[700px]
                                        xl:max-w-[800px]
                                        rounded-3xl
                                        shadow-xl
                                        object-contain
                                        "
                            />
                        </div>

                        <p className="text-lg font-bold text-[#08558c] text-center md:text-left">
                            <Trans i18nKey="hero.seatsAvailable">
                                40 Merit-Based Seats Available!
                            </Trans>
                        </p>

                        <button
                            onClick={() => {
                                const element = document.getElementById(
                                    "request-callback-section",
                                );
                                if (element) {
                                    const offset = 80;
                                    const top =
                                        element.getBoundingClientRect().top +
                                        window.pageYOffset -
                                        offset;

                                    window.scrollTo({
                                        top,
                                        behavior: "smooth",
                                    });
                                }
                            }}
                            ref={buttonRef}
                            className="rounded-full bg-orange-600 px-8 py-3 text-white font-semibold hover:bg-[#08558c] transition block mx-auto md:mx-0"
                        >
                            <Trans i18nKey="hero.apply">Request a Callback</Trans>
                        </button>
                    </div>

                    <div className="relative hidden lg:flex justify-center lg:justify-end w-full">
                        <img
                            src="/images/vidyashri/pw-vidyapeeth-banner.svg"
                            alt="PW Vidyapeeth"
                            className="
                                        w-full
                                        max-w-[320px]
                                        sm:max-w-[480px]
                                        md:max-w-[600px]
                                        lg:max-w-[700px]
                                        xl:max-w-[800px]
                                        rounded-3xl
                                        shadow-xl
                                        object-contain
                                        "
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-white px-4 py-10 md:py-10">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Why Section */}
                    <div className="mx-auto max-w-6xl grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                        <div className="space-y-3">
                            <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                                <Trans
                                    i18nKey="InDetail.scholarhipMeans"
                                    components={{
                                        1: <span className="font-bold text-black-600" />,
                                    }}
                                />
                            </div>
                            <div className="lg:hidden flex justify-center md:justify-end mt-6 mb-5">
                                <img
                                    src="/images/vidyashri/studentGirl.png"
                                    alt="Scholarship Students"
                                    className="  w-full
                                        max-w-[450px]
                                        md:max-w-[400px]
                                        rounded-2xl
                                        object-cover
                                        "
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#08558c] pt-2" style={{ fontFamily: "Univers, sans-serif" }}>
                                {t("InDetail.whatScholarTittle")}
                            </h3>

                            <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                                <Trans
                                    i18nKey="InDetail.whatScholarDesc"
                                    components={{
                                        1: <span className="font-bold text-black-600" />,
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg text-sm md:text-base text-gray">

                                    <Trans
                                        i18nKey="InDetail.eligibilityTitle"
                                        components={{
                                            1: <span className="font-bold text-black-600" />,
                                        }}
                                    />
                                </h3>

                                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                                    <li>
                                        <Trans
                                            i18nKey="InDetail.Points.point1"
                                            components={{
                                                1: <span className="font-bold text-black-600" />,
                                            }}
                                        />
                                    </li>

                                    <li>
                                        <Trans
                                            i18nKey="InDetail.Points.point2"
                                            components={{
                                                1: <span className="font-bold text-black-600" />,
                                            }}
                                        />
                                    </li>

                                    <li>
                                        <Trans
                                            i18nKey="InDetail.Points.point3"
                                            components={{
                                                1: <span className="font-bold text-black-600" />,
                                            }}
                                        />
                                    </li>

                                    <li>
                                        <Trans
                                            i18nKey="InDetail.Points.point4"
                                            components={{
                                                1: <span className="font-bold text-black-600" />,
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT SIDE – IMAGE */}
                        <div className="lg:flex hidden justify-center md:justify-end">
                            <img
                                src="/images/vidyashri/studentGirl.png"
                                alt="Scholarship Students"
                                className="  w-full
                                        max-w-[450px]
                                        md:max-w-[400px]
                                        rounded-2xl
                                        object-cover
                                        "
                            />
                        </div>
                    </div>

                    {/* Scholarship Details */}
                    <div className="space-y-3">
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                            <Trans
                                i18nKey="InDetail.pwDesc"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>


                        <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                            <li>
                                <Trans
                                    i18nKey="InDetail.pwPoints.point1"
                                    components={{
                                        1: <span className="font-bold text-black-600" />,
                                    }}
                                />
                            </li>

                            <li>
                                <Trans
                                    i18nKey="InDetail.pwPoints.point2"
                                    components={{
                                        1: <span className="font-bold text-black-600" />,
                                    }}
                                />
                            </li>

                            <li>
                                <Trans
                                    i18nKey="InDetail.pwPoints.point3"
                                    components={{
                                        1: <span className="font-bold text-black-600" />,
                                    }}
                                />
                            </li>
                        </ul>
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray pt-3">
                            <Trans
                                i18nKey="InDetail.details.selection"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                            <Trans
                                i18nKey="InDetail.details.examDate"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                            <Trans
                                i18nKey="InDetail.details.examTime"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray">
                            <Trans
                                i18nKey="InDetail.details.venue"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>
                        <div className="text-lg space-y-2 text-sm md:text-base text-gray italic">
                            <Trans
                                i18nKey="InDetail.details.Note"
                                components={{
                                    1: <span className="font-bold text-black-600" />,
                                }}
                            />
                        </div>
                    </div>

                    {/* Zoho Form Embed */}
                    <div
                        id="request-callback-section"
                        style={{
                            width: "100%",
                            height: "700px", // adjust as needed
                            borderRadius: "12px",
                            marginTop: "2rem",
                            overflow: "hidden",
                            position: "relative",
                        }}
                        className="mb-0"
                    >
                        <iframe
                            key={formURL}

                            src={formURL}
                            aria-label="Campus Visit Registration Form"
                            frameBorder="0"
                            scrolling="yes"
                            style={{
                                width: "calc(100% + 15px)", // pushes scrollbar outside visible area
                                height: "100%",
                                border: "none",
                                position: "absolute",
                                left: 0,
                                top: 0,
                            }}
                        ></iframe>
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2 hidden">
                        <p className="text-[#08558c] md:text-2xl font-semibold">
                            <Trans i18nKey="hero.scholarship">Vidya श्री Scholarship</Trans>
                        </p>

                        <h2 className="text-xl md:text-2xl font-bold text-[#08558c]">
                            {t("hero.scholarshipDescription")}
                            <Link
                                to="/essential-information"
                                className="text-orange-600 font-semibold hover:text-orange-700 underline"
                            >
                                {t("hero.scholarshipLink")}
                            </Link>
                        </h2>

                        <h2 className="text-xl md:text-2xl font-bold text-[#08558c]">
                            {t("hero.scholarshipPrize")}
                        </h2>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-800 hidden">
                        <p className="font-medium">{t("scholarshipNotice.greeting")}</p>

                        <p>{t("scholarshipNotice.intro")}</p>

                        <p>
                            {" "}
                            <Trans
                                i18nKey="scholarshipNotice.body"
                                components={[
                                    <a
                                        href="/Last_Three_Years_Board_Result.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-600 font-semibold underline hover:text-orange-700"
                                    />,
                                ]}
                            />
                        </p>
                        <p>
                            <Trans
                                i18nKey="scholarshipNotice.reporting"
                                components={[
                                    <span className="font-semibold" />,
                                    <span className="font-semibold" />,
                                    <span className="font-semibold" />,
                                    <span className="font-semibold" />,
                                ]}
                            />
                        </p>

                        {/* Notes */}
                        <div className="space-y-2">
                            <p className="font-semibold">
                                {t("scholarshipNotice.noteTitle")}
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("scholarshipNotice.notes.point1")}</li>
                                <li>{t("scholarshipNotice.notes.point2")}</li>
                                <li>{t("scholarshipNotice.notes.point3")}</li>
                                <li>{t("scholarshipNotice.notes.point4")}</li>
                            </ul>
                        </div>

                        <p> {t("scholarshipNotice.closing")}</p>

                        <p className="font-medium">
                            {t("scholarshipNotice.signature")}
                            <br />
                            {t("scholarshipNotice.organization")}
                        </p>
                    </div>
                </div>
            </section>

            <div className="md:px-0 px-3">
                <HeroSlider />
            </div>
        </div>
    );
};

export default Vidyashri;
