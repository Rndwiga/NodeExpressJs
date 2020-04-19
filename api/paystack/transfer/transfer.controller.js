const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Promise = require('promise');
const TransferObject = require("./transfer.object");
const paystack = require('../../../paystack_sdk/index')(process.env.PAYSTACK_SECRET_KEY);
const checkAuth = require('../../middleware/check-auth');

router.post('/to_hospital', transferFundsToHospital);  //initialize new transaction in paystack

/*
 * To transfer funds to the hospital the following needs to be done
 0. validate the inputs
 1. check that the account balance is sufficient
 2. Create the hospital as transfer receipient
 3. Initialize the transfer
 4. Finalize the transfer (if there is otp issue)
 */

async function transferFundsToHospital(req, res, next){
    var balanceApiResponse = await apiGetAccountBalance(); //TODO:: isSuccessful?
    var accountBalance = balanceApiResponse.data[0].balance;
    
    TransferObject.boot(req.body); //TODO:: Validate inputs

    if(TransferObject.amount <= accountBalance){
        var receipient = await apiCreateTransferReceipient(); //TODO:: isSuccessful?
        TransferObject.recipient = receipient.data.recipient_code; //setting the recipient_code
        console.log(receipient);
        console.log("recipient_code: " + TransferObject.recipient_code);

        var trasferRequest = await apiInitiateTransfer(); //TODO:: isSuccessful?
        console.log(trasferRequest);

        res.status(200).send(trasferRequest);
    }else{
        res.status(200).send("Insufficient amount");
    }

}

function apiGetAccountBalance(){

    return new Promise(function(resolve, reject) {
        paystack.misc.balance()
        .then(function(body) {
            console.log(body);
            resolve(body);
        })
        .catch(function(error) {
            console.log(error);
            reject(error);
        });
    });

}

function apiCreateTransferReceipient(){
    var transferrecipient = TransferObject.transferReceipientObject();

    return new Promise(function(resolve, reject){
        paystack.transferrecipient.create(transferrecipient)
        .then(function(body) {
            //console.log(body);
            resolve(body);
         })
        .catch(function(error){
            console.log(error);
            reject(error);
        });
    });

}

function apiInitiateTransfer(){

    var transferDetails = TransferObject.initiateTransferObject();
    console.log(transferDetails);

    return new Promise(function(resolve, reject){
        paystack.transfer.initiate(transferDetails)
        .then(function(body) {
            //console.log(body);
            resolve(body);
        })
        .catch(function(error){
            console.log(error);
            reject(error);
        });
    });
}

module.exports = router;