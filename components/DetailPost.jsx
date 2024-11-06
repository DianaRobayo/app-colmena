"use client";

import React, { useContext } from 'react'
import { createContextApi } from '@/context/createContextApi';
import { useRouter } from 'next/navigation'

export const DetailPost = () => {

  const { dataPost } = useContext(createContextApi);
  const router = useRouter();


  return (
    <div>
      <div className="container mx-auto py-10 px-6">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
        </div>
        <div className='grid justify-items-center'>
          <h1 className="text-xl mb-4 font-bold">Detalle del post seleccionado</h1>
        </div>

        <div className="flex justify-center">
          {(dataPost) ?
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://via.placeholder.com/400x200"
                alt="Imagen de ejemplo"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-3 text-center">
                  Título: {dataPost.name}
                </div>
                <hr />
                <p className="text-gray-700 mb-3 mt-3 text-base text-left">
                  <strong> Correo: </strong> {dataPost.email}
                </p>
                <hr />
                <p className="text-gray-700 mt-3 text-base text-left">
                  <strong>Descripción:</strong> {dataPost.body}
                </p>
              </div>
              <div className="flex px-6 pt-4 pb-2 justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                  onClick={() => {
                    router.push(`/listado`)
                  }}>
                  Volver
                </button>
              </div>
            </div>
            : null}
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
        </div>
      </div>
    </div>
  )
}
