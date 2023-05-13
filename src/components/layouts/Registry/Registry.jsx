import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  StyledMainDiv,
  StyledRegistryDiv,
  StyledListDiv,
} from "./RegistryPage.styled";
import SignOutButton from "../../Elements/SignOutButton/SignOutButton";
import RegistrationForm from "../../RegistrationForm/RegistrationForm";
import ClientList from "../../ClientList/ClientList";

const HOST = "http://localhost:3000/registry";

export default function Registry() {
  const [registeredClients, setRegisteredClients] = useState([]);
  const [formKey, setFormKey] = useState(0);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    fetchRegisteredClients();
  }, []);

  const fetchRegisteredClients = async () => {
    try {
      const response = await axios.get(HOST);
      setRegisteredClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${clientId}`);
      setRegisteredClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addClientToList = (newClient) => {
    setRegisteredClients((prevClients) => [...prevClients, newClient]);
  };

  const editClient = (client) => {
    setEditingClient(client);
  };

  const updateClient = async (updatedClient) => {
    try {
      const response = await axios.put(
        `${HOST}/${updatedClient._id}`,
        updatedClient
      );
      if (response.status === 200) {
        setRegisteredClients((prevClients) =>
          prevClients.map((client) =>
            client._id === updatedClient._id ? response.data : client
          )
        );
        setEditingClient(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingClient(null);
  };

  const resetForm = () => {
    setFormKey((prevKey) => prevKey + 1);
  };

  // const resetForm = () => {
  //   setFormKey((prevKey) => prevKey + 1);
  // };

  return (
    <StyledMainDiv>
      <StyledRegistryDiv>
        {editingClient ? (
          <RegistrationForm
            key={editingClient._id}
            addClientToList={addClientToList}
            resetForm={resetForm}
            client={editingClient}
            updateClient={updateClient}
            cancelEdit={cancelEdit}
          />
        ) : (
          <RegistrationForm addClientToList={addClientToList} />
        )}

        <SignOutButton />
      </StyledRegistryDiv>
      <StyledListDiv>
        <ClientList
          registeredClients={registeredClients}
          deleteClient={deleteClient}
          editClient={editClient}
        />
      </StyledListDiv>
    </StyledMainDiv>
  );
}
