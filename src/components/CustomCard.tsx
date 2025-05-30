import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartPlus, DashCircle, PlusCircle } from "react-bootstrap-icons";
import { AppContext } from "./AppContext";

interface CustomCardProps {
  imgSrc: string;
  updateImgSrc?: string;
  altText: string;
  category: string;
  title: string;
  price: number;
}

const CustomCard: React.FC<CustomCardProps> = ({
  category,
  updateImgSrc,
  imgSrc = "/photo/image-tiramisu-desktop.jpg",
  title = "Tiramisu",
  price = 4.0,
}) => {
  const [quantity, setQuantity] = useState(0);
  const appContext = useContext(AppContext);
  const { selectedDessert, setSelectedDessert } = appContext || {};

  useEffect(() => {
    if (setSelectedDessert) {
      setSelectedDessert((prev) => {
        const existingIndex = prev.findIndex((item) => item.name === title);

        if (quantity > 0) {
          const newItem = {
            imgSrc: updateImgSrc || imgSrc,
            name: title,
            price,
            quantity,
          };
          if (existingIndex !== -1) {
            // Update quantity
            const updated = [...prev];
            updated[existingIndex] = newItem;
            return updated;
          } else {
            // Add new item
            return [...prev, newItem];
          }
        } else {
          // Remove item if quantity is 0
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated.splice(existingIndex, 1);
            return updated;
          }
          return prev;
        }
      });
    }
  }, [quantity]);

  useEffect(() => {
    if (selectedDessert) {
      const existingItem = selectedDessert.find((item) => item.name === title);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [selectedDessert]);

  return (
    <div className="card-component">
      <div className="card-image-wrapper">
        <div className={`card-img ${quantity > 0 ? "active" : "inactive"}`}>
          <Image src={imgSrc} alt="Food Image" fill />
        </div>

        <div
          className="button-container"
          onClick={() => (quantity == 0 ? setQuantity(1) : {})}
        >
          <div
            className={`card-button ${quantity > 0 ? "active" : "inactive"}`}
          >
            <DashCircle
              color="white"
              onClick={() => {
                if (quantity > 0) setQuantity(quantity - 1);
              }}
              size={16}
              className={`${quantity > 0 ? "d-block" : "d-none"}`}
            />
            <div className="d-flex">
              <CartPlus
                color="#c73a0f"
                size={16}
                className={`quantity-btn me-2 ${quantity > 0 ? "d-none" : "d-block"}`}
              />
              <p className="font-small margin-0 font-600 text-center">
                {quantity > 0 ? quantity : "Add To Cart"}
              </p>
            </div>
            <PlusCircle
              color="white"
              onClick={() => setQuantity(quantity + 1)}
              size={16}
              className={`quantity-btn ${quantity > 0 ? "d-block" : "d-none"}`}
            />
          </div>
        </div>
      </div>
      <div className="card-info">
        <p className="category font-400">{category}</p>
        <p className="font-700 m-0">{title}</p>
        <p className="price font-600">{`$${Number(price).toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default CustomCard;
