import Form from "../components/Form";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    localStorage.setItem("user", "");
  }, []);

  return (
    <div className="main">
      <Form></Form>
    </div>
  );
};
export default Home;
