const tokenizationSpecification =  {
    type: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
        },
}

const cardPaymentMethod = {
    type:'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters:{
        allowedCardNetworks: ['VISA','MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY','CRYPTOGRAM_3DS']
    }
}

const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods:[cardPaymentMethod],
};

let googlePayClient;

function onGooglePayLoaded(){
    googlePayClient = new google.payments.api.PaymentsClient({
        environment:"TEST",
    })

    googlePayClient.isReadyToPay(googlePayConfiguration)
        .then(response=>{
            if(response.result){
                createAndAddButton();
            }else{

            }
        })
        .catch(error=>console.error('ISREADYTOPAY',error))
}