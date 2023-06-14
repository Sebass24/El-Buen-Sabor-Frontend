import { IPayerIdentification } from './Utils';

export interface ICardPaymentBrickPayer {
    /**
     * Payer email
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    email?: string;
    /**
     * Payer identification data
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    identification?: IPayerIdentification;
}

export interface ICardPaymentFormData<ICardPaymentBrickPayer> {
    /**
     * Token generated
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    token: string;
    /**
     * Issuer id
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    issuer_id: string;
    /**
     * Payment method id
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    payment_method_id: string;
    /**
     * Transaction amount that the user filled in the form
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    transaction_amount: number;
    /**
     * Installments quantity that the user filled in the form
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    installments: number;
    /**
     * Payer data filled in the form
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    payer: ICardPaymentBrickPayer;
    /**
     * Payment method option id
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    payment_method_option_id?: string;
    /**
     * Processing mode
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    processing_mode?: string;
}

export interface IAdditionalData {
    /**
     * Bin of the card entered by the user.
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/additional-data Card Payment Brick # Additional Settings # Additional data customization} documentation.
     */
    bin: string;
}

/**
 * Card payment types
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-payment-methods Card Payment Brick # Additional Settings # Configure accepted payment methods} documentation.
 */
type TCardPaymentBrickPaymentType = 'credit_card' | 'debit_card';

export interface ICardPaymentBrickVisual {
    /**
     * Customization to hide payment button
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    hidePaymentButton?: boolean;
    /**
     * Customization to hide form title
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
     */
    hideFormTitle?: boolean;
}