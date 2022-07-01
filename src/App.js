import { React, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';

function App() {
  let skip = 0;
  const [productsData, setProductsData] = useState(() => []);
  const [apiLoading, setApiLoading] = useState(() => false);

  const apiCall = async () => {
    if (skip > 100) {
      return true;
    }
    setApiLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=5`);
      const addOnProductsData = response.data.products
      setProductsData(prevproductsData => [...prevproductsData, ...addOnProductsData]);
      setApiLoading(false);
    } catch (error) {
      console.log(error);
      setApiLoading(false);
    }

    skip += 5;
  }

  const handleScroll = (e) => {
    const topGap = e.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const totalHeight = e.target.documentElement.scrollHeight;

    if (topGap + windowHeight + 1 >= totalHeight) {
      apiCall();
    }
  }

  useEffect(() => {
    apiCall()
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <section className="products">
        <div className="container">
          <div className="row">
            {productsData.map((item, index) => (
              <div className="col-md-4 pb-5" key={index}>
                <div className="card text-center">
                  <div id={`carouselNumber${item.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {item.images.map((img, imgindex) => (
                        <div className={imgindex === 0 ? "carousel-item active" : "carousel-item"} key={imgindex}>
                          <img src={img} className="d-block w-100" alt={`${item.title + ' image ' + (imgindex + 1)}`} />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselNumber${item.id}`} data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselNumber${item.id}`} data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {apiLoading &&
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
