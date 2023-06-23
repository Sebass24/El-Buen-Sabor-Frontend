import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useState, useEffect } from "react";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import TextFieldValue from "components/Inputs/TextFieldValue";
import User from "types/Users/User";
import Role from "types/Users/Role";
import TextFildSelectValue from "components/Inputs/TextFildSelectValue";
import { getData, postPutData } from "components/GenericFetch/GenericFetch";
import { finishLoading, startLoading } from "@features/Loading/LoadingSlice";
import { addClient, updateClient } from "@features/Clients/ClientSlice";
import { addEmpleoyee, updateEmpleoyee } from "@features/Empleoyees/empleoyeeSlice";

interface props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  Client?: boolean;
  user?: User;
}

export const ModalAddUserAdmin = ({
  showModal,
  handleClose,
  editing,
  Client,
  user,
}: props) => {
  const initialValues: User = {
    lastName: "",
    name: "",
    userEmail: "",
    role: {
      description: "",
    },
  };

  const [options, setOptions] = useState<any>([""]);
  const [Role, setRole] = useState<Role[]>([]);
  const dispatch = useAppDispatch();
  async function getMesureUnit() {
    const data: Role[] = await getData<Role[]>("/api/role");
    const datasinCliente = data.filter((option) => {
      return option.description != "Cliente";
    });
    setRole(datasinCliente);
  }

  async function RolesToOption() {
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptions([
      initialopcions,
      ...Role.map((option, index) => {
        if (option.description != "Cliente") {
          return {
            value: option.description,
            label: option.description,
          };
        }
      }),
    ]);
  }

  useEffect(() => {
    getMesureUnit();
  }, []);

  useEffect(() => {
    RolesToOption();
  }, [Role]);

  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Completar datos personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={user ? user : initialValues}
            validationSchema={Yup.object().shape({
              lastName: Yup.string().required("El apellido es obligatorio"),
              name: Yup.string().required("El nombre es obligatorio"),
              userEmail: Yup.string().required("El email es obligatorio"),
              role: Yup.object().shape({
                description: Yup.string().required("Campo Requerido"),
              }),
            })}
            onSubmit={(values) => {
              if (Client) {
                values = {
                  ...values,
                  role: {
                    id: 2,
                    deleted: false,
                    description: "Cliente",
                    auth0RoleId: "rol_9v33EypxD9HIWrXj",
                  },
                };
              }
              console.log(values)
              if (editing) {
                dispatch(startLoading());
                postPutData(`/api/user`, "PUT", values).then(() => {
                  if (Client) {
                    console.log(values)
                    dispatch(updateClient(values));
                  } else {
                    dispatch(updateEmpleoyee(values));
                  }
                });
                dispatch(finishLoading());
              } else {
                dispatch(startLoading());
                postPutData(`/api/user/createEmployee`, "POST", values).then(
                  () => {
                    if (Client) {
                      dispatch(addClient(values));
                    } else {
                      dispatch(addEmpleoyee(values));
                    }
                  }
                );
                dispatch(finishLoading());
              }
              handleClose();
            }}
          >
            {(Formik) => (
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
                      name="userEmail"
                      type="email"
                      defaultValue={initialValues.userEmail}
                      disabled={editing ? true : false}
                    />
                    {user?.role?.id === 2 ? (
                      <></>
                    ) : (
                      <TextFildSelectValue
                        label="Rol:"
                        name="role"
                        options={options}
                        value={Formik.values.role?.description}
                        onChange={(event: any) => {
                          let rol = Role.filter((role) => {
                            return role.description == event.target.value;
                          });
                          if (rol.length === 0) {
                            rol = [{ description: "" }];
                          }
                          Formik.setFieldValue("role", rol[0]);
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      type="button"
                      variant="danger"
                      onClick={handleClose}
                    >
                      Cerrar
                    </Button>
                    <Button type="submit" variant="success">
                      Guardar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
