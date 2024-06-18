// import Button from "react-bootstrap/esm/Button";
import styles from "../styles/Home.module.css";
import MyExcursionsList from "./MyExcursionsList";

function MyExcursions() {
    const { mainBackground, homePage, homeHeader } = styles;

    return ( 
        <>
        <div className={mainBackground}>
          <div className={homePage}>
            <h1 className={homeHeader}>MY EXCURSIONS</h1>
              <>
                <MyExcursionsList />
              </>
          </div>
        </div>
      </>
     );
}

export default MyExcursions;