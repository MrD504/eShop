import { h } from 'preact';
import style from './style';
import { useEffect, useState } from 'preact/hooks';

const PaymentForm = (_props) => {
    const [paymentForm, SetForm] = useState(null);
    const [buttonDisabled, SetButtonState] = useState(true);
    const locationID = "LYJ2MWRRAP03K";
    const onGetCardNonce = (_event) => {
        console.info("getting nonce")
        // disable payment button until nonce is submitted
        SetButtonState(true)
        _event.preventDefault();
        paymentForm.requestCardNonce();
    };

    useEffect(() => {
// 
        let idempotency_key = uuidv4();
        // Create and initialize a payment form object
        const pf = new SqPaymentForm({
          // Initialize the payment form elements
        // 
          //TODO: get id's from enviroment variables
          applicationId: "sandbox-sq0idb-wTns1NgADNM2Lkd3dAAqoQ",
          locationID: locationID,
          inputClass: 'sq-input',
          autoBuild: false,
          // Customize the CSS for SqPaymentForm iframe elements
          inputStyles: [{
              fontSize: '16px',
              lineHeight: '24px',
              padding: '16px',
              placeholderColor: '#a0a0a0',
              backgroundColor: 'transparent',
          }],
          // Initialize the credit card placeholders
          cardNumber: {
              elementId: 'sq-card-number',
              placeholder: 'Card Number'
          },
          cvv: {
              elementId: 'sq-cvv',
              placeholder: 'CVV'
          },
          expirationDate: {
              elementId: 'sq-expiration-date',
              placeholder: 'MM/YY'
          },
          postalCode: {
              elementId: 'sq-postal-code',
              placeholder: 'Postal'
          },
          
          // SqPaymentForm callback functions
          callbacks: {
              /*
              * callback function: cardNonceResponseReceived
              * Triggered when: SqPaymentForm completes a card nonce request
              */
              cardNonceResponseReceived: function (errors, nonce, cardData) {
              if (errors) {
                  // Log errors from nonce generation to the browser developer console.
                  console.error('Encountered errors:');
                  errors.forEach(function (error) {
                      console.error('  ' + error.message);
                  });
                  alert('Encountered errors, check browser developer console for more details');
                   SetButtonState(false)
                   return;
              }
                 SetButtonState(false);
                 //TODO: Replace alert with code in step 2.1

                    fetch("/.netlify/functions/postorder", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "applicaiton/json"
                        },
                        body: JSON.stringify({
                            nonce,
                            idempotency_key,
                            locationID
                        })
                    })
                    .catch(_err => {
                        alert(`Network error: ${_err}`);
                    })
                    .then((_res) => {
                        if(!_res.ok) {
                            return _res.json().then(_errInfo => Promise.reject(_errInfo));
                        }

                        return _res.json();
                    })
                    .then(_data => {
                        console.log(_data);
                        alert("Payment completed successfully");
                        SetButtonState(false);
                    })
                    .catch(_err => {
                        console.error(_err)
                        // generate new idempotency key for next payment
                        idempotency_key = uuidv4();
                        SetButtonState(false);
                        alert("Payment failed to complete")
                    })
                }
          }
        });

        pf.build();
        SetButtonState(false);
        SetForm(pf);
        //SetButtonState(false);

        //Generate a random UUID as an idempotency key for the payment request
        // length of idempotency_key should be less than 45
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        };

        //Disable or enable the Pay button to prevent duplicate payment requests
        // const setPayButtonDisableState = (_newState) => {
            // var payButton = document.getElementById("sq-creditcard");
            // payButton.disabled = _newState;
//            Redraw the payment button
            // var buttonContent = payButton.innerHTML;
            // payButton.innerHTML = buttonContent;
        // }
    },[])


    return (
        <div id="form-container">
            <div id="sq-card-number"></div>
            <div class={style.third} id="sq-expiration-date"></div>
            <div class={style.third} id="sq-cvv"></div>
            <div class={style.third} id="sq-postal-code"></div>
            <button id="sq-creditcard" disabled={buttonDisabled} class={style["button-credit-card"]} onClick={onGetCardNonce}>Pay £1.00</button>
         </div>
    )
}

export default PaymentForm;