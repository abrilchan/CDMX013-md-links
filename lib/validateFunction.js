const axios = require('axios');

function validateFunction(arrayLinksObj){
        let linkToValidate = arrayLinksObj.href;
        const request =  axios.get(linkToValidate);

        return request
                .then((response) => {
                    let isValid = {
                        ...arrayLinksObj,
                        status: response.status,
                        message: 'ok'
                    };
                    return isValid;
                })

                .catch((error) => {
                    let isBroken = {
                        ...arrayLinksObj,
                        status: error.response.status,
                        message: 'fail'
                    };
                    return isBroken;
                })    
}

module.exports = validateFunction;