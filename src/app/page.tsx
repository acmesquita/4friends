"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Utils } from "@/utils";

type DrawResult = {
  id: number
  person: string
  friend: string
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
    const shufflePeoples = Utils.shuffle(peoples)

    shufflePeoples.forEach((_, i) => {
      result[i] = {
        id: i,
        person: shufflePeoples[i],
        friend: shufflePeoples[i + 1] || shufflePeoples[0]
      }
    })
    setDrawn(result)
  }

  return (
    <>
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
          params.set("person", drawn_result.person.toString());
          params.set("friend", drawn_result.friend.toString());

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
              {drawn_result.person}
            </button>
          )
        })
      )}
    </>
  );
}
