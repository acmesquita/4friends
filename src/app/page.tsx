"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type DrawResult = {
  id: number
  person_1: string
  person_2: string
}

export default function Home() {
  const [peoples, setPeoples] = useState<string[]>([])
  const [drawn, setDrawn] = useState<DrawResult[]>()

  function addingPerson(formData: FormData) {
    const person = formData.get("name");
    if (person) {
      setPeoples([...peoples, person.toString()])
    }
  }

  function sort() {
    console.log("Sorted...")
    const result: DrawResult[] = []
    const shufflePeoples = shuffle(peoples)

    shufflePeoples.forEach((_, i) => {
      result[i] = {
        id: i,
        person_1: shufflePeoples[i],
        person_2: shufflePeoples[i + 1] || shufflePeoples[0]
      }
    })
    setDrawn(result)
  }

  function shuffle(array: string[]) {
    const result = [...array]
    let currentIndex = result.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [result[currentIndex], result[randomIndex]] = [
        result[randomIndex], result[currentIndex]];
    }

    return result
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="subpixel-antialiased font-bold tracking-wide text-blue-950 text-4xl">
        <Link href="/">4Friends</Link>
      </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="w-full h-72 overflow-auto">
          {peoples && peoples.map((person, i) => <li key={i}>{person}</li>)}
        </ul>
        <form className="w-full max-w-sm" action={addingPerson}>
          <div className="flex items-center border-b border-blue-900 py-2">
            <input autoFocus id="name" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name" />
            <button type="submit" className="flex-shrink-0 bg-blue-900 hover:bg-blue-700 border-blue-900 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
              Add
            </button>
          </div>
          <p className="text-sm text-gray-500 pt-2">Adding 3 or more person and go...</p>
        </form>
        {peoples.length > 2 && (
          <button onClick={sort} className="flex-shrink-0 bg-green-900 hover:bg-green-700 border-green-900 hover:border-green-700 text-md border-4 text-white w-full px-3 rounded">
            Sort
          </button>
        )}
        {drawn && (
          drawn.map((drawn_result) => {
            const params = new URLSearchParams();
            params.set("person_1", drawn_result.person_1.toString());
            params.set("person_2", drawn_result.person_2.toString());

            

            return (
              <button
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700 text-sm"
                key={drawn_result.id}
                onClick={() => {
                  navigator.share({
                    title: 'Web Share API Draft',
                    text: 'Take a look at this spec!',
                    url: "/result?" + params.toString(),
                  })
                  .then(() => console.log('Successful share'))
                  .catch((error) => console.log('Error sharing', error));
                }}
              >
                <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                {drawn_result.person_1}
              </button>
            )
          })
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
  );
}
