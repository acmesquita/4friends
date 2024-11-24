"use client";

import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react'


function Result() {
  const searchParams = useSearchParams();
  
  if(!searchParams.get("person_1")) {
    redirect("/")
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="subpixel-antialiased font-bold tracking-wide text-blue-950 text-4xl">
        <Link href="/">4Friends</Link>
      </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {searchParams && (
          <div className="flex flex-col justify-center items-center">
            <p>{searchParams.get("person_1")} your friends is</p>
            <h2
              className="font-semibold text-4xl text-blue-950"
            >
              {searchParams.get("person_2")}
            </h2>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700 text-sm"
          href="https://github.com/acmesquita"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Criado por Catharina Mesquida
        </Link>
      </footer>
    </div>
  )
  
}

export default function Page() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}
