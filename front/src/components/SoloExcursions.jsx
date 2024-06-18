
import styles from "../styles/Home.module.css";
import ExcursionList from "./ExcursionList";
// import { getLoggedInUser } from "../utils/auth/authenticate";

function SoloExcursions() {
    const { mainBackground,  homePage, homeHeader } = styles;

//   const logedInUser = getLoggedInUser();

  return (
    <>
      <div className={mainBackground}>
        <div className={homePage}>
          <h1 className={homeHeader}>VILNIUS TOURS</h1>
        </div>
        <ExcursionList />
      </div>
    </>
  );
}

export default SoloExcursions;