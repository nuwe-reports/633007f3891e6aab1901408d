import Form from "../components/Form";
import { useEffect } from "react";
import Loader from "../components/Loader";
const Home = ({ isLoading }) => {
  useEffect(() => {
    localStorage.setItem("user", "");
    localStorage.setItem("favs", "");
  }, []);

  return (
    <div className="main" data-testid="app">
      {isLoading && <Loader />}
      <Form></Form>
    </div>
  );
};
export default Home;
