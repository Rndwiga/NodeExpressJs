const transferDetails = {
    type: "",
    amount: 0,
    name : "",
    account_number: 0,
    bank_code: 0,
    description: "",
    source: "",
    currency: "",
    recipient: "",

    boot: function (requestObject){
        this.type = requestObject.type;
        this.amount = requestObject.amount;
        this.name = requestObject.name;
        this.account_number = requestObject.account_number;
        this.bank_code = requestObject.bank_code;
        this.description = requestObject.description;
        this.source = requestObject.source;
        this.currency = requestObject.currency;
        this.recipient = requestObject.recipient;
    },

    transferReceipientObject : function() {
        return {
            type: this.type,
            name: this.name,
            account_number: this.account_number,
            bank_code: this.bank_code,
            description: this.description,
        }
    },

    initiateTransferObject : function(){
        return {
            source: 'balance',
            amount: this.amount,
            currency: this.currency,
            recipient: this.recipient,
        }
    }

  };

  module.exports = transferDetails;