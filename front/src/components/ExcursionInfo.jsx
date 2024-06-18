import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import excursionsStyle from "../styles/ExcursionInfo.module.css";
import DeleteExcursion from "./DeleteExcursion";
import EditExcursion from "./EditExcursion";
import { getLoggedInUser } from "../utils/auth/authenticate";
import RegisterToExcursion from "./RegisterToExcursionModal";

function ExcursionInfo() {
  const [allExcursions, setAllExcursions] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { excursions, categories } = useContext(StateContext);

  const { id } = useParams();

  const logedInUser = getLoggedInUser();

  const fexcursion = allExcursions.find((excursion) => excursion._id === id);

  const { mainBackground, homeHeader } = styles;
  const { excursionBackBtn, excursionInfoPage, excursionPage, excursionInformation, excursionImage, excursionShortInfo, excursionDate, excursionTime, excursionDuration, excursionPrice, excursionCategory, excursionDescription, excursionButtons, registerText } = excursionsStyle;

  // console.log(fexcursion);

  // const {name, description} = fexcursion;
  // console.log(id, excursions);
  // console.log(fexcursion);

  // let {name} = fexcursion;

  const handleShowDelete = () => { setShowDelete(true) };

  const handleShowEdit = () => { setShowEdit(true) };

  const handleShowRegister = () => { setShowRegister(true) };

  useEffect(() => {
    setAllExcursions(excursions);
  }, [excursions]);

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown Category";
  };

  return (
    <>
      <div className={mainBackground}>
        <div className={excursionBackBtn}>
          <Link to={"/"}>
            <Button variant="warning">
              &#11178;
              {/* &#129048; */}
              {/* &#129052; */}
              Go Back</Button>
          </Link>
        </div>
        <div className={excursionInfoPage}>
          {fexcursion && (
            <div className={excursionPage}>
              <h1 className={homeHeader}>{fexcursion.name}</h1>
              <div className={excursionInformation}>
                <img
                  src={fexcursion.image}
                  alt="Excursion image"
                  className={excursionImage}
                />
                <div className={excursionShortInfo}>
                  <p className={excursionDate}>Date: {fexcursion.date.join(" | ")}</p>
                  <p className={excursionTime}>Time: {fexcursion.time}</p>
                  <p className={excursionDuration}>Duration: {fexcursion.duration} hours</p>
                  <p className={excursionPrice}>Price: {fexcursion.price} €</p>
                  {/* <p className={excursionCategory}>Category: {fexcursion.category === "665855f7ba06771abfae357e" ? "Solo" : "For group"}</p> */}
                  <p className={excursionCategory}>
                    <b>Category:</b> {getCategoryTitle(fexcursion.category)}
                  </p>
                </div>
              </div>
              <p className={excursionDescription}>{fexcursion.description}</p>
              {logedInUser?.data.role === "admin" ?
                <div>
                  <div className={excursionButtons}>
                    <Button
                      variant="warning"
                      className="me-3"
                      onClick={handleShowEdit}
                    >Edit</Button>
                    <Button
                      variant="light"
                      onClick={handleShowDelete}
                    >Delete</Button>
                  </div>
                  <DeleteExcursion showDelete={showDelete} setShowDelete={setShowDelete} fexcursion={fexcursion} />
                  <EditExcursion showEdit={showEdit} setShowEdit={setShowEdit} fexcursion={fexcursion} />
                </div>
                : logedInUser?.data.role === "user" ?
                  <div className={excursionButtons}>
                    <Button
                      variant="warning"
                      onClick={handleShowRegister}
                    >Register to excursion</Button>
                    <RegisterToExcursion showRegister={showRegister} setShowRegister={setShowRegister} fexcursion={fexcursion} />
                  </div>
                  :
                  <p className={registerText}>You should <Link to={"/login"} className="text-warning text-decoration-none">Log In</Link> in order to register to excursion</p>
              }
            </div>
          )}
        </div>
      </div >
    </>
  );
}

export default ExcursionInfo;
