import { PuppyData } from "../types";

interface IPuppyComponentProps {
  puppy: PuppyData;
}

const Puppy = ({ puppy }: IPuppyComponentProps) => {
  const deletePuppy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`https://localhost:7253/api/Puppies/${puppy.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  };

  return (
    <div className="puppy-container">
      <div className="">
        <div className="line">
          <p className="line-left">Name: </p>
          <h3>{puppy.name}</h3>
        </div>
        <div className="line">
          <p className="line-left">Breed: </p>
          <p>{puppy.breed}</p>
        </div>
        <div className="line">
          <p className="line-left">Birth Date: </p>
          <p>
            <small> {puppy.birthDate.substring(0, 10)}</small>
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={deletePuppy}>
          <input
            className="delete-button"
            type="submit"
            value="Delete"
            onChange={() => console.log("Puppy deleted")}
          />
        </form>
      </div>
    </div>
  );
};

export default Puppy;
