"use client";
import { FC, useState } from "react";
import { connectionType } from "@/types/connectionType";
import Connection from "./connection";
import AddConnection from "./addConnection";
import { addConnection, deleteConnection, editConnection } from "@/actions/connectionAction";

interface Props {
  connections: connectionType[];
}

const Connections: FC<Props> = ({ connections }) => {
  // State to manage the list of connection items
  const [connectionItems, setConnectionItems] = useState<connectionType[]>(connections);

  // Function to create a new connection item
  const createConnection = (text: string) => {
    const id = (connectionItems.at(-1)?.id || 0) + 1;
    addConnection(id, text);
    setConnectionItems((prev) => [...prev, { id: id, connection_url: text }]);
  };

  // Function to change the text of a connection item
  const changeConnectionText = (id: number, text: string) => {
    setConnectionItems((prev) =>
      prev.map((connection) => (connection.id === id ? { ...connection, text } : connection))
    );
    editConnection(id, text);
  };

  // Function to delete a connection item
  const deleteConnectionItem = (id: number) => {
    setConnectionItems((prev) => prev.filter((connection) => connection.id !== id));
    deleteConnection(id);
  };

  // Rendering the Connection List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16 text-black">
      <div className="text-5xl font-medium text-white">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through connectionItems and rendering Connection component for each */}
        {connectionItems.map((connection) => (
          <Connection
            key={connection.id}
            connection={connection}
            changeConnectionUrl={changeConnectionText}
            deleteConnectionItem={deleteConnectionItem}
          />
        ))}
      </div>
      {/* Adding Connection component for creating new connections */}
      <AddConnection createConnection={createConnection} />
    </main>
  );
};

export default Connections;