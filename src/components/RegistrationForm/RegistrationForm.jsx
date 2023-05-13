import React, { useState } from "react";
import axios from "axios";
import logo from "../Elements/Salonname.png";
import { StyledFormWrapper, Styledform } from "./RegistrationForm.styled";

const HOST = "http://localhost:3000/registry";

export default function RegistrationForm({
  addClientToList,
  client,
  updateClient,
  cancelEdit,
}) {
  const [name, setName] = useState(client ? client.name : "");
  const [email, setEmail] = useState(client ? client.email : "");
  const [date, setDate] = useState(client ? client.date : "");
  const [time, setTime] = useState(client ? client.time : "");

  const formatDate = (dateToBeFormed) => {
    const year = dateToBeFormed.getFullYear();
    const month = String(dateToBeFormed.getMonth() + 1).padStart(2, "0");
    const day = String(dateToBeFormed.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(new Date(date));
    const clientData = {
      name,
      email,
      date: formattedDate,
      time,
    };

    if (client) {
      // Update existing client
      clientData._id = client._id;
      try {
        const response = await axios.put(`${HOST}/${client._id}`, clientData);
        if (response.status === 200) {
          updateClient(response.data);
          cancelEdit();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add new client
      try {
        const response = await axios.post(HOST, clientData);
        if (response.status === 200) {
          addClientToList(response.data);
          setName("");
          setEmail("");
          setDate("");
          setTime("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // try {
  //     if(client){
  //         const response = await axios.put(`${HOST}/${client._id}`, clientData)
  //         if (response.status === 200) {
  //             addClientToList(response.data);
  //           }
  //     }else {
  //         const response = await axios.post(HOST, clientData);
  //         if (response.status === 200) {
  //           addClientToList(response.data);
  //         }
  //       }

  //       setName("");
  //       setEmail("");
  //       setDate("");
  //       setTime("");
  //     resetForm();
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <StyledFormWrapper>
      <img src={logo} alt="logo" />
      <Styledform onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">{client ? "Update" : "Register"}</button>
        {client && <button onClick={cancelEdit}>Cancel</button>}
      </Styledform>
    </StyledFormWrapper>
  );
}
