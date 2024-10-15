// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Test = () => {
//   const [csrfToken, setCsrfToken] = useState('');
  
//   // Đặt URL của server Django tại đây
//   const djangoServerUrl = 'http://127.0.0.1:8000';

//   // Hàm lấy CSRF token từ Django API
//   const getCsrfToken = async () => {
//     try {
//       const response = await axios.get(`${djangoServerUrl}/csrf/`);  // Sử dụng URL để lấy CSRF
//       setCsrfToken(response.data.csrfToken);
//       console.log('CSRF Token:', response.data.csrfToken);
//     } catch (error) {
//       console.error('Error fetching CSRF token:', error);
//     }
//   };

//   // Gọi hàm khi component mount
//   useEffect(() => {
//     getCsrfToken();
//   }, []);

//   // Gọi một API khác với CSRF Token
//   const registerUser = async () => {
//     try {
//       const response = await axios.post(
//         `${djangoServerUrl}/user/api/userauths/register/`,  // Sử dụng URL server cho request
//         { username: 'new_user', email: 'new_user@example.com', password: 'password123' },
//         {
//           headers: {
//             'X-CSRFToken': csrfToken,  // Sử dụng CSRF Token lấy từ API
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,  // Đảm bảo cookie được gửi kèm
//         }
//       );
//       console.log('Registration successful:', response.data);
//     } catch (error) {
//       console.error('Error during registration:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Click the button to register user</h1>
//       <button onClick={registerUser}>Register User</button>
//     </div>
//   );
// };

// export default Test;
