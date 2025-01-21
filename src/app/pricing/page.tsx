"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";

const PricingPage: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const menuItems = [
    { name: "About", link: "#about", size: "w-12 h-24" },
    { name: "Lemonaid", link: "https://lemonaid.se", size: "w-16 h-32" },
    { name: "Contact", link: "#contact", size: "w-12 h-24" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-gray-800">
      {/* Header Menu */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#007A78] text-white shadow-lg z-50 transition-all duration-300 ${
          hovered ? "h-32" : "h-16"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <Image src="/images/dpa_logo.svg" alt="DPA Logo" width={150} height={40} />
        </div>
        {hovered && (
          <div className="flex justify-center items-center space-x-6 py-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${item.size} bg-white rounded-full border-2 border-[#007A78] 
                    hover:bg-[#29AFCA] transition-all duration-300 flex items-center justify-center
                  `}
                >
                </a>
                <span className="mt-2 text-white font-[Quicksand] text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <main className={`container mx-auto px-6 pt-40 py-12`}>
        {/* Title Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#007A78] font-[Quicksand]">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-gray-700 font-[Montserrat]">
            Find the right plan for your organization’s needs.
          </p>
        </section>

        {/* Features Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#007A78] mb-6 font-[Quicksand]">Features Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Questionnaire</h3>
              <p className="text-gray-600 font-[Montserrat]">
                Engage with a structured set of questions designed to uncover key insights about your organization.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Insights</h3>
              <p className="text-gray-600 font-[Montserrat]">
                Receive actionable insights to identify strengths and opportunities for growth.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Reports</h3>
              <p className="text-gray-600 font-[Montserrat]">
                Get detailed reports that highlight performance metrics and alignment with goals.
              </p>
            </div>
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Actions</h3>
              <p className="text-gray-600 font-[Montserrat]">
                Implement clear action steps to drive meaningful change within your organization.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Small Plan */}
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Small</h3>
            <p className="text-gray-600 font-[Montserrat] mb-4">Up to 30 employees</p>
            <p className="text-3xl font-extrabold text-[#007A78] mb-4 font-[Quicksand]">€1000</p>
            <Button className="bg-[#29AFCA] text-white hover:bg-[#218D9C] px-6 py-3 rounded-lg font-bold">
              Get Started
            </Button>
          </div>

          {/* Medium Plan */}
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Medium</h3>
            <p className="text-gray-600 font-[Montserrat] mb-4">Up to 100 employees</p>
            <p className="text-3xl font-extrabold text-[#007A78] mb-4 font-[Quicksand]">€3000</p>
            <Button className="bg-[#29AFCA] text-white hover:bg-[#218D9C] px-6 py-3 rounded-lg font-bold">
              Get Started
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#007A78] mb-4 font-[Quicksand]">Enterprise</h3>
            <p className="text-gray-600 font-[Montserrat] mb-4">Above 100 employees</p>
            <p className="text-3xl font-extrabold text-[#007A78] mb-4 font-[Quicksand]">Custom</p>
            <Button className="bg-[#29AFCA] text-white hover:bg-[#218D9C] px-6 py-3 rounded-lg font-bold">
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#E3FF00] text-gray-800 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-[Montserrat]">
            &copy; {new Date().getFullYear()} <a href="https://lemonaid.se" className="text-[#29AFCA] hover:underline">Lemonaid Insights AB</a>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
