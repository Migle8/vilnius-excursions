import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { getLoggedInUser } from "../utils/auth/authenticate";

import styles from "../styles/Excursions.module.css";
import MyExcursionsCard from "./MyExcursionsCard";

function MyExcursionsList() {
    const { error, users } = useContext(StateContext);

    const { excursionsList } = styles;

    const logedInUser = getLoggedInUser();

    const currentUser = users.find(user => user._id === logedInUser?.data._id);

    return (
        // <>
        // <div className={excursionsList}>
        //                 {users && users.length > 0 ? (
        //                     users.map((user) =>
        //                         user.excursions && user.excursions.length > 0 ? (
        //                             user.excursions.map((excursion) => (
        // <MyExcursionsCard key={excursion._id} excursion={excursion} />
        //                             ))
        //                         ) : (
        // <p key={user._id}>No excursions found for user {user.name}</p>
        //                         )
        //                     )
        //                 ) : (
        // <p>No users found</p>
        //                 )}
        // </div>
        //             {error && <p>{error}</p>}
        // </>
        <>
            <div className={excursionsList}>
                {/* {users.map((user) =>
                    user.excursions.map((excursion) => (
                        <MyExcursionsCard key={excursion._id} excursion={excursion} />
                    ))
                )} */}
                {currentUser && currentUser.excursions.map((excursion) =>
                    <MyExcursionsCard key={excursion._id} excursion={excursion} />
                )
                }
            </div>
            {error}
        </>
    );
}

export default MyExcursionsList;
