"use client";

import React, { useContext, useEffect } from 'react'
import { createContextApi } from '@/context/createContextApi';
import { useParams } from 'next/navigation'
import { DetailPost } from '@/components/DetailPost'
import { Loading } from '@/components/Loading'

const Detail = () => {
  const param = useParams();
  const { fetchPost, loadingPost, errorPost } = useContext(createContextApi);

  useEffect(() => {
    fetchPost(param);
  }, []);


  // Asegurarse de que los datos estén disponibles antes de renderizar
  if (loadingPost) {
    return <Loading/>; 
  }

  if (errorPost) {
    return <div>{errorPost}</div>;
  }

  return (
    <div>
      <DetailPost />
    </div>
  )
}

export default Detail