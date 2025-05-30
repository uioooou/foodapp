import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import CustomCartItem from "./CustomCartItem";

const CustomCartList = () => {
  const appContext = useContext(AppContext)!;
  const { selectedDessert, setModalState } = appContext;

  const CartFooter = () => {
    return (
      <>
        <div className="cart-total mt-4">
          <p className="font-small">Order Total</p>
          <h5 className="font-700">
            {selectedDessert && selectedDessert.length > 0
              ? `$${selectedDessert
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}`
              : ""}
          </h5>
        </div>
        <div className="d-flex align-items-center my-3 justify-content-center">
          <Image
            src="/assets/images/icon-carbon-neutral.svg"
            alt="Empty Cart"
            width={20}
            height={20}
            className="me-2"
          />
          <p className="font-small m-0">This is a carbon-neutral delivery</p>
        </div>
        <button className="cart-button">
          <p className="m-0" onClick={() => setModalState("Open")}>
            Confirm Order
          </p>
        </button>
      </>
    );
  };

  return (
    <div className="d-flex flex-column cart-content">
      <h5 className="font-red font-700 mb-4 mt-2">
        {`Your Cart (${
          selectedDessert &&
          selectedDessert.reduce((total, item) => total + item.quantity, 0)
        })`}
      </h5>

      <div className="flex-1 overflow-auto">
        {selectedDessert && selectedDessert.length > 0 ? (
          selectedDessert.map((item, index) => (
            <CustomCartItem
              key={index}
              itemName={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center flex-column text-center"
            style={{ height: "100%" }}
          >
            <Image
              src="/assets/images/illustration-empty-cart.svg"
              alt="Empty Cart"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="font-small color-rose">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>

      {selectedDessert && selectedDessert.length > 0 && <CartFooter />}
    </div>
  );
};

export default CustomCartList;
