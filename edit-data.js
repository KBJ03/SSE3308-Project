document.addEventListener('DOMContentLoaded', function() {
    fetch('/php_part/getProfile.php') // Adjust the ID parameter as necessary
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('editUserName').value = data.profile[0]["Username"];
                document.getElementById('editMemberId').value = data.profile[0]["MemberID"];
                document.getElementById('editGender').value = data.profile[0]["Gender"];
                document.getElementById('birthday').value = data.profile[0]["Birthday"];
                document.getElementById('phone').value = data.profile[0]["Phone"];
                document.getElementById('email').value = data.profile[0]["Email"];

                var genderInput = document.getElementById('editGender');
                var selectedGender = data.profile[0]["Gender"].toLowerCase();
                genderInput.value = selectedGender;

            } else {
                console.error('Error fetching profile information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

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
    fetch('/php_part/getProfile.php') // Adjust the ID parameter as necessary
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('shipping-name').value = data.shipping[0]["Name"];
                document.getElementById('shipping-phone').value = data.shipping[0]["Phone"];
                document.getElementById('shipping-address').value = data.shipping[0]["Address"];
                document.getElementById('shipping-postal').value = data.shipping[0]["Postal Code"];
                document.getElementById('shipping-remark').value = data.shipping[0]["Remark"];
            } else {
                console.error('Error fetching profile information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

function editShipping(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('editShippingForm'));

    fetch('/Group%20Project/php_part/updateShipping.php', {
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
    fetch('/php_part/getProfile.php') // Adjust the ID parameter as necessary
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let paymentMethod = data.payment[0]["Payment Method"];
                document.getElementById('payment-method').value = paymentMethod;

                let cardNumber = data.payment[0]["Card Number"];
                let formattedCardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();
                let maskedCardNumber = formattedCardNumber.split(' ').map((part, index) => {
                    return index < 3 ? '****' : part;
                }).join(' ');
                document.getElementById('card-number').value = maskedCardNumber;

            } else {
                console.error('Error fetching profile information:', data.message);
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