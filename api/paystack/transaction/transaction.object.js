const transactionDetails = {
    id: 0,
    authorization_code: "",
    callback_url: "",
    reference: "",
    amount: 0,
    at_least: 0,
    currency : "",
    email : "",
    plan : "",
    invoice_limit: 0,
    metadata: "",
    subaccount: "",
    transaction_charge: 0,
    bearer: "",
    channels: "",
    perPage: 0,
    page: 0,
    customer: 0,
    status: "",
    from: "",
    to: "",
    settled: false,
    settlement: 0,
    payment_page: 0,

    bootInitialization: function (requestObject){
        this.amount = requestObject.amount;
        this.email = requestObject.email;
        this.reference = requestObject.reference
        this.metadata = requestObject.metadata
    },

    initializeTransactionObject: function(){
        return {
            //reference: this.reference,
            amount: this.amount,
            email: this.email,
            metadata: this.metadata,
            callback_url: this.callback_url,
        }
    },

    bootChargeAuthorization: function(requestObject){
       // this.reference = requestObject.reference;
        this.authorization_code = requestObject.authorization_code;
        this.amount = requestObject.amount;
        this.email = requestObject.email;
       // this.metadata = requestObject.metadata
    },

    chargeAuthorizationObject: function(){
        return {
            //reference: this.reference,
            authorization_code: this.authorization_code,
            amount: this.amount,
            email: this.email,
           // metadata: this.metadata
        }
    },

    checkAuthorizationObject: function(){
        return {
            authorization_code: this.authorization_code,
            amount: this.amount,
            email: this.email
        }
    },

    partialDebitObject: function(){
        return {
            authorization_code: this.authorization_code,
            currency: this.currency,
            amount: this.amount,
            email: this.email,
            at_least: this.at_least,
            reference: this.reference
        }
    }

  };

  module.exports = transactionDetails