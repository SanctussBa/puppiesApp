import React, { useEffect, useState } from "react";
import "./App.css";
import { CreatePuppy, PuppyData } from "./types";
import Puppy from "./Components/Puppy";
import AddPuppyForm from "./Components/AddPuppyForm";

function App() {
  const PuppyFormEmpty = {
    breed: "",
    name: "",
    birthDate: "",
  };
  const [puppies, setPuppies] = useState<PuppyData[]>([]);
  const [newPuppy, setNewPuppy] = useState<CreatePuppy>(PuppyFormEmpty);

  const createNewPuppy = async (newPuppy: CreatePuppy) => {
    fetch("https://localhost:7253/api/Puppies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPuppy),
    }).then((response) => response.json());

    setNewPuppy(PuppyFormEmpty);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewPuppy(newPuppy);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setNewPuppy({ ...newPuppy, [e.target.name]: value });
  };

  useEffect(() => {
    const getPuppies = async () => {
      const response = await fetch("https://localhost:7253/api/Puppies");
      const allPuppies = await response.json();

      setPuppies(allPuppies);
    };
    getPuppies();
  });

  return (
    <div className="App">
      <h1 className="title">Puppies are cute!<span>🐶</span></h1>
      <div className="main-container">
        <div className="left-container">
          <h2 className="add-puppy">Add new Puppy 💚</h2>

          <AddPuppyForm
            setNewPuppy={setNewPuppy}
            newPuppy={newPuppy}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="right-container">
          <h2 className="select-puppy">List of Puppies 💛</h2>

          {puppies.map((puppy, index) => {
            return <Puppy puppy={puppy} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
