import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/esm/CloseButton';
import styles from "../styles/DeleteExcursion.module.css";
import { StateContext } from '../utils/StateContext';
import { deleteMyData } from '../services/delete';
// import { deleteData } from "../services/delete";

function CancelExcursion({showCancel, setShowCancel, fexcursion}) {

    const {  setUpdate } = useContext(StateContext);

    const navigate = useNavigate();

    const { deleteCloseBtn, deleteConfirm, deleteModalBtns, deleteCancelBtn } = styles;

  
    const handleClose = () => {
      setShowCancel(false);
    };
  
  
    const cancelHandler = async (id) => {
      await deleteMyData(id);
      setUpdate((update) => update + 1);
      navigate("/myexcursions");
    };

    return ( 
        <Modal
        show={showCancel}
        onHide={handleClose}
        data-bs-theme="dark"
      >
        <Modal.Body>
          <div className={deleteCloseBtn}>
            <CloseButton onClick={handleClose} />
          </div>
          <div className={deleteConfirm}>
            Are You sure, you want to cancel &quot;{fexcursion.name}&quot; excursion?
          </div>

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
              onClick={() => cancelHandler(fexcursion._id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
     );
}

export default CancelExcursion;