import { useContext } from "react";
import { XCircle } from "react-bootstrap-icons";
import { AppContext } from "./AppContext";
import Image from "next/image";

interface CustomCartItemProps {
  imgSrc?: string;
  itemName?: string;
  quantity?: number;
  price?: number;
  removeItem?: boolean;
}

const CustomCartItem: React.FC<CustomCartItemProps> = ({
  imgSrc,
  quantity = 0,
  itemName,
  price = 0,
  removeItem = true,
}) => {
  const appContext = useContext(AppContext);
  const { setSelectedDessert } = appContext || {};

  const handleRemoveItem = () => {
    if (setSelectedDessert) {
      setSelectedDessert((prev) => {
        const existingIndex = prev.findIndex((item) => item.name === itemName);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated.splice(existingIndex, 1);
          return updated;
        }
        return prev;
      });
    }
  };

  return (
    <div className="d-flex pt-3 pb-3">
      {imgSrc && (
        <div className="aspect-ratio-1x1 me-3">
          <Image
            src={imgSrc}
            alt={itemName || "Dessert Image"}
            width={50}
            height={50}
            className="cart-item-image"
          />
        </div>
      )}

      <div>
        <p className="font-small font-700 m-0 mb-1">{itemName}</p>
        <div className="cart-item-info">
          <p className="item-number">{quantity}x</p>
          <p className="item-price">{`$${price.toFixed(2)}`}</p>
          <p>${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      {removeItem && (
        <div className="ms-auto">
          <XCircle
            className="cursor-pointer"
            color="hsl(7, 20%, 60%)"
            size={20}
            onClick={handleRemoveItem}
          />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default CustomCartItem;
