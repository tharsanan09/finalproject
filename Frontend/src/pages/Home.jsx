
import React from 'react';
import bookhome from '../assets/bookimage2.jpg';
import book1 from '../assets/book1.jpeg';
import book2 from '../assets/book2.jpeg';
import book3 from '../assets/book3.jpeg';
import book7 from '../assets/book7.jpg';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import FeedBackForm from '../pages/FeedBackForm';
import { Link } from 'react-router-dom';


function Home() {
  
  return (
    <>
    {/* section 1 */}
    <section className="hero-wrapper container mt-4 position-relative">
  <h2 className="text-center fw-bold" style={{ marginTop: '60px' }}>
    Welcome To Book Buddy
  </h2>

  {/* MAIN HERO IMAGE with hover effect */}
  <img
    src={bookhome}
    className="img-fluid rounded-4 mt-2 hero-img hover-scale"
    alt="Books"
  />

  {/* QUOTE CARD */}
  <div className="quote-card p-4 text-center shadow-lg rounded hover-lift mt-3">
    <h5 className="fw-bold">Books are like<br />gifts from God…</h5>
    <p className="small mb-3">
      Each page can light a path,<br />
      heal a heart, or awaken a soul.
    </p>
    <button className="btn btn-purple">Get Start</button>
  </div>
</section>

 {/* section 2 */}
       <section className="borrow-highlight py-5" style={{ background: 'linear-gradient(to right, #f0f0f0, #e0e0e0)' }}>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold text-dark">Borrow Books with Ease</h2>
      <p className="text-muted">Flexible rentals, instant approvals, and a library at your fingertips.</p>
    </div>

    <div className="row justify-content-center g-4">
      {/* Card 1 */}
      <div className="col-md-4">
        <div className="card glass-card p-4 h-100 shadow-lg border-0 text-center">
          <div className="mb-3">
            <i className="bi bi-journal-bookmark-fill fs-1 text-purple"></i>
          </div>
          <h5 className="fw-bold mb-2">Wide Book Collection</h5>
          <p className="text-muted">Choose from novels, biographies, comics, and more — all in one place.</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-md-4">
        <div className="card glass-card p-4 h-100 shadow-lg border-0 text-center">
          <div className="mb-3">
            <i className="bi bi-clock-history fs-1 text-purple"></i>
          </div>
          <h5 className="fw-bold mb-2">Flexible Borrowing</h5>
          <p className="text-muted">Borrow for 14 days with easy extension options and minimal late fees.</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-md-4">
        <div className="card glass-card p-4 h-100 shadow-lg border-0 text-center">
          <div className="mb-3">
            <i className="bi bi-truck fs-1 text-purple"></i>
          </div>
          <h5 className="fw-bold mb-2">Clear Ui/UX</h5>
          <p className="text-muted">With a clean, intuitive interface, our book borrowing app and manage your profile with just a few taps.</p>
        </div>
      </div>
    </div>

   
  </div>
</section>

 {/* section 3 book card */}
    
     <section className="py-5 ">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Discover Great Books</h2>

        <div className="row g-4 justify-content-center text-center">
          {/* Book 1 */}
          <div className="col-md-4 mb-4 ">
            <img src={book1} alt="Book 1" className="img-fluid book-image rounded-start-top hover-scale" />
            <h5 className="fw-bold mt-3 ms-5">The Great Gatsby</h5>
            <p className="text-muted ms-5">F. Scott Fitzgerald</p>
            <Link to="/books"  className="btn ms-5 btn-purple px-4 py-1 rounded-pill">Details</Link>
          </div>

          {/* Book 2 */}
          <div className="col-md-4 mb-4">
            <img src={book2} alt="Book 2" className="img-fluid book-image rounded-center hover-scale" />
            <h5 className="fw-bold mt-3">Beautiful</h5>
            <p className="text-muted">Alice Feeney</p>
            <Link to="/books" className="btn btn-purple px-4 py-1 rounded-pill">Details</Link>
          </div>

          {/* Book 3 */}
          <div className="col-md-4 mb-4">
            <img src={book3} alt="Book 3" className="img-fluid book-image rounded-end-top hover-scale" />
            <h5 className="fw-bold mt-3 me-5">The Great Gatsby</h5>
            <p className="text-muted me-5">F. Scott Fitzgerald</p>
            <button className="btn btn-purple me-5 px-4 py-1 rounded-pill">Details</button>
          </div>
        </div>

        <div className="text-center mt-4">
         
          <Link to="/books" id="btnmore"className="btn  me-5 rounded-pill px-4">More Books</Link>

        </div>
      </div>
    </section>

      

{/* section 4 */}


 <section className="bg-light py-5 mt-5 rounded-4 shadow-sm">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side Text */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold text-purple">About Our Book Borrowing App</h2>
            <p className="text-muted mt-3">
              Our mission is to make reading more accessible and collaborative. This app allows users to borrow books, lend their own, and enjoy reading without limits.
            </p>
            <ul className="list-unstyled text-muted">
              <li> Explore a vast collection of books</li>
              <li> Borrow and return books easily</li>
              <li> Share your own books with others</li>
              <li> Track rent and return dates</li>
              <li> Automatic late fee calculation</li>
            </ul>
            <p className="mt-3 text-muted">Start borrowing books today and spread the joy of reading!</p>
          </div>

          {/* Right Side Image */}
          <div className="col-md-6 text-center">
            <img src={book7} alt="Books Illustration" className="img-fluid rounded-4 hover-scale" style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
      </div>
    </section>


    {/* section 5 */}

    

    {/* section 6 */}
  
    <FeedBackForm />
    
    <Footer />

    </>
  );
}

export default Home;