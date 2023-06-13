import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useState, useEffect } from "react";
import "./UserDataModal.scss";
import { Formik, Form, Field, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { postNewUser } from "../../../services/users";
import { setStoredInDB, setUserData, setUserId } from "@features/User/UserSlice";

export default function NewClientModal() {

    const { userStoredInDB, user } = useAppSelector(state => state.users);
    const { isAuthenticated, user: userAuth0, logout } = useAuth0();
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShowModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (!userStoredInDB && isAuthenticated) {
            handleShowModal();
        } else if (userStoredInDB) {
            handleCloseModal();
        }
    }, [isAuthenticated, userStoredInDB])

    const saveUserData = async (values: FormikValues) => {
        const name = values.name;
        const lastName = values.lastName;
        await dispatch(setUserData({
            auth0Id: userAuth0?.sub,
            name: name,
            lastName: lastName,
            userEmail: userAuth0?.email
        }));
    };

    const postUser = async () => {
        //post user to database. If successfull, set userStoredInDB as true and the modal will close
        try {
            const newUser = await postNewUser(user);
            dispatch(setUserId(newUser.id as number));
            dispatch(setStoredInDB(true));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //if user is set in userSlice, if not an empty user would be posted
        if (user.name !== "" && !userStoredInDB) {
            postUser();
        }
    }, [user])

    const formik = useFormik({
        initialValues: {
            lastName: user.lastName !== "" ? user.lastName : (userAuth0?.family_name || ''),
            name: user.name !== "" ? user.name : (userAuth0?.given_name || ''),
            email: userAuth0?.email,
        },
        validationSchema: Yup.object().shape({
            lastName: Yup.string().required('El apellido es obligatorio'),
            name: Yup.string().required('El nombre es obligatorio'),
        }),
        onSubmit: values => {
            saveUserData(values);
        },
    });

    const closeSession = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    return (
        <div>
            <Modal className="complete-data" show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Completar datos personales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nombre:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                defaultValue={formik.initialValues.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="lastName">Apellido:</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                defaultValue={formik.initialValues.lastName}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <div><label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={userAuth0?.email}
                                disabled
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        {/* <Formik
                        initialValues={initialValuesNewClient}
                        onSubmit={saveUserData}
                        validationSchema={validationSchema}
                    >
                        <Form className="form-user-personal-data">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Nombre:
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={user.name}
                                    className="form-control"
                                    component="input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">
                                    Apellido:
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder={user.lastName}
                                    className="form-control"
                                    component="input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userEmail" className="form-label">
                                    Email:
                                </label>
                                <Field
                                    type="text"
                                    name="userEmail"
                                    id="userEmail"
                                    placeholder={userAuth0?.email}
                                    disabled
                                    className="form-control"
                                    component="input"
                                />
                            </div> */}
                        <Modal.Footer>
                            <Button type="submit" className="btn-yellow">
                                Guardar
                            </Button>
                            <Button type="button" className="btn-yellow" onClick={closeSession as any}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </form>
                    {/* </Form>
                    </Formik> */}
                </Modal.Body>

            </Modal>
        </div >
    );
}
