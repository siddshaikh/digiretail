import React, { useEffect, useState } from "react";
import "./users.css";
import axios from "axios";
import AddUser from "./add-users/AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [eror, setError] = useState("");
  console.log(users);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    address: { city: "" },
    company: { name: "" },
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response) {
        localStorage.setItem("users", JSON.stringify(response.data));
      }
    } catch (err) {
      <div>kuchh to gadbad hai daya</div>;
    }
  };
  useEffect(() => {
    fetchData();
    const savedData = localStorage.getItem("users");
    if (savedData !== null && savedData !== "") {
      setUsers(JSON.parse(savedData));
    }
  }, [eror]);
  //   delete user
  const handleDelete = (id) => {
    const upDatedUsers = users.filter((user) => user.id !== id);
    setUsers(upDatedUsers);
    localStorage.setItem("users", JSON.stringify(upDatedUsers));
  };
  //   popup on of
  const handlePopup = () => {
    setIsModelOpen(!isModalOpen);
  };
  //   search the data
  const handleSearch = () => {
    const data = setUsers([...users].filter(({ name }) => name === searchData));
    if (!data) {
      setError("No user found");
      setSearchData("")
      fetchData()
      setError("")
    }
  };
  return (
    <div>
      {/* header */}
      <div className="header">
        <input
          type="text"
          className="search-box"
          placeholder="Search for the user..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>
          Search User
        </button>
      </div>
      <div className="flex">
        <h2>User List</h2>
        <button className="btn add-btn" onClick={handlePopup}>
          {isModalOpen ? "Close" : "Add Users"}
        </button>
      </div>
      {/* line */}
      <div className="flex">
        <hr style={{ width: "60%" }} />
      </div>
      {/* add user modal popup */}
      {isModalOpen && (
        <AddUser
          close={setIsModelOpen}
          refresh={() => fetchData()}
          setNewUser={setNewUser}
          newUser={newUser}
          setUsers={setUsers}
          users={users}
        />
      )}
      {/* users table */}
      <span>{eror !== "" && <span>{eror}</span>}</span>
      <div className="user-cards">
        {users ? (
          users.map((users) => (
            <div className="card flex" key={users.id}>
              <div className="first">
                <span>
                  <b>Name:</b> {users.name}
                </span>
                <br />
                <span>
                  <b>Email:</b> {users.email}
                </span>
                <br />
                <span>
                  <b>Address:</b> {users.address.city}
                </span>
                <br />
                <span>
                  <b>Company Info:</b> {users.company.name}
                </span>
              </div>
              {/* second */}
              <div className="second">
                <button className="btn" onClick={() => handleDelete(users.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <span>Loading Data...</span>
        )}
      </div>
    </div>
  );
};

export default Users;
