import React from "react";
import { CreatePuppy } from "../types";

interface IAddPuppyFormProps {
  newPuppy: CreatePuppy;
  setNewPuppy: React.Dispatch<React.SetStateAction<CreatePuppy>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddPuppyForm = ({
  setNewPuppy,
  newPuppy,
  handleChange,
  handleSubmit,
}: IAddPuppyFormProps) => {
  return (
    <form className="add-puppy-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={newPuppy.name}
        onChange={handleChange}
      />
      <br></br>

      <label>Breed</label>
      <input
        type="text"
        name="breed"
        value={newPuppy.breed}
        onChange={handleChange}
      />
      <br></br>

      <label>Birth Date</label>
      <input
        type="date"
        name="birthDate"
        value={newPuppy.birthDate}
        onChange={handleChange}
      />
      <br></br>

      <input className="add-puppy-button" type="submit" value="Add Puppy" />
    </form>
  );
};

export default AddPuppyForm;
