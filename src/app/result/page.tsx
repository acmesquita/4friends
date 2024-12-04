"use client";

import { SecretFriend } from "@/services/secret_friend";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from 'react'


function Result() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")

  if (!code) {
    redirect("/")
  }

  const drawnResult = SecretFriend.deconded_short_url(code)

  return (
    <>
      {searchParams && (
        <div className="flex flex-col justify-center items-center">
          <p>{drawnResult.person} your friends is</p>
          <h2
            className="font-semibold text-4xl text-blue-950"
          >
            {drawnResult.friend}
          </h2>
        </div>
      )}
    </>
  )

}

export default function Page() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}
