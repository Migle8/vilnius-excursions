import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { StateContext } from "../utils/StateContext";
import styles from "../styles/Home.module.css";
import excursionsStyle from "../styles/ExcursionInfo.module.css";
import { getLoggedInUser } from "../utils/auth/authenticate";
import CancelExcursion from "./CancelExcursion";
import ChangeExcursionDate from "./ChangeExcursionDate";
import ExcursionRatings from "./ExcursionRatings";

function MyExcursionsInfo() {

    const [allExcursions, setAllExcursions] = useState([]);
    const [showCancel, setShowCancel] = useState(false);
    const [showChangeDate, setShowChangeDate] = useState(false);

    const { excursions, categories, users } = useContext(StateContext);

    const { id } = useParams();

    const fexcursion = allExcursions.find((excursion) => excursion._id === id);

    const logedInUser = getLoggedInUser();
    const userId = logedInUser?.data._id;

    const specificUser = users.find((user) => user._id === userId);
    const userExcursions = specificUser ? specificUser.excursions : [];

    const excursionDates = userExcursions
        .filter((excursion) => excursion.excursionId._id === id)
        .map((excursion) => excursion.date);

    const { mainBackground, homeHeader } = styles;
    const { excursionBackBtn, excursionInfoPage, excursionPage, excursionInformation, excursionImage, excursionShortInfo, excursionRegisterDate, excursionDate, excursionTime, excursionDuration, excursionPrice, excursionCategory, excursionDescription, excursionButtons, excursionRatings } = excursionsStyle;

    const handleShowCancel = () => { setShowCancel(true) };

    const handleShowRegister = () => { setShowChangeDate(true) };

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
                    <Link to={"/myexcursions"}>
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
                                    {excursionDates.map((dates, index) => (
                                        <p className={excursionRegisterDate} key={index}>You are registered for this excursion on {dates} {fexcursion.time}h</p>
                                    ))}
                                    <p className={excursionDate}>All dates: {fexcursion.date.join(" | ")}</p>
                                    <p className={excursionTime}>Time: {fexcursion.time}</p>
                                    <p className={excursionDuration}>Duration: {fexcursion.duration} hours</p>
                                    <p className={excursionPrice}>Price: {fexcursion.price} €</p>
                                    {/* <p className={excursionCategory}>Category: {fexcursion.category === "665855f7ba06771abfae357e" ? "Solo" : "For group"}</p> */}
                                    <p className={excursionCategory}>
                                        Category: {getCategoryTitle(fexcursion.category)}
                                    </p>
                                </div>
                            </div>
                            <p className={excursionDescription}>{fexcursion.description}</p>
                            <div>
                                <div className={excursionButtons}>
                                    <Button
                                        variant="warning"
                                        className="me-3"
                                        onClick={handleShowRegister}
                                    >Edit Date</Button>
                                    <Button
                                        variant="light"
                                        onClick={handleShowCancel}
                                    >Cancel Excursion</Button>
                                </div>
                                <CancelExcursion showCancel={showCancel} setShowCancel={setShowCancel} fexcursion={fexcursion} />
                                <ChangeExcursionDate showChangeDate={showChangeDate} setShowChangeDate={setShowChangeDate} fexcursion={fexcursion} />
                            </div>
                        </div>
                    )}
                            <div className={excursionRatings}>
                                <ExcursionRatings excursion={fexcursion} />
                            </div>
                </div>
            </div >
        </>
    );
}

export default MyExcursionsInfo;