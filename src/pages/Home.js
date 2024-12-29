
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";

// export default function Home() {
//   const [users, setUsers] = useState([]);
//   const [spUsers, setSpUsers] = useState([]); // For data from getalluserssp

//   const { id } = useParams();

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     const result = await axios.get("http://localhost:8080/users");
//     setUsers(result.data);
//   };

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:8080/user/${id}`);
//     loadUsers();
//   };

//   const getalluserssp = async () => {
//     const result = await axios.get("http://localhost:8080/userssp");
//     setSpUsers(result.data); // Save data returned from stored procedure
//   };

//   const deleteUsersp = async (id) => {
//     await axios.delete(`http://localhost:8080/usersp/${id}`);
//     loadUsers();
//   };

//   return (
//     <div className="container">
//       <div className="py-4">
//         <h2>All Users</h2>
//         <table className="table border shadow">
//           <thead>
//             <tr>
//               <th scope="col">S.R</th>
//               <th scope="col">Applicant_name</th>
//               <th scope="col">Hall_name</th>
//               <th scope="col">Email</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.application_name}</td>
//                 <td>{user.hall_name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <Link
//                     className="btn btn-primary mx-2"
//                     to={`/viewuser/${user.id}`}
//                   >
//                     View
//                   </Link>
//                   <Link
//                     className="btn btn-outline-primary mx-2"
//                     to={`/edituser/${user.id}`}
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     className="btn btn-danger mx-2"
//                     onClick={() => deleteUser(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h2>Users from Stored Procedure</h2>
//         <button className="btn btn-primary my-3" onClick={getalluserssp}>
//           Fetch Users from Stored Procedure
//         </button>
//         <table className="table border shadow">
//           <thead>
//             <tr>
//               <th scope="col">S.R</th>
//               <th scope="col">User ID</th>
//               <th scope="col">Email</th>
//               <th scope="col">Hall Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {spUsers.map((user, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.id}</td>
//                 <td>{user.email}</td>
//                 <td>{user.hall_name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [spUsers, setSpUsers] = useState([]); // For data from getalluserssp

  useEffect(() => {
    loadUsers();
  }, []);

  // Load all users from the default endpoint
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  // Fetch users via the stored procedure
  const getalluserssp = async () => {
    const result = await axios.get("http://localhost:8080/userssp");
    setSpUsers(result.data); // Save data returned from the stored procedure
  };

  // Delete user by ID from the default endpoint
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  // Delete user by ID via stored procedure endpoint
  const deleteUsersp = async (id) => {
    await axios.delete(`http://localhost:8080/usersp/${id}`);
    getalluserssp(); // Refresh the users fetched via stored procedure
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>All Users</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.R</th>
              <th scope="col">Applicant_name</th>
              <th scope="col">Hall_name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.application_name}</td>
                <td>{user.hall_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Users from Stored Procedure</h2>
        <button className="btn btn-primary my-3" onClick={getalluserssp}>
          Fetch Users from Stored Procedure
        </button>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.R</th>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th scope="col">Hall Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {spUsers.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.hall_name}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUsersp(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
