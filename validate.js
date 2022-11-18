const axios = require('axios');

function validateLinks(linkObj){
    const request =  axios.get(linkObj.href);
       return request 
        .then((response) => { 
            const validatedLinkObj = {
                ...linkObj, 
                status: response.status,
                statusText: 'ok'
            };
         return validatedLinkObj;
        })
        .catch((error) => {
            if(error.response){
                const validatedLinkObj = {
                    ...linkObj, 
                    status: error.response.status,
                    statusText: 'fail'
                };
            return validatedLinkObj;
            } else {
            const validatedLinkObj = {
                ...linkObj,
                status: `Error ${error.message}`,
                statusText: 'fail',
              };
              return validatedLinkObj;
            };
        });
};

module.exports = validateLinks;