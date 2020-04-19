const userDetails = {
    id: 0,
    first_name: "",
    last_name: "",
    slug : "",
    email: "",
    password: "",
    location_id: "",
    badge_id: "",
    verification_code: "",
    verification_expiry_date: "",
    user_verified: false,
    //Temp
    user_list: [],

    bootUserRegistration: function (requestObject){
        this.first_name = requestObject.first_name;
        this.last_name = requestObject.last_name;
        this.slug = requestObject.slug;
        this.email = requestObject.email;
        this.password = requestObject.password;
        this.location_id = requestObject.location_id;
        this.badge_id = requestObject.badge_id;
        this.verification_code = requestObject.verification_code;
        this.verification_expiry_date = requestObject.verification_expiry_date;
        this.user_verified = requestObject.user_verified;
    },

    registerUserObject : function() {
        return {
            first_name: this.first_name,
            last_name: this.last_name
        }

    }    
    

  };

  module.exports = userDetails;