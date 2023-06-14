import { Payment, initMercadoPago } from '@mercadopago/sdk-react';
import { IPaymentFormData } from "./Types";

initMercadoPago('TEST-f9a81470-5f5f-467c-85fe-e3d799f97788');

const MercadoPagoInit = () => {

    const initialization = {
        amount: 0,
        preferenceId: "<PREFERENCE_ID>",
    };
    const customization: any = {
        paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };
    const onSubmit = async (
        selectedPaymentMethod: IPaymentFormData,
        formData: any
    ) => {
        // callback called when clicking the submit data button
        return new Promise<void>((resolve, reject) => {
            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    // receive payment result
                    resolve();
                })
                .catch((error) => {
                    // handle error response when trying to create payment
                    reject();
                });
        });
    };
    const onError = async (error: any) => {
        // callback called for all Brick error cases
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback called when Brick is ready.
          Here you can hide loadings from your site, for example.
        */
    };

    /* Whenever the user leaves the screen where some Brick is displayed, 
    it is necessary to destroy the current instance with the command 
    window.paymentBrickController.unmount().When entering again, a new instance 
    must be generated. */

    return (
        <Payment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
        />
    );
};

export default MercadoPagoInit;