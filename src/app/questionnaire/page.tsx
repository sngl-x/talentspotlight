"use client";

import React, { Suspense } from "react";
import Questionnaire from "@/components/Questionnaire";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading questionnaire...</div>}>
      <Questionnaire />
    </Suspense>
  );
}
