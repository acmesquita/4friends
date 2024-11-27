"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from 'react'


function Result() {
  const searchParams = useSearchParams();

  if (!searchParams.get("person")) {
    redirect("/")
  }

  return (
    <>
      {searchParams && (
        <div className="flex flex-col justify-center items-center">
          <p>{searchParams.get("person")} your friends is</p>
          <h2
            className="font-semibold text-4xl text-blue-950"
          >
            {searchParams.get("friend")}
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
