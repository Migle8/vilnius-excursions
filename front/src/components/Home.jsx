import Button from "react-bootstrap/Button";
import CreateExcursionForm from "./CreateExcursionForm";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import ExcursionList from "./ExcursionList";
import { getLoggedInUser } from "../utils/auth/authenticate";

function Home() {
  const { handleShow } = useContext(StateContext);

  const { mainBackground, homeCreateBtn, homePage, homeHeader } = styles;

  const logedInUser = getLoggedInUser();

  return (
    <>
      <div className={mainBackground}>
        <div className={homePage}>
          <h1 className={homeHeader}>VILNIUS TOURS</h1>
          {logedInUser?.data.role === "admin" ?
            <>
              <Button
                onClick={handleShow}
                variant="warning"
                className={homeCreateBtn}
              >
                Create new Excursion
              </Button>
              <CreateExcursionForm />
            </>
            :
            null
          }
        </div>
        <ExcursionList />
      </div>
    </>
  );
}

export default Home;
