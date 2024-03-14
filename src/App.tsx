import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import { Card } from "flowbite-react";
import CardComponent from "./Components/CardComponent";
import NavbarComponent from "./Components/NavbarComponent";
import FooterComponent from "./Components/FooterComponent";
import FormComponent from "./Components/FormComponent";
import FormSubmitComponent from "./Components/FormComponent";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleButtonClick = () => {
    setIsFormOpen(true);
  };
  function getDataForm(product: any) {
    setDataForm(product);
  }

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
    <div className="h-auto flex flex-col justify-between bg-cyan-50">
      <div className="sticky top-0 z-50">
        <NavbarComponent />
      </div>
      <div className="flex flex-col justify-center  mx-10 mb-2 mt-4">
        <Button onClick={handleButtonClick}>Create New Product</Button>
      </div>
      {isFormOpen && <FormSubmitComponent />}
      <div className=" w-full h-full px-10 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
        {products.map((product) => (
          <CardComponent
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
      <Modal show={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Modal.Header>Create New Product</Modal.Header>
        <Modal.Body>
          <div className="w-full">
            <FormComponent getDataForm={getDataForm} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            className="w-1/2"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button className="w-1/2" onClick={() => {}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <FooterComponent />
    </div>
  );
}
