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
        environment:"PRODUCTION",
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

function createAndAddButton(){
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
    });
    document.getElementById('buy-now').appendChild(googlePayButton)
}

function onGooglePayButtonClicked(){
    const paymentDataRequest = {...googlePayConfiguration}
    paymentDataRequest.merchantInfo = {
        merchantId: "BCR2DN4T4SYZB7C3",
        merchantName: "STRAX_SHOP"
    }

    paymentDataRequest.transactioninfo = {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US',
    }

    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(paymentData=> processPaymentData(paymentData))
        .catch(error=>console.error("LOAD PAYMENT DATA ", error))
}

function processPaymentData(paymentData){
    fetch(ordersEndpointUrl,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:paymentData
    })
}