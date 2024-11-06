"use client";
import React, { useState, useEffect, ReactNode } from 'react'
import { createContextApi } from './createContextApi';

//props
interface ConstanstProps {
  children: ReactNode;  // Define children como ReactNode
  data: string[];        // Otro parámetro, por ejemplo, un título
}

interface Param {
  id: string;
}

// interface Post {
//   body: string;
//   email: string;
//   id: number;
//   name: string;
//   postId?: number;
//   image?: string;
// }

const DataProvider: React.FC<ConstanstProps> = ({ children, data }) => {

  const [dataUpdate, setDataUpdate] = useState(data);
  const [dataPost, setDataPost] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState('');
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState('');

  useEffect(() => {
    try {
      setLoadingData(true);
      if (dataUpdate) {
        setLoadingData(false);
      }
    } catch (error: any) {
      setLoadingData(false);
      setErrorData(error.message);
    }
  }, []);

  const fetchPost = async (param: Param) => {
    try {   
      setLoadingPost(true);
      if (param !== null) {    
        const post: any = dataUpdate.find((obj: any) => obj.id == param.id);
        setLoadingPost(false);
        setDataPost(post);
      } else {
        setLoadingPost(false);
        setErrorPost('Falta párametro');
        setDataPost([]);
      }
    } catch (error: any) {
      setDataPost([]);
      setLoadingPost(false);
      setErrorPost(error.message);
    }
  };

  // Función para actualizar el post
  const updatePost = (newData: any) => {
    setDataUpdate(newData);  // Actualiza el post con el nuevo valor
  };


  return (
    <createContextApi.Provider value={{ loadingData, errorData, fetchPost, dataPost, setDataPost, updatePost, dataUpdate, loadingPost, errorPost }}>
      {/* {props.children} */}
      {children}
    </createContextApi.Provider>
  )
}

export default DataProvider