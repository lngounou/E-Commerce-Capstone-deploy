import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function CreateProduct() {

    const [error, setError] = useState(null);
    const auth = sessionStorage.getItem('token');
    //crossOriginIsolated.log('token from login(storage):', token);
    const navigate = useNavigate();
    //const [isAdmin, setIsAdmin] = useState("");
    const [deleteProduct, setDeleteProduct] = useState("");
    //const auth = useSelector((state) => state.auth);
    //if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [img_url, setImg_url] = useState("");
    //const [isAdmin, setIsAdmin] = useState(true);

    async function handleSubmit(event) {
      event.preventDefault() 
      //if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;
      
        




        try {
          if (isAdmin === 'true') {

      const response = await fetch("http://localhost:3000/api/products/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, description, price, img_url }),

      })}
      const result = await response.json();
      console.log(result);
      toast("New Product is successfully added.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
               
                if (result.success) {
                    navigate('/')
                  }
                } catch (error) {
                  setError(error)
                }
            }
            return (
                <form onSubmit={handleSubmit}>
      <h1 class='goldfont slightpadding'>Create a New Product</h1>
     
       
      
      <label class='goldfont slightpadding' htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label class='goldfont slightpadding' htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label class='goldfont slightpadding' htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label class='goldfont slightpadding' htmlFor="img_url">Img_url</label>
      <input
        type="text"
        id="img_url"
        value={img_url}
        onChange={(e) => setImg_url(e.target.value)}
      />

      <button className="create"  class='sleekbutton'>Create</button>
    </form>
  )
            }
 








