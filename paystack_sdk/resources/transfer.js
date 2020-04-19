'use strict';

var root = '/transfer';

module.exports = {

  /*
  Initiate transfer
  */
  initiate: {
      method: 'post',
      endpoint: root,
      params: ['source*', 'amount*', 'recipient*','currency','reason','reference']
    },
  /*
  Initiate bulk transfer
  */
  initiateBulk: {
    method: 'post',
    endpoint: [root, '/bulk'].join(''),
    params: ['transfers', 'currency', 'source']
  },

  /*
  List transfers
  */
 list: {
      method: 'get',
      endpoint: root
    },

  /*
  Verify transfer
  */
  Verify: {
      method: 'get',
      endpoint: [root, '/{reference}'].join(''),
      args: ['reference']
  },

   /*
  Fetch transfer details
  */
  get: {
    method: 'get',
    endpoint: [root, '/{id_or_code}'].join(''),
    args: ['id_or_code']
  },

    /*
  Finalize transfer
  */
  finalize: {
    method: 'post',
    endpoint: [root, '/finalize_transfer'].join(''),
    params: ['transfer_code*', 'otp*']
  },

};
