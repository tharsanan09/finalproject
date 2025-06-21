
import React from 'react';
import book2 from '../assets/bookimage2.jpg';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Home() {

  return (
    <>
    {/* section 1 */}

    <section className="hero-wrapper container mt-4 position-relative">
       <h2 className="text-center fw-bold" style={{ marginTop: '60px' }}>Welcome To Book Buddy</h2>
      {/* MAIN HERO IMAGE */}
      <img src={book2} className="img-fluid rounded-4 mt-2 hero-img" alt="Books" />

      {/* QUOTE CARD */}
      <div className="quote-card p-4 text-center shadow-lg rounded">
        <h5 className="fw-bold">Books are like<br />gifts from God…</h5>
        <p className="small mb-3">
          Each page can light a path,<br />
          heal a heart, or awaken a soul.
        </p>
        <button className="btn btn-purple">Read More</button>
      </div>
    </section>
           
    {/* section 2  */}
    
    <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
  <div className="container">
    <h3 className="text-center mb-5 fw-bold text-dark">Explore Our Collection</h3>
    <div className="row justify-content-center">
      
      {/* Book Card */}
      <div className="col-md-4 col-lg-3 mb-4">
        <div className="card shadow-sm border-0 h-100 rounded-4">
          <img
            src='../assets/bookimage1.jpg'
            className="card-img-top rounded-top-4"
            alt="Book Title"
            style={{ objectFit: 'cover', height: '150px' }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title fw-semibold">Thirukkural</h5>
              <p className="card-text text-muted mb-1">by Thiruvalluvar</p>
              <p className="card-text text-primary fw-semibold">Rs. 199.00</p>
            </div>
            <button className="btn btn-outline-primary mt-3 w-60 rounded-pill">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Repeat this card for more books */}
      

    </div>
  </div>
</section>

   
    </>
  );
}

export default Home;