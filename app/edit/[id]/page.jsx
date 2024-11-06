"use client";

import React, { useContext, useEffect } from 'react'
import { createContextApi } from '@/context/createContextApi';
import { useParams } from 'next/navigation'
import { FormPost } from '@/components/crud/FormPost'
import { Loading } from '@/components/Loading'

const Edit = () => {
  const param = useParams();
  const { fetchPost, loadingPost, errorPost } = useContext(createContextApi);

  useEffect(() => {
    (async () => {
      fetchPost(param);
    })();
  }, [param]);


  // Asegurarse de que los datos estén disponibles antes de renderizar
  if (loadingPost) {
    return <Loading/>;
  }

  if (errorPost) {
    return <div>{errorPost}</div>;
  }

  return (
    <div>
      {(!loadingPost) ?
        <FormPost />
        : null}

    </div>
  )
}

export default Edit