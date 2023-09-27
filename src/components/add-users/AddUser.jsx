import React, { useState } from "react";
import "./addUser.css";
const AddUser = ({ newUser, setNewUser, setUsers, users }) => {
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name || newUser.email) {
      const userToAdd = {...newUser, id:Date.now().toString()}
      setUsers([userToAdd, ...users]);
      localStorage.setItem("users",JSON.stringify([userToAdd,...users]))
    } else {
      setError("Please fill all fields");
    }
    setNewUser({
      id: "",
      name: "",
      email: "",
      address: { city: "" },
      company: { name: "" },
    });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="add-user-form">
        <div className="error">
          {!newUser.name || !newUser.email ? <span>{error}</span> : null}
        </div>
        <input
          className="user-inputs"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <input
          className="user-inputs"
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
        <input
          className="user-inputs"
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              address: { ...newUser.address, city: e.target.value },
            });
          }}
        />
        <input
          className="user-inputs"
          type="text"
          placeholder="Company Name"
          value={newUser.company.name}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              company: { ...newUser.company, name: e.target.value },
            });
          }}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
