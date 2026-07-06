"use client";

import { useEffect } from "react";
import { initializeAI } from "../initializeAI";

export default function AIInitializer() {
  useEffect(() => {
    initializeAI();
  }, []);

  return null;
}