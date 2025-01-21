"use client";

import React from "react";
import Button from "@/components/Button";
import Image from "next/image";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-gray-800">
      {/* Header Section */}
      <header className="bg-[#007A78] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Image src="/images/dpa_logo.svg" alt="DPA Logo" width={200} height={50} />
          </div>
          <h1 className="text-5xl font-extrabold font-[Quicksand]">Unlock Organizational Potential</h1>
          <p className="mt-4 text-xl text-gray-300 font-[Montserrat]">
            Engage with 25 key questions to gain insights in just 10 minutes.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-6 py-12">
        {/* About the Assessment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#007A78] mb-6 font-[Quicksand]">Why Take This Assessment?</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6 font-[Montserrat]">
            The DP Assessment provides a snapshot of your organization’s strengths and opportunities. By answering 25 carefully crafted questions, you’ll uncover actionable insights to drive meaningful change and foster growth.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-[Montserrat]">
            Designed for modern organizations, the assessment focuses on key areas like agility, collaboration, and alignment. Your results will highlight where to focus for maximum impact.
          </p>
        </section>

        {/* Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white border rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#007A78] mb-4 font-[Quicksand]">Fast</h3>
            <p className="text-gray-600 font-[Montserrat]">
              Complete the assessment in under 10 minutes and receive immediate insights.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#007A78] mb-4 font-[Quicksand]">Insightful</h3>
            <p className="text-gray-600 font-[Montserrat]">
              Dive into results that reveal strengths and opportunities for growth.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#007A78] mb-4 font-[Quicksand]">Actionable</h3>
            <p className="text-gray-600 font-[Montserrat]">
              Walk away with clear steps to align your organization with its goals.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-[#007A78] text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4 font-[Quicksand]">Start Your Assessment Now</h2>
          <p className="text-lg mb-6 font-[Montserrat]">
            Take the first step toward transforming your organization.
          </p>
          <Button className="bg-[#29AFCA] text-white hover:bg-[#218D9C] px-6 py-3 rounded-lg font-bold">
            Begin Assessment
          </Button>
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

export default LandingPage;