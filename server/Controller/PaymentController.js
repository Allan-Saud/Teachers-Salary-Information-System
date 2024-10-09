
// const crypto=require("crypto");


// const createSignature = (message) => {
//     const secret = "8gBm/:&EnhH.1/q";
//     const hmac = crypto.createHmac("sha256", secret);
//     hmac.update(message);

//     // Get the digest in base64 format
//     const hashInBase64 = hmac.digest("base64");
//     return hashInBase64;
// }; 

//     const createPayment = async (req, res, next) => {
//         try {
//             // console.log(req.body);
//             const { data } = req.body;
//             const amount = data.amount;
//             const uuid = performance.now();
//             const id = `${uuid}`.replace(".", "-");

//             const signature = createSignature(
//                 `total_amount=${amount},transaction_uuid=${id},product_code=EPAYTEST`
//             );

//             const formData = {
//                 amount: amount,
//                 failure_url: "http://localhost:3000/failure",
//                 product_delivery_charge: "0",
//                 product_service_charge: "0",
//                 product_code: "EPAYTEST",
//                 signature: signature,
//                 signed_field_names: "total_amount,transaction_uuid,product_code",
//                 success_url: `http://localhost:3000/success`,
//                 tax_amount: "0",
//                 total_amount: amount,
//                 transaction_uuid: id
//             };

//             return res.json({
//                 message: "Payment Created",
//                 formData
//             });
//         } catch (err) {
//             return res.status(400).json({
//                 message: err.message
//             });
//         }
//     }



    

// module.exports = { createPayment };





const crypto=require("crypto");


const createSignature = (message) => {
    const secret = "8gBm/:&EnhH.1/q";
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);

    // Get the digest in base64 format
    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
}; 

    const createPayment = async (req, res, next) => {
        try {
            // console.log(req.body);
            const { data } = req.body;
            const amount = data.amount;
            const uuid = performance.now();
            const id = `${uuid}`.replace(".", "-");

            const signature = createSignature(
                `total_amount=${amount},transaction_uuid=${id},product_code=EPAYTEST`
            );

            const formData = {
                amount: amount,
                failure_url: "http://localhost:3000/failure",
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: "EPAYTEST",
                signature: signature,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: `http://localhost:3000/success`,
                tax_amount: "0",
                total_amount: amount,
                transaction_uuid: id
            };

            return res.json({
                message: "Payment Created",
                formData
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    }



    

module.exports = { createPayment };
