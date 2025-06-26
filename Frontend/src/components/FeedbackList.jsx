// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/feedback')
//       .then((res) => setFeedbacks(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3 className="text-center mb-4">What Users Say</h3>
//       <div className="row">
//         {feedbacks.map((fb) => (
//           <div className="col-md-4 mb-3" key={fb._id}>
//             <div className="card shadow-sm h-100 p-3">
//               <h5 className="fw-bold">{fb.name}</h5>
//               <p className="text-muted">{fb.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackList;
