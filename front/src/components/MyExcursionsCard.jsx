import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import styles from "../styles/Excursions.module.css";
import { Link } from "react-router-dom";

function MyExcursionsCard({ excursion }) {

    const { excursionCard, truncate, moreInfoBtn } = styles;

    return (
        <>
            <Card
                style={{ width: "18rem" }}
                bg="dark"
                text="light"
                border="warning border-opacity-50"
            >
                <Card.Img variant="top" src={excursion.excursionId.image} />
                <Card.Body className={excursionCard}>
                    <Card.Title as="h4">{excursion.excursionId.name}</Card.Title>
                    <Card.Text className={truncate}>{excursion.excursionId.description}</Card.Text>
                    <div className={moreInfoBtn}>
                        <Link to={`/myexcursions/${excursion.excursionId._id}`}>
                            <Button variant="secondary" className="w-100">More Information</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default MyExcursionsCard;