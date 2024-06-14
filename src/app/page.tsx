"use client";


import AuthService from "@/services/auth/storetoken";
import { redirect } from "next/navigation";


export default function Home() {
  if (AuthService.getAccessToken()) redirect("/dashboard");
  redirect("/login");
}
