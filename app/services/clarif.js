var clarifai = require("clarifai");

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c1cfd5fe90544a7b9605dc44e09d95f8'
});

function predict(image){
    return app.models.predict(Clarifai.GENERAL_MODEL, image).then(
        function(response) {
            console.log(response);
            return response;
        },
        function(err) {
            console.log(err);
            return err;
        }
    );
}

function predictBase64(image){
    console.log('Attemping to processs base 64 image');
    return app.models.predict(Clarifai.GENERAL_MODEL,  {base64: image}).then(
        function(response) {
            console.log(response);
            return response;
        },
        function(err) {
            console.log(err);
            return err;
        }
    );
}


module.exports = {
    predict: predict,
    predictBase64: predictBase64
}