"use client";

import { SecretFriend } from "@/services/secret_friend";
import { useSearchParams } from "next/navigation";


export function Result() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")

  if (!code) {
    return (
      <>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-3xl text-green-950">
            Error, try again.
          </h2>
        </div>
      </>
    )
  }

  const drawnResult = SecretFriend.deconded_short_url(code)

  return (
    <>
      {drawnResult && (
        <div className="flex flex-col justify-center items-center">
          <p>{drawnResult.person} your friends is</p>
          <h2
            className="font-semibold text-3xl text-green-950"
          >
            {drawnResult.friend}
          </h2>
        </div>
      )}
    </>
  )

}
