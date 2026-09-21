import React, { useEffect } from "react";

const ThankYou = () => {
  useEffect(() => {
    // Google Tag Manager: conversion event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "conversion",
      conversion_id: "AW-11417662198/ABPrCJu87MUbEPblrsQq"
    });

    // Facebook Pixel: Lead conversion
    fbq('track', 'Lead');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-40">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#0E2349] mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700">We have received your submission.</p>
      </div>
    </div>
  );
};

export default ThankYou;
