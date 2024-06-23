document.addEventListener('DOMContentLoaded', function() {
    
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('MemberID');

    fetch('/php_part/getProfile.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('editUserName').value = data.profile[0]["Username"];
                document.getElementById('editMemberId').value = data.profile[0]["MemberID"];
                document.getElementById('editGender').value = data.profile[0]["Gender"];
                document.getElementById('birthday').value = data.profile[0]["Birthday"];
                document.getElementById('phone').value = data.profile[0]["Phone"];
                document.getElementById('email').value = data.profile[0]["Email"];
                
                const genderSelect = document.getElementById('editGender');
                const selectedGender = data.profile[0]["Gender"].toLowerCase();
                
                for (let i = 0; i < genderSelect.options.length; i++) {
                    if (genderSelect.options[i].value === selectedGender) {
                        genderSelect.options[i].selected = true;
                        break;
                    }
                }
            } else {
                console.error('Error fetching profile information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
})

function editAccount(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('editAccountForm'));
    
    const genderInput = document.getElementById('editGender');
    const capitalizedGender = genderInput.value.charAt(0).toUpperCase() + genderInput.value.slice(1);
    formData.set('gender', capitalizedGender);
    
    fetch('/php_part/updateProfile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.reload();
    })
    .catch(error => {
        alert('An error occurred: ' + error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('MemberID');

    fetch('/php_part/getProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('shipping-name').value = data.shipping[0]["Name"];
            document.getElementById('shipping-phone').value = data.shipping[0]["Phone"];
            document.getElementById('shipping-address').value = data.shipping[0]["Address"];
            document.getElementById('shipping-postal').value = data.shipping[0]["PostalCode"];
            document.getElementById('shipping-remark').value = data.shipping[0]["Remark"];
        } else {
            console.error('Error fetching shipping information:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});

function editShipping(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('editShippingForm'));

    fetch('/php_part/updateShipping.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.reload();
    })
    .catch(error => {
        alert('An error occurred: ' + error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('MemberID');

    fetch('/php_part/getProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('payment-method').value = data.payment[0]["PaymentMethod"];
            
            let cardNumber = data.payment[0]["CardNumber"];
            if (cardNumber && cardNumber.length >= 16) {
                cardNumber = cardNumber.trim();
                const maskedCardNumber = '**** **** **** ' + cardNumber.slice(-4);
                document.getElementById('card-number').value = maskedCardNumber;
            } else {
                document.getElementById('card-number').textContent = '';
            }

        } else {
            console.error('Error fetching payment information:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});

function editPayment(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('editPaymentForm'));

    fetch('/php_part/updatePayment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.reload();
    })
    .catch(error => {
        alert('An error occurred: ' + error);
    });
}