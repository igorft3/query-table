import React, { useState, useEffect, useMemo } from "react";
import Resizable from "../Resizable/Resizable";
import SearchInput from "../SearchInput/SearchInput";
import Modal from "../Modal/Modal";
import "./style.css";

const headTable = ["ФИО", "Возраст", "Пол", "Телефон", "Адрес"];

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const json = await res.json();
        setUsers(json.users);
      } catch (err) {
        console.warn(err);
        console.log("Ошибка при получении информации");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const lowercasedValue = searchQuery.toLowerCase();
    return users.filter((user) =>
      Object.values(user).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowercasedValue)
      )
    );
  }, [users, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            {headTable.map((title, index) => (
              <Resizable key={index}>
                {({ ref }) => (
                  <th className="column">
                    {title}
                    <div className="resizer" ref={ref} />
                  </th>
                )}
              </Resizable>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <td>{`${item.firstName} ${item.lastName} ${item.maidenName}`}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.phone}</td>
              <td>{`${item.address.city}, ${item.address.address}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* СТруктура
      email-адрес.
      */}
      {selectedUser && (
        <Modal onClose={handleCloseModal}>
          <div className="user-details">
            <h2>
              Details for {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p>
              <strong>Full name:</strong> {console.log(selectedUser)}
              {`${selectedUser.firstName} ${selectedUser.lastName} ${selectedUser.maidenName}`}
            </p>
            <p>
              <strong>Age</strong> {selectedUser.age}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedUser.address.city}, ${selectedUser.address.address}`}
            </p>
            <p>
              <strong>Height:</strong> {selectedUser.height} cm
            </p>
            <p>
              <strong>Weight:</strong> {selectedUser.weight} kg
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
