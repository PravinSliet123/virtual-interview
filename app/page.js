"use client";
import { RedirectToSignIn, useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const { isSignedIn, isLoaded } = useSession();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Ensure user exists in DB
      fetch("/api/user/profile", {
        method: "GET",
      });
    }
  }, [isLoaded, isSignedIn]);

  if (!isSignedIn) {
    redirect("/sign-in");
  }
  return <>{isSignedIn && <RedirectToSignIn />}</>;
}
