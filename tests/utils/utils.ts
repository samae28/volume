export enum ButtonType {
    Free = 'Claim Free Ticket',
    Buy = 'Buy Ticket:',
    Donate = 'Donate and Claim',
    ViewButton = 'View Ticket'
}

export enum ShowType {
    OneTime = 'one-time',
    Festival = 'festival',
}

export enum TicketType {
    Free = 'Free Show',
    Purchase = 'Purchase',
    Donate = 'Donate',
    Discounted = 'Discounted',
    FreeForSubscribers = 'Free for Subscribers',
}

export enum PaymentType {
    CreditCard = 'Credit Card',
    PayPal = 'PayPal',
}

export const CardDetails = {
    cardNumber: '4242 4242 4242 4242',
    expiry: '02/42',
    CVC: '424',
} as const;

