"use client";

import React, { useContext, useState } from 'react'
import { createContextApi } from '@/context/createContextApi';
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/Loading'
import { MdEdit, MdOutlineRemoveRedEye, MdDelete, MdCreateNewFolder } from "react-icons/md";



export const List = () => {
  const { dataUpdate, loadingData, errorData, updatePost } = useContext(createContextApi);
  const [itemsPage, setItemsPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(dataUpdate?.slice(0, itemsPage));
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const [searchItem, setSearchItem] = useState('');


  // Filtra la palabra que se desea buscar
  const filterItem = items?.filter(obj =>
    obj.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    obj.body.toLowerCase().includes(searchItem.toLowerCase())
  );

  /* Metodo que permite calcular el limite de post en la pantalla */
  const fetchMoreData = () => {
    let currentPageFn = currentPage;
    currentPageFn++;
    setCurrentPage((currentPage) => currentPage + 1);
    const lengthPage = currentPageFn * itemsPage;
    setItems(dataUpdate.slice(0, lengthPage))
  };

  const handleDelete = (id) => {
    if (id) {
      updatePost(dataUpdate.filter(obj => obj.id != id));
      setItems(dataUpdate.filter(obj => obj.id != id));
    }
  }

  // Asegurarse de que los datos estén disponibles antes de renderizar
  if (loadingData) {
    return <Loading/>;
  }

  if (errorData) {
    return <div>{errorData}</div>;
  }

  return (
    <div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c3fdcd] to-[#a8aafa] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>
         <Loading/>
        </div>}>
        <div className="container mx-auto py-10 px-6">
          <div className='grid justify-items-center'>
            <h1 className="text-xl mb-4 font-bold">Buscar publicaciones</h1>
            <input type="text" className="p-2 w-80 border border-gray-300 rounded-md mb-4"
              placeholder="Busca por título o contenido..." value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)} />
          </div>

          <div className="flex px-6 pt-4 pb-2 justify-start gap-4">
            <span className=''>Crear blog</span>
            <button className="py-1 px-2 bg-green-500 rounded-full"
              onClick={() => {
                router.push(`/edit/0`)
              }}>
              <MdCreateNewFolder className="h-6 w-6 text-white" />
            </button>
          </div>

          {filterItem && filterItem?.length === 0 ? (
            <p className="mt-4">No hay información con el filtro ingresado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filterItem &&
                filterItem.map((item) =>
                  <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg" suppressHydrationWarning={true}>


                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-center">
                        {item.name}
                      </div>
                      <p className="text-gray-700 text-base text-left">
                        {item.body}
                      </p>
                    </div>

                    <div className="flex px-6 pt-4 pb-2 justify-end gap-4">
                      <button className="py-1 px-2 bg-green-500 rounded-full"
                        onClick={() => {
                          router.push(`/detail/${item.id}`)
                        }}>
                        <MdOutlineRemoveRedEye className="h-4 w-4 text-white" />
                      </button>
                      <button className="py-1 px-2 bg-green-500 rounded-full"
                        onClick={() => {
                          router.push(`/edit/${item.id}`)
                        }}>
                        <MdEdit className="h-4 w-4 text-white" />
                      </button>
                      <button className="py-1 px-2 bg-green-500 rounded-full"
                        onClick={() => {
                          handleDelete(item.id)
                        }}>
                        <MdDelete className="h-4 w-4 text-white" />
                      </button>
                    </div>

                  </div>
                )}
            </div>
          )}
        </div>
      </InfiniteScroll>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#94ffa6] to-[#5f62f8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
      </div>

    </div>
  )
}
