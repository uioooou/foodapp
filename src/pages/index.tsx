import CustomCard from "@/components/CustomCard";
import CustomCartList from "@/components/CustomCartList";
import CustomModal from "@/components/CustomModel";
import Data from "@/data/data.json";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [screenPhone, setScreenPhone] = useState(false);
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
      <Head>
        <title>Food App</title>
        <meta name="description" content="Delicious Food Ordering" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div className="main-container">
            <section className="mx-2 mb-5">
              <h3 className="font-700 mb-4 mt-2">Desserts</h3>
              <div className="dessert-container">
                {Data.map((item, index) => (
                  <CustomCard
                    key={index}
                    updateImgSrc={item.image.desktop}
                    imgSrc={
                      screenPhone ? item.image.mobile : item.image.desktop
                    }
                    altText={item.name}
                    category={item.category}
                    price={item.price}
                    title={item.name}
                  />
                ))}
              </div>
            </section>
            <section className="h-100">
              <div className="position-sticky top-0 background-light">
                <CustomCartList />
              </div>
            </section>
          </div>
        </div>
      </main>
      <CustomModal />
    </>
  );
};

export default Home;
