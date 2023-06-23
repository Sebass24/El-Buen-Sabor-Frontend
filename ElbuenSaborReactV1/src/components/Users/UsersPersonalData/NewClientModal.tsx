import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useState, useEffect } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { postNewUser } from "@services/users";
import { setStoredInDB, setUserData, setUserId, setUserRole } from "@features/User/UserSlice";
import TextFieldValue from "components/Inputs/TextFieldValue";
import "./UserDataModal.scss";
import Role from "types/Users/Role";
import AlertMessage from "components/AlertMessage";

interface Props {
  onClose: () => void;
}

export default function NewClientModal({ onClose }: Props) {

  const { userStoredInDB, user } = useAppSelector(state => state.users);
  const { isAuthenticated, user: userAuth0, logout } = useAuth0();
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
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

  const saveUserData = (values: FormikValues) => {
    const name = values.name;
    const lastName = values.lastName;
    dispatch(setUserData({
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
      onClose();
      dispatch(setUserId(newUser.id as number));
      dispatch(setUserRole(newUser.role as Role));
      dispatch(setStoredInDB(true));
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  useEffect(() => {
    //if user is set in userSlice, if not an empty user would be posted
    if (user.name !== "" && !userStoredInDB) {
      postUser();
    }
  }, [user])

  const closeSession = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const initialValues: any = {
    lastName: user.lastName !== "" ? user.lastName : (userAuth0?.family_name || ''),
    name: user.name !== "" ? user.name : (userAuth0?.given_name || ''),
    email: userAuth0?.email
  }

  return (
    <div>
      <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className="modal-title-personal-data">Completar datos personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              lastName: Yup.string().required('El apellido es obligatorio'),
              name: Yup.string().required('El nombre es obligatorio'),
            })}
            onSubmit={(values) => { saveUserData(values) }}
          >
            {(Formik) =>
            (
              <>
                <Form className="form-user-personal-data">
                  <div className="form-group">
                    <TextFieldValue
                      label="Nombre:"
                      name="name"
                      type="text"
                      defaultValue={initialValues.name}
                    />
                    <TextFieldValue
                      label="Apellido:"
                      name="lastName"
                      type="text"
                      defaultValue={initialValues.lastName}
                    />
                    <TextFieldValue
                      label="Email:"
                      name="email"
                      type="email"
                      defaultValue={initialValues.email}
                      disabled={true}
                    />
                  </div>
                  <Modal.Footer className="modal-footer-personal-data">
                    <Button type="button" className="btn-cart" onClick={closeSession as any}>
                      Cerrar
                    </Button>
                    <Button type="submit" className="btn-cart">
                      Guardar
                    </Button>
                  </Modal.Footer>
                </Form>
              </>
            )
            }
          </Formik>
        </Modal.Body>
        {showMessage ?
          <AlertMessage
            onClose={() => { setShowMessage(false) }}
            severity="error"
            label={"Error al crear el usuario. Intente nuevamente."} /> : ""}
      </Modal>
    </div >
  );
}
