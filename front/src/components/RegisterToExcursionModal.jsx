import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/esm/CloseButton';
import styles from "../styles/DeleteExcursion.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { postMyData } from '../services/post';
import { StateContext } from '../utils/StateContext';
import Form from "react-bootstrap/Form";

function RegisterToExcursion({ showRegister, setShowRegister, fexcursion }) {
    const [selectedDate, setSelectedDate] = useState("");
    const { setUpdate } = useContext(StateContext);
    const navigate = useNavigate();

    const { id } = useParams();

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleClose = () => {
        setShowRegister(false);
    };

    const registerHandler = async () => {
        try {
            const data = { date: selectedDate };
            const response = await postMyData(id, data);
            console.log(response);
            // await postMyData(id);
            setUpdate((update) => update + 1);
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    };

    const { deleteCloseBtn, deleteConfirm, deleteModalBtns, deleteCancelBtn } = styles;

    return (
        <Modal
            show={showRegister}
            onHide={handleClose}
            data-bs-theme="dark"
        >
            <Modal.Body>
                <div className={deleteCloseBtn}>
                    <CloseButton onClick={handleClose} />
                </div>
                <div className={deleteConfirm}>
                    Register to &quot;{fexcursion.name}&quot; excursion
                </div>

                <Form.Group className="mt-3 mb-3">
                    <Form.Select
                        id="excursionDates"
                        onChange={handleDateChange}
                        value={selectedDate}
                    >
                        <option value="" disabled>Select Date</option>
                        {fexcursion.date.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className={deleteModalBtns}>
                    <Button
                        onClick={handleClose}
                        variant="dark"
                        className={deleteCancelBtn}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => registerHandler(fexcursion._id)}
                    >
                        Register
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default RegisterToExcursion;
