"use client";

import React from 'react'
import { useRouter } from 'next/navigation'


export const HomePage = () => {

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`./listado`);
  }

  return (
    <>
      <div className="container mx-auto py-10 px-6">
        <form onSubmit={handleSubmit}>
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                  Aplicación interactiva de Diana blog
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Blog de post aleatorios con una serie de información
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Ver blog
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
