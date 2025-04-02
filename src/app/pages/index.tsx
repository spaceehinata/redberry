import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dropdown Menu</h1>
      <Dropdown
        title="დეპარტამენტი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/departments"
      />
      <Dropdown
        title="პრიორიტეტი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/priorities"
      />
      <Dropdown
        title="თანამშრომელი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/employees"
      />
    </div>
  );
};

export default Home;
