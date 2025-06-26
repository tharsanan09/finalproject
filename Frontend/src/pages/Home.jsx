
import React from 'react';
import book2 from '../assets/bookimage2.jpg';
import book5 from '../assets/book5.jpg';
import book6 from '../assets/book6.jpg';
import book7 from '../assets/book7.jpg';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';
import { useNavigate } from 'react-router-dom';







function Home() {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate('/bookdetails'); // 👈 Navigate to that page
    
  };

  const goToDetails2 = () => {
    navigate('/bookdetails2'); // 👈 Navigate to that page
    
  };

 
  return (
    <>
    {/* section 1 */}

    <section className="hero-wrapper container mt-4 position-relative">
  <h2 className="text-center fw-bold" style={{ marginTop: '60px' }}>
    Welcome To Book Buddy
  </h2>

  {/* MAIN HERO IMAGE with hover effect */}
  <img
    src={book2}
    className="img-fluid rounded-4 mt-2 hero-img hover-scale"
    alt="Books"
  />

  {/* QUOTE CARD with hover effect */}
  <div className="quote-card p-4 text-center shadow-lg rounded hover-lift mt-3">
    <h5 className="fw-bold">Books are like<br />gifts from God…</h5>
    <p className="small mb-3">
      Each page can light a path,<br />
      heal a heart, or awaken a soul.
    </p>
    <button className="btn btn-purple">Read More</button>
  </div>
</section>

 {/* section 2 book card */}
    
     <section className="py-5 ">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Discover Great Books</h2>

        <div className="row g-4 justify-content-center text-center">
          {/* Book 1 */}
          <div className="col-md-4 mb-4">
            <img src={book5} alt="Book 1" className="img-fluid book-image rounded-start-top" />
            <h5 className="fw-bold mt-3 ms-5">The Great Gatsby</h5>
            <p className="text-muted ms-5">F. Scott Fitzgerald</p>
            <button onClick={goToDetails} className="btn ms-5 btn-purple px-4 py-1 rounded-pill">Details</button>
          </div>

          {/* Book 2 */}
          <div className="col-md-4 mb-4">
            <img src={book6} alt="Book 2" className="img-fluid book-image rounded-center" />
            <h5 className="fw-bold mt-3">Beautiful</h5>
            <p className="text-muted">Alice Feeney</p>
            <button onclick={goToDetails2} className="btn btn-purple px-4 py-1 rounded-pill">Details</button>
          </div>

          {/* Book 3 */}
          <div className="col-md-4 mb-4">
            <img src={book7} alt="Book 3" className="img-fluid book-image rounded-end-top" />
            <h5 className="fw-bold mt-3 me-5">The Great Gatsby</h5>
            <p className="text-muted me-5">F. Scott Fitzgerald</p>
            <button className="btn btn-purple me-5 px-4 py-1 rounded-pill">Details</button>
          </div>
        </div>

        <div className="text-center mt-4">
         
          <button
        id="btnmore"
        className="btn btn-primary me-5 rounded-pill px-4">
        More Books
      </button>

        </div>
      </div>
    </section>
       {/* section 3 */}
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
          <h5 className="fw-bold mb-2">Home Delivery</h5>
          <p className="text-muted">Enjoy doorstep delivery and return options, hassle-free.</p>
        </div>
      </div>
    </div>

    <div className="text-center mt-5">
      <button className="btn btn-purple btn-lg rounded-pill px-5 shadow-sm">
        Get Started
      </button>
    </div>
  </div>
</section>

{/* section 4 */}


    {/* section 5 */}

    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5"> What Our Readers Say</h2>

        <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded-4 shadow-lg bg-white p-4">

            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="row justify-content-center text-center">
                <div className="col-md-8">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    className="rounded-circle mb-3 shadow"
                    width="90"
                    height="90"
                    alt="User 1"
                  />
                  <h5 className="fw-bold text-purplehome">Anjali Raj</h5>
                  <p className="text-muted small">Student, Chennai</p>
                  <div className="text-warning mb-2">
                    ★★★★☆
                  </div>
                  <p className="fst-italic">
                    "Book Buddy makes reading so accessible. I get books without leaving home!"
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="row justify-content-center text-center">
                <div className="col-md-8">
                  <img
                    src="https://randomuser.me/api/portraits/men/35.jpg"
                    className="rounded-circle mb-3 shadow"
                    width="90"
                    height="90"
                    alt="User 2"
                  />
                  <h5 className="fw-bold text-purple">Rahul Dev</h5>
                  <p className="text-muted small">Engineer, Jaffna</p>
                  <div className="text-warning mb-2">
                    ★★★★★
                  </div>
                  <p className="fst-italic">
                    "Love the 14-day rentals. Easy to borrow and great book variety!"
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div className="row justify-content-center text-center">
                <div className="col-md-8">
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    className="rounded-circle mb-3 shadow"
                    width="90"
                    height="90"
                    alt="User 3"
                  />
                  <h5 className="fw-bold text-purple">Meena Kumari</h5>
                  <p className="text-muted small">Teacher, Batticaloa</p>
                  <div className="text-warning mb-2">
                    ★★★★☆
                  </div>
                  <p className="fst-italic">
                    "Amazing UI! So smooth and convenient to borrow books online."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* Submit Feedback Button */}
        <div className="text-center mt-5">
          <button className="btn btn-outline-primary rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#feedbackModal">
            Submit Your Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="feedbackModalLabel">Share Your Feedback</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Feedback</label>
                  <textarea className="form-control" rows="3" placeholder="Write something..."></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select className="form-select">
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="1">★☆☆☆☆</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-purple w-100 rounded-pill">Submit Feedback</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* section 6 */}
    <FeedbackForm />
    
    
    <Footer />

    </>
  );
}

export default Home;