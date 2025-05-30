import { useContext, useEffect, useState } from "react";
import { CheckCircle } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "./AppContext";
import CustomCartItem from "./CustomCartItem";

const CustomModal = () => {
  const context = useContext(AppContext)!;
  const { selectedDessert, setSelectedDessert, modalState, setModalState } =
    context;
  const [screenPhone, setScreenPhone] = useState(false);

  const handleClose = () => {
    setModalState("Close");
    setSelectedDessert([]);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 470) {
        setScreenPhone(true);
      } else {
        setScreenPhone(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Modal
        show={modalState == "Open"}
        onHide={handleClose}
        centered={!screenPhone}
      >
        <div className="p-3">
          <Modal.Body className="d-flex flex-column">
            <CheckCircle size={36} color="green" />
            <h1 className="font-700 mt-5">Order Confirmed</h1>
            <p className="font-small">We hope you enjoy your food</p>
            <div className="cart-modal-content overflow-y-auto px-2">
              {selectedDessert &&
                selectedDessert.length > 0 &&
                selectedDessert.map((item, index) => (
                  <CustomCartItem
                    removeItem={false}
                    key={index}
                    itemName={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    imgSrc={item.imgSrc}
                  />
                ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="cart-total mt-4 px-2">
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
            <button className="cart-button">
              <p className="m-0" onClick={handleClose}>
                Start New Order
              </p>
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
