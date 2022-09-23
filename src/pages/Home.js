import Form from "../components/Form";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useState } from "react";

const Home = () => {
  //loader
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    localStorage.setItem("user", "");
    localStorage.setItem("favs", "");
  }, []);

  return (
    <div className="main" data-testid="app">
      {isLoading && <Loader />}
      <Form setIsLoading={setIsLoading}></Form>
    </div>
  );
};
export default Home;
