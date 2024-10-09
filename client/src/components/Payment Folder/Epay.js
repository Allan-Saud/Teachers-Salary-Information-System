// import React from 'react';
// import axios from 'axios'; 
// import { useLocation } from "react-router-dom";


// function Epay() {
//     const location = useLocation();
    
//     const amt = new URLSearchParams(location.search).get('amount') || 0;

//     const handleSubmit = async (ev) => {
//         ev.preventDefault();

//         const data = {
//             amount: amt,
//         };

//         await axios.post('http://localhost:9000/payment', {
//             data
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(res => esewaCall(res.data.formData)).catch(err => console.log("Payment ERROR", err));
//     };
//     const esewaCall = (formData) => {
//         console.log(formData);
//         var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

//         var form = document.createElement("form");
//         form.setAttribute("method", "POST");
//         form.setAttribute("action", path);
       

//         for (var key in formData) {
//             var hiddenField = document.createElement("input");
//             hiddenField.setAttribute("type", "hidden");
//             hiddenField.setAttribute("name", key);
//             hiddenField.setAttribute("value", formData[key]);
//             form.appendChild(hiddenField);
//         }

//         document.body.appendChild(form);
//         form.submit();
//     };

//   return (
    
//     <div>
//           <div className="min-h-screen flex items-center justify-center">
//             <div className="text-black rounded bg-blue-300 p-8 shadow-lg">
//                 <h1 className="text-3xl font-bold mb-4">Payment</h1>
//                 <div className="mb-4">
//                     <p className="text-lg">Total Amount: <span className="text-sm">{amt}</span></p>
//                 </div>
//                 <button onClick={handleSubmit} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
//                     Continue to Payment
//                 </button>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default Epay;


// import React from 'react';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";

// function Epay() {
//     const location = useLocation();
//     const amt = new URLSearchParams(location.search).get('amount') || 0;

//     const handleSubmit = async (ev) => {
//         ev.preventDefault();

//         const data = {
//             amount: amt,
//         };

//         await axios.post('http://localhost:9000/payment', {
//             data
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(res => esewaCall(res.data.formData)).catch(err => console.log("Payment ERROR", err));
//     };

//     const esewaCall = (formData) => {
//         console.log(formData);
//         var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

//         var form = document.createElement("form");
//         form.setAttribute("method", "POST");
//         form.setAttribute("action", path);

//         for (var key in formData) {
//             var hiddenField = document.createElement("input");
//             hiddenField.setAttribute("type", "hidden");
//             hiddenField.setAttribute("name", key);
//             hiddenField.setAttribute("value", formData[key]);
//             form.appendChild(hiddenField);
//         }

//         document.body.appendChild(form);
//         form.submit();
//     };

//     return (
//         <div>
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-black rounded bg-blue-300 p-8 shadow-lg">
//                     <h1 className="text-3xl font-bold mb-4">Payment</h1>
//                     <div className="mb-4">
//                         <p className="text-lg">Total Amount: <span className="text-sm">{amt}</span></p>
//                     </div>
//                     <button onClick={handleSubmit} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
//                         Continue to Payment
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Epay;


