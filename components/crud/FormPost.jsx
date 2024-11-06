"use client";

import React, { useContext, useState, useEffect } from 'react'
import { createContextApi } from '@/context/createContextApi';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { Loading } from '@/components/Loading'


export const FormPost = () => {

  const { dataUpdate, dataPost, setDataPost, updatePost, loadingPost, errorPost } = useContext(createContextApi);
  const param = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (param.id != 0) {
      // Seteo por defecto el valor de cada campo
      setValue('name', dataPost.name);
      setValue('email', dataPost.email);
      setValue('body', dataPost.body);
      setValue('id', dataPost.id);
      setValue('urlImage', dataPost.urlImage);
    }
  }, [dataPost, setValue]);

  const handleEdit = (data) => {
    if (data) {
      updatePost(dataUpdate.map(obj => obj.id == param.id ? data : obj));

      Swal.fire({
        title: 'Publicación editada correctamente!',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        setDataPost([]);
        // Redirigir
        router.push(`/listado`)
      });
    } else {
      Swal.fire({
        title: 'Erro al procesar la información',
        icon: 'error',
        confirmButtonText: 'Continuar',
      }).then(() => {
        setDataPost([]);
        // Redirigir
        router.push(`/listado`)
      });
    }
  }

  const handleCreate = (data) => {
    if (data) {
      updatePost([...dataUpdate, { id: 501, ...data }]);

      Swal.fire({
        title: 'Publicación creado correctamente!',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        setDataPost([]);
        // Redirigir
        router.push(`/listado`)
      });
    } else {
      Swal.fire({
        title: 'Erro al procesar la información',
        icon: 'error',
        confirmButtonText: 'Continuar',
      }).then(() => {
        setDataPost([]);
        // Redirigir
        router.push(`/listado`)
      });
    }
  }

  const sendData = async (data) => {
    if (param.id != 0) { // edit
      handleEdit(data);
    } else {  //crear
      handleCreate({id: dataUpdate.length + 1, ...data});
    }
  }

  // Asegurarse de que los datos estén disponibles antes de renderizar
  if (loadingPost) {
    return <Loading />;
  }

  if (errorPost) {
    return <div>{errorPost}</div>; // Manejo de errores
  }


  return (
    <div>
      <div className="container mx-auto py-10 px-6">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
        </div>
        <div className='grid justify-items-center'>
          <h1 className="text-xl mb-4 font-bold">Formulario</h1>
        </div>

        <form className='p-3' onSubmit={handleSubmit(sendData)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="">
                  <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Nombre
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        {...register("name")}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0" />
                    </div>
                  </div>
                </div>

                <div className="">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Correo electrónico
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>
                </div>

                <div className="">
                  <label htmlFor="body" className="block text-sm/6 font-medium text-gray-900">
                    Descripción
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="body"
                      name="body"
                      rows={4}
                      {...register("body")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                  </div>
                </div>

                <div className="">
                  <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                    Imagen
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="urlImage"
                          className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500" >
                          <span>Cargar imagen</span>
                          <input id="urlImage" name="urlImage"
                            type="file" className="sr-only"
                            {...register("urlImage")} />
                        </label>
                      </div>
                      <p className="text-xs/5 text-gray-600">PNG, JPG hasta 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={() => {
              setDataPost([])
              router.push(`/listado`);
            }}>
              Volver
            </button>
            <button type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
              Guardar
            </button>
          </div>
        </form>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
        </div>
      </div>
    </div>
  )
}
