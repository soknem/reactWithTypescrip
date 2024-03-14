import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import CardComponent from "./Components/CardComponent";
import NavbarComponent from "./Components/NavbarComponent";
import FooterComponent from "./Components/FooterComponent";

type Status = "idle" | "loading" | "sucess" | "error";
type Products = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState<Status>("idle");
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setStatus("sucess");
        setProducts(data);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);
  if (status === "loading")
    return (
      <h1 className="h-screen grid place-content-center text-6xl">
        {/* <Spinner aria-label="Default status example" /> */}
      </h1>
    );
  return (
    <div className="h-screen bg-cyan-100 flex flex-col justify-between ">
      <NavbarComponent/>
      <div className="w-full h-full px-10 py-2">
        {
          products.map((product)=>(
            <CardComponent
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            />
          ))
        }

      </div>
      <FooterComponent/>
    </div>
  );
}
