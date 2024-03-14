import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


function MyState(props) {
  const [mode, setMode] = useState("light");
  

  const toggleMode = () => {
    if (mode == 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
  })

  const addProduct = async () => {

    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }

    try {
      setLoading(true)
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Product Added Sucessfully");
      setTimeout(() => {
       window.location.href="/dashboard"
      },800);
      
      getProductData()
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("");
  }

  const [product,setProduct]=useState([]);

  const getProductData=async()=>{
    try {
      setLoading(true)
      const q=query(collection(fireDB,"products"),orderBy("time"))
      
      const data=onSnapshot(q,(QuerySnapshot)=>{
        let productsArray=[];
        QuerySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        });
        setProduct(productsArray);
        setLoading(false)
      })
    return ()=>data;
    } 
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  
  const edithandle=(item)=>{
      setProducts(item)
  }
  
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }



  useEffect(()=>{
    getProductData()
  },[])

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')



  return (
    <myContext.Provider value={{ mode, toggleMode, loading, setLoading ,products,setProducts,addProduct,product,edithandle,deleteProduct, searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice}}>
      {props.children}</myContext.Provider>
  )
}

export default MyState