import { useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newUserData, setNewUserData] = useState({
    name: "",
    age: 0,
    email: "",
    gender: "",
    city: "",
  });

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, newUserData);
    // Clear the input fields after adding a user
    setNewUserData({
      name: "",
      age: 0,
      email: "",
      gender: "",
      city: "",
    });
    alert("User created");
  };

  const updateUser = async (id, updatedData) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedData);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    // Remove the deleted user from the users state
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    alert("User deleted");
  };

  const getUsers = async () => {
    setIsLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  const handleSave = async (userId) => {
    const updatedData = {
      name: newUserData.name,
      age: newUserData.age,
      email: newUserData.email,
      gender: newUserData.gender,
      city: newUserData.city,
    };
    await updateUser(userId, updatedData);
    setIsEditing(false);
    alert("User updated");
  };

  return (
    <div className="container">
      <div className="App">
        <div className="input-container">
          {/* Input fields for creating a new user */}
          <input
            className="input-field"
            placeholder="Name..."
            value={newUserData.name}
            onChange={(event) => {
              setNewUserData({ ...newUserData, name: event.target.value });
            }}
          />
          <input
            className="input-field"
            type="Number..."
            placeholder="Age..."
            value={newUserData.age}
            onChange={(event) => {
              setNewUserData({ ...newUserData, age: Number(event.target.value) });
            }}
          />
          <input
            className="input-field"
            placeholder="Email..."
            value={newUserData.email}
            onChange={(event) => {
              setNewUserData({ ...newUserData, email: event.target.value });
            }}
          />
          <select
            className="input-field"
            value={newUserData.gender}
            onChange={(event) => {
              setNewUserData({ ...newUserData, gender: event.target.value });
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            className="input-field"
            placeholder="City..."
            value={newUserData.city}
            onChange={(event) => {
              setNewUserData({ ...newUserData, city: event.target.value });
            }}
          />
          <button onClick={createUser}>Create User</button>

          {isLoading ? (
            <div className="spinner rotate-animation"></div>
          ) : (
            <button onClick={getUsers}>Display Users</button>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Gender</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <input
                        className="input-field"
                        value={newUserData.name}
                        onChange={(event) => {
                          setNewUserData({ ...newUserData, name: event.target.value });
                        }}
                      />
                    ) : (
                      user.name
                    )}
                    </td>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <input
                        className="input-field"
                        type="number"
                        value={newUserData.age}
                        onChange={(event) => {
                          setNewUserData({ ...newUserData, age: Number(event.target.value) });
                        }}
                      />
                    ) : (
                      user.age
                    )}
                  </td>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <input
                        className="input-field"
                        placeholder="Email..."
                        value={newUserData.email}
                        onChange={(event) => {
                          setNewUserData({ ...newUserData, email: event.target.value });
                        }}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <input
                        className="input-field"
                        placeholder="Gender..."
                        value={newUserData.gender}
                        onChange={(event) => {
                          setNewUserData({ ...newUserData, gender: event.target.value });
                        }}
                      />
                    ) : (
                      user.gender
                    )}
                  </td>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <input
                        className="input-field"
                        placeholder="City..."
                        value={newUserData.city}
                        onChange={(event) => {
                          setNewUserData({ ...newUserData, city: event.target.value });
                        }}
                      />
                    ) : (
                      user.city
                    )}
                  </td>
                  <td>
                    {isEditing && editUserId === user.id ? (
                      <button onClick={() => handleSave(user.id)}>Save</button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditUserId(user.id);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
