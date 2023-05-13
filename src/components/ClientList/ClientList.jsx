import React from "react";

import { format } from "date-fns";

export default function ClientList({
  registeredClients,
  deleteClient,
  editClient,
}) {
  const handleDelete = (client) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${client.name}?`
    );
    if (confirmed) {
      deleteClient(client._id);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {registeredClients.map((client) => (
          <tr key={client._id}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{format(new Date(client.date), "yyyy-MM-dd")}</td>
            <td>{client.time}</td>
            <td>
              <button onClick={() => editClient(client)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(client)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
