import { createContext, useEffect, useState } from "react";
import { getAllData, getCategories, getUsers } from "../services/get";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [excursions, setExcursions] = useState([]);
    const [update, setUpdate] = useState(0);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleShow = () => setShow(true);

    const fetchExcursions = async () => {
        try {
            const { data: { excursions } } = await getAllData();
            setExcursions(excursions);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const { data: { users } } = await getUsers();
            // const excursionsIds = users.map(user => user.excursions.map(excursion => excursion._id));
            // console.log(users);
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            // console.log(response); // Log the entire response to understand its structure
            const { data } = response;
            setCategories(data);
            // console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchExcursions();
        fetchUser();
        fetchCategories();
    }, [update]);

    return (
        <StateContext.Provider value={{ excursions, setExcursions, update, setUpdate, error, setError, show, setShow, users, setUsers, categories, setCategories, handleShow }}>
            {children}
        </StateContext.Provider>
    );
};