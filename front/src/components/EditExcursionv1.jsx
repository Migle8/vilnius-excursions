import { Controller, useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from "react-bootstrap/Form";
import styles from "../styles/CreateExcursionForm.module.css";
import axios from 'axios';
import { updateData } from '../services/update';
import { StateContext } from '../utils/StateContext';
import { postData } from '../services/post';

function EditExcursion({ showEdit, setShowEdit, fexcursion }) {
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState([""]);
    // const [image, setImage] = useState(fexcursion ? fexcursion.image : "");

    const { setUpdate } = useContext(StateContext);

    const { createExcursion, createExcursionModal, createExcursionCloseBtn, createExcursionHeader, errorStyle, createExcursionButtons, createExcursionCancelBtn } = styles;

    // const curDate = new Date().toJSON().slice(0, 10);

    const addDateInput = () => {
        setDates([...dates, '']); // Add a new date input
    };

    const handleDateChange = (index, value) => {
        const updatedDates = [...dates];
        updatedDates[index] = value;
        setDates(updatedDates);
    };

    const removeDateInput = (index) => {
        setDates(dates.filter((_, i) => i !== index)); // Remove date input at specified index
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors
            , isSubmitting
        },
        control,
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            duration: "",
            date: [""],
            time: "",
            price: "",
            category: "",
        },
    });

    const formSubmitHandler = async (data) => {
        // data.image = image;
        data.date = dates;
        try {
            if (fexcursion) {
                // await updateData(fexcursion._id, data );
                await updateData(fexcursion._id, { ...data, image: data.image[0] });
            } else {
                await postData({ ...data, image: data.image[0] })
            }
            setUpdate((update) => update + 1);
            reset();
            handleClose();
        } catch (error) {
            // console.log(error);
            setError(error.message)
        }
    };

    // const convertFileToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };

    // const handleFileChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const base64 = await convertFileToBase64(file);
    //         setImage(base64);
    //     }
    // };

    const handleClose = () => {
        setShowEdit(false);
        reset();
    };

    useEffect(() => {
        if (fexcursion) {
            setValue("name", fexcursion.name);
            setValue("description", fexcursion.description);
            // setValue("image", fexcursion.image);
            setValue("duration", fexcursion.duration);
            setValue("date", fexcursion.date);
            setValue("time", fexcursion.time);
            setValue("price", fexcursion.price);
            setValue("category", fexcursion.category);
        }
    }, [fexcursion]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3003/api/v1/categories");
                setCategories(response.data.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);

    return (
        <>
            <Modal
                show={showEdit}
                onHide={handleClose}
                data-bs-theme="dark"
                dialogClassName={createExcursion}
            >
                <div className={createExcursionModal}>
                    <div className={createExcursionCloseBtn}>
                        <CloseButton onClick={handleClose} />
                    </div>
                    <h1 className={createExcursionHeader}>Edit Excursion</h1>
                    <Form onSubmit={handleSubmit(formSubmitHandler)}>
                        <div>
                            <Form.Group
                                controlId="exampleForm.ControlInput1"
                                className="mt-5"
                            >
                                <Form.Control
                                    type="textarea"
                                    placeholder="Excursion name"
                                    autoComplete="name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    isInvalid={errors.name}
                                />
                                <div className={errorStyle}>{error}</div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name && errors.name.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                controlId="exampleForm.ControlInput3"
                                className="mt-4"
                            >
                                <Form.Control
                                    type="textarea"
                                    placeholder="Duration"
                                    autoComplete="duration"
                                    {...register("duration", {
                                        required: "Duration is required",
                                    })}
                                    isInvalid={errors.duration}
                                />
                                <div className={errorStyle}>{error}</div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.duration && errors.duration.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="container">
                                <div className="row">
                                    <Form.Group
                                        className="mt-4 col ps-0"
                                        controlId="exampleForm.ControlTextarea4">
                                        {dates.map((date, index) => (
                                            <Controller
                                                key={index}
                                                name={`dates[${index}]`}
                                                control={control}
                                                rules={{
                                                    required: "Date is required",
                                                    min: {
                                                        // value: curDate,
                                                        message: "Date can't be previous",
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <div className="d-flex flex-row align-items-center
                                                    mb-2">
                                                        <Form.Control
                                                            type="date"
                                                            value={field.value || date}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                handleDateChange(index, e.target.value);
                                                            }}
                                                            isInvalid={errors.date && errors.date[index]}
                                                        />
                                                        {dates.length > 1 ?
                                                            <CloseButton
                                                                onClick={() => removeDateInput(index)}
                                                            /> : null
                                                        }
                                                    </div>
                                                )}
                                            />
                                        ))}
                                        <input
                                            type="button"
                                            onClick={addDateInput}
                                            value="Add date"
                                        />
                                        <div className={errorStyle}>{error}</div>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date && errors.date.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mt-4 col pe-0"
                                        controlId="exampleForm.ControlTextarea5">
                                        <Form.Control
                                            type="time"
                                            {...register("time", {
                                                required: "Time is required"
                                            })}
                                            isInvalid={errors.date} />
                                        <div className={errorStyle}>{error}</div>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.time && errors.time.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group
                                controlId="exampleForm.ControlInput6"
                                className="mt-4"
                            >
                                <Form.Control
                                    type="textarea"
                                    placeholder="Price"
                                    autoComplete="price"
                                    {...register("price", {
                                        required: "Price is required",
                                    })}
                                    isInvalid={errors.price}
                                />
                                <div className={errorStyle}>{error}</div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.price && errors.price.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                controlId="exampleForm.ControlInput2"
                                className="mt-4"
                            >
                                <Form.Control
                                    type="textarea"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Description"
                                    autoComplete="description"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    isInvalid={errors.description}
                                />
                                <div className={errorStyle}>{error}</div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.description && errors.description.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Control
                                    type="file"
                                    // required
                                    name="image"
                                    {...register("image"
                                        // , {
                                        //     required: "Image is required",
                                        // }
                                    )}
                                    // onChange={handleFileChange}
                                    isInvalid={!!errors.image}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.image && errors.image.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Select
                                    id="excursionCategory"
                                    {...register("category"
                                        // , { required: "Category is required" }
                                    )}
                                >
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <div className={createExcursionButtons}>
                            <Button
                                variant="dark"
                                onClick={handleClose}
                                className={createExcursionCancelBtn}
                            >
                                <div >Cancel</div>
                            </Button>
                            <Button
                                variant="warning"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <div>Save</div>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default EditExcursion;