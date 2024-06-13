
function editAccount(event) {
    event.preventDefault();
    var userName = document.getElementById("editUserName").value;
    var memberId = document.getElementById("EditMemberId").value;
    var gender = document.getElementById("editGender").value;
    var date = document.getElementById("birthday").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;

    fetch('updateProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userName,
            memberId: memberId,
            gender: gender,
            birthday: date,
            phone: phone,
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the UI with the updated profile information
            document.getElementById('user').textContent = userName;
            document.getElementById('id').textContent = memberId;
            document.getElementById('Gender').textContent = gender;
            document.getElementById('date').textContent = date;
            document.getElementById('phoneNumber').textContent = phone;
            document.getElementById('email-address').textContent = email;
        } else {
            console.error('Error updating profile:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function editShipping(event) {
    event.preventDefault();
    var name = document.getElementById("shipping-name").value;
    var phone = document.getElementById("shipping-phone").value;
    var address = document.getElementById("shipping-address").value;
    var postal = document.getElementById("shipping-postal").value;
    var remark = document.getElementById("shipping-remark").value;

    fetch('updateProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            postal: postal,
            remark: remark
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the UI with the updated shipping information
            document.getElementById('name').textContent = name;
            document.getElementById('number').textContent = phone;
            document.getElementById('address').textContent = address;
            document.getElementById('postalCode').textContent = postal;
            document.getElementById('remark').textContent = remark;
        } else {
            console.error('Error updating shipping information:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function editPayment(event) {
    event.preventDefault();
    var payment = document.getElementById("payment-method").value;
    var card = document.getElementById("card-number").value;

    fetch('updateProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            payment: payment,
            card: card
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the UI with the updated payment information
            document.getElementById('paymentMethod').textContent = payment;
            document.getElementById('card').textContent = card;
        } else {
            console.error('Error updating payment information:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}