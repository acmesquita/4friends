"use client";
import Image from "next/image";
import { useState } from "react";
import { SecretFriend, DrawnResult } from "@/services/secret_friend";
import { Utils } from "@/utils"

export default function Home() {
  const [peoples, setPeoples] = useState<string[]>([])
  const [drawn, setDrawn] = useState<DrawnResult[]>()

  function addingPerson(formData: FormData) {
    const person = formData.get("name");
    if (person) {
      const person_normalize = Utils.nomalize(person.toString())
      setPeoples([...peoples, person_normalize])
    }
  }

  function sort() {
    const result = SecretFriend.sort(peoples)
    setDrawn(result)
  }

  return (
    <>
      <p className="text-green-700 text-md w-80 text-center">
        Você gostaria de fazer o sorteio do seu Amigo Oculto sem precisar de email?
        <br /><b>Esse site é para você!</b>
      </p>
      <ul>
        <ol className="text-green-700 text-md w-80 text-center">
          1. Basta adicionar o nome dos amigos que irão participar e sortear.
        </ol>
        <ol className="text-green-700 text-md w-80 text-center">
          2. Após o sorteio, cada nome se tornará um link que você pode enviar para o amigo e assim ele irá saber que ele tirou.
        </ol>
        <ol className="text-green-700 text-md w-80 text-center">
          Experimente! 🎉
        </ol>
        <ol className="text-green-700 font-semibold text-xs w-80 text-center">
          (Todos os acentos serão removidos para garantir o funcionamento)
        </ol>
      </ul>
      <ul className="w-full h-72 overflow-auto bg-yellow-100 p-2 rounded-md">
        <h2 className="font-semibold text-xl text-green-950 mb-2">
          Lista de amigos:
        </h2>
        {!drawn && peoples && peoples.map((person, i) => <li key={i}>{'->'} {person}</li>)}

        {drawn && (
          drawn.map((drawn_result) => {
            return (
              <li
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                key={drawn_result.id}
                onClick={() => {
                  navigator.share({
                    title: '4Friends',
                    text: 'Descubra quem será o seu amigo secreto',
                    url: drawn_result.short_url
                  })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
                }}
              >
                {'-> '}
                <Image
                  aria-hidden
                  src="/whatsapp.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                {drawn_result.person}
              </li>
            )
          })
        )}
      </ul>
      {peoples.length > 2 && (
        <button onClick={sort} className="flex-shrink-0 bg-yellow-900 hover:bg-yellow-700 border-yellow-900 hover:border-yellow-700 text-md border-4 text-white w-full px-3 rounded">
          {drawn ? 'Novo sorteio' : 'Sortei'}
        </button>
      )}
      <form className="w-full max-w-sm" action={addingPerson}>
        <div className="flex items-center border-b border-green-900 py-2">
          <input autoFocus id="name" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Maria" aria-label="Full name" />
          <button type="submit" className="flex-shrink-0 bg-green-900 hover:bg-green-700 border-green-900 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded">
            + Add
          </button>
        </div>
        <p className="text-sm text-gray-500 pt-2">
          Adicione 3 ou mais amigos e sortei...
        </p>
      </form>
    </>
  );
}
