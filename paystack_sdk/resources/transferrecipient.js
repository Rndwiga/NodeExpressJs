'use strict';

var root = '/transferrecipient';

module.exports = {

  /*
  Create transfer receipient
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['type*', 'name*', 'metadata','account_number','bank_code','currency','description','authorization_code']
    },

  /*
  List transfer receipients
  */
 list: {
      method: 'get',
      endpoint: root
    },

  /*
  Update transfer receipient
  */
  update: {
      method: 'put',
      endpoint: [root, '/{recipient_code_or_id}'].join(''),
      params: ['name','email'],
      args: ['recipient_code_or_id']
  },

  /*
  Detelete transfer receipient
  */
  delete: {
    method: 'delete',
    endpoint: [root, '/{recipient_code_or_id}'].join(''),
    args: ['recipient_code_or_id']
  },


};
