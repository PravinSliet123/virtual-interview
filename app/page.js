"use client";
import { RedirectToSignIn, useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default function Home() {
  const { isSignedIn, isLoaded } = useSession();
  if (!isSignedIn) {
    redirect("/sign-in");
  }
  return <>{isSignedIn && <RedirectToSignIn />}</>;
}
