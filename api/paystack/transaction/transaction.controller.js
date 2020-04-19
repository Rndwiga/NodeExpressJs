const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Promise = require('promise');
const TransactionObject = require("./transaction.object");
const paystack = require('../../../paystack_sdk/index')(process.env.PAYSTACK_SECRET_KEY);

const checkAuth = require('../../middleware/check-auth');

router.post('/add_card', initializeTransaction);
router.get('/add_card_callback', initializeTransactionCallback);
router.post('/check_card_status', checkCardChargeableStatus);
router.post('/charge_card', chargeCard); 

/*
 * This method makes request to PayStack and returns a url to capture
 card detaisl
 */
async function initializeTransaction(req, res, next){
    TransactionObject.bootInitialization(req.body);
    TransactionObject.callback_url = process.env.CALL_BACK_ENDPOINT;

    var initialization = await apiInitializeTransaction();

    if(initialization.data.reference !== ""){
        res.status(200).send(initialization);
    }else{
        res.status(500).json({
            error: "There is no transaction reference"
        });
    }
}

function apiInitializeTransaction(){
    var initialization = TransactionObject.initializeTransactionObject();
    return new Promise(function(resolve, reject) {
        
        paystack.transaction.initialize(initialization)
        .then(function(body) {
            console.log(body);
            resolve(body)
         })
        .catch(function(error){
            console.log(error);
           // res.status(500).json({
           //     error: err
          //  });
            reject(error)
        });
    });
}
/*
    This method handles the callback from paystack. It allows the
*/
async function initializeTransactionCallback(req, res, next){
    var data = {
        trxref : req.query.trxref,
        reference : req.query.reference,
    }
    TransactionObject.reference = data.reference;
    
    //checking verification status
    var verification = await apiVerifySingleTransaction();
    console.log(verification);

    res.redirect(process.env.REDIRECT_ENDPOINT);
}

async function checkCardChargeableStatus(req, res, next){
    TransactionObject.reference = req.body.reference;
    var verification = await apiVerifySingleTransaction();
    res.status(200).send(verification);
}

function apiVerifySingleTransaction(){
    
    return new Promise(function(resolve, reject){
        paystack.transaction.verify(TransactionObject.reference)
        .then(function(body) {
            console.log(body);
            //res.status(200).send(body);
            resolve(body);
        })
        .catch(function(error){
            console.log(error);
            reject(error);
        })
    })
}



async function chargeCard(req, res, next){
    TransactionObject.bootChargeAuthorization(req.body);

    var charging = await apiChargeAuthorization();
    //Implement no authorization
    //Implement handling double transaction reference
    // Implement no funds
    // Implement insufficient balance

    //var chargingVerification = await apiCheckAuthorization();

    res.status(200).send(charging);
}

function apiChargeAuthorization(){
    var chargeDetails = TransactionObject.chargeAuthorizationObject();
    return new Promise(function(resolve, reject){
        paystack.transaction.charge(chargeDetails)
        .then(function(body) {
            console.log(body);
            //res.status(200).send(body);
            resolve(body);
        })
        .catch(function(error){
            console.log(error);
            reject(error);
        })
    });
}

function apiCheckAuthorization(){
    var checker = TransactionObject.checkAuthorizationObject();
    return new Promise(function(resolve, reject){
        paystack.transaction.check(checker)
        .then(function(body) {
            console.log(body);
            //res.status(200).send(body);
            resolve(body);
        })
        .catch(function(error){
            console.log(error);
            reject(error);
        })
    });
}



module.exports = router;