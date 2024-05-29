"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Authlayout from "../authlayout/page";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    createdAt: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://660a54c30f324a9a2884ab85.mockapi.io/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };


  const addUser = async () => {
    try {
      const response = await axios.post(
        "https://660a54c30f324a9a2884ab85.mockapi.io/users",
        newUser
      );
      setUsers([...users, response.data]);
      setNewUser({ id: "", firstName: "", lastName: "", createdAt: "" });
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const updateUser = async (id: string, updatedUser: Partial<User>) => {
    try {
      const response = await axios.put(
        `https://660a54c30f324a9a2884ab85.mockapi.io/users/${id}`,
        updatedUser
      );
      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        );
         setNewUser({ id: "", firstName: "", lastName: "", createdAt: "" });
        
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };


  const deleteUser = async (id: string) => {
    try {
      await axios.delete(
        `https://660a54c30f324a9a2884ab85.mockapi.io/users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("authenticated");
    router.push("/login");
  };

  const about = () => {
    router.push("/home/about");
  };

  const help = () => {
    router.push("/home/help");
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Authlayout>
      <div className="container">
        <>
          <h1 className="title">Welcome to the Home Page!</h1>
          <div className="addUserContainer">
            <h2>Add User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              autoComplete="off"
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              autoComplete="off"
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Created At"
              value={newUser.createdAt}
              autoComplete="off"
              onChange={(e) =>
                setNewUser({ ...newUser, createdAt: e.target.value })
              }
            />
            <button onClick={addUser}>Add User</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={about}>About</button>
            <button onClick={help}>Help</button>
          </div>
          <ul className="userList">
            {users.map((user) => (
              <li key={user.id} className="userItem">
                <div>
                  <span>ID:</span> {user.id} <br />
                  <span>First Name:</span> {user.firstName} <br />
                  <span>Last Name:</span> {user.lastName} <br />
                  <span>Created At:</span> {user.createdAt}
                </div>
                <div className="buttonsContainer">
                  <button
                    onClick={() =>
                      updateUser(user.id, {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        createdAt: newUser.createdAt,
                      })
                    }
                  >
                    Update
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      </div>
    </Authlayout>
  );
};

export default Home;
