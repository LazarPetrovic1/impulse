const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "digital-infinity",
    api_key: "266648575826532",
    api_secret: "lg_-egVAd2HYciikUTBBer2TmVw",
});

module.exports = cloudinary
// `https://<<API KEY>>:<<API SECRET>>@api.cloudinary.com/v1_1/<<RESOURCE NAME>>/resources/image"`
