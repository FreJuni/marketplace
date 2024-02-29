import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";

const Main = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto">
        <Nav />
        <Outlet />
      </section>

    </>
  );
};

export default Main;
