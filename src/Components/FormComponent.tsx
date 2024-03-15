// FormSubmitComponent.js
import React, { useEffect, useState } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";

type ErrorType = {
  price: string;
  title: string;
};

function FormSubmitComponent({ getDataForm }: any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<ErrorType>({
    price: "",
    title: "",
  });
  const [category, setCategory] = useState("tools");
  const [image, setImage] = useState("./public/vite.svg");

  const validateForm = () => {
    let isValid = true;

    if (title.length < 3) {
      setError((prev) => ({
        ...prev,
        title: "Title must be at least 3 characters long",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        title: "",
      }));
    }

    if (price < 1) {
      setError((prev) => ({
        ...prev,
        price: "Price must be at least $1",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        price: "",
      }));
    }

    return isValid;
  };

  useEffect(() => {
    if (validateForm()) {
      getDataForm({ title, price, description, category, image });
    }
  }, [title, price, description, category, image]);

  return (
    <form className="flex max-w-md flex-col gap-4 justify-center">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Enter your product title"
          required
          shadow
          onChange={(e) => setTitle(e.target.value)}
        />
        {error.title && <p className="text-red-500">{error.title}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          placeholder="Enter your product price"
          required
          shadow
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        {error.price && <p className="text-red-500">{error.price}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          placeholder="Enter your product description"
          required
          shadow
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
}

export default FormSubmitComponent;
