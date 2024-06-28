document.addEventListener('DOMContentLoaded', function() {

    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('MemberID');

    // Fetch profile information
    fetch('php_part/getProfile.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update profile information on the page
                document.getElementById('user').textContent = data.profile[0]["Username"];
                document.getElementById('id').textContent = data.profile[0]["MemberID"];
                document.getElementById('Gender').textContent = data.profile[0]["Gender"];
                document.getElementById('date').textContent = data.profile[0]["Birthday"];
                document.getElementById('phoneNumber').textContent = data.profile[0]["Phone"];
                document.getElementById('email-address').textContent = data.profile[0]["Email"];
            } else {
                console.error('Error fetching profile information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Fetch shipping information
    fetch('php_part/getProfile.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update shipping information on the page
                document.getElementById('name').textContent = data.shipping[0]["Name"];
                document.getElementById('number').textContent = data.shipping[0]["Phone"];
                document.getElementById('address').textContent = data.shipping[0]["Address"];
                document.getElementById('postalCode').textContent = data.shipping[0]["PostalCode"];
                document.getElementById('remark').textContent = data.shipping[0]["Remark"];
            } else {
                console.error('Error fetching shipping information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Fetch payment information
    fetch('php_part/getProfile.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update payment information on the page
                document.getElementById('paymentMethod').textContent = data.payment[0]["PaymentMethod"];
            
                let cardNumber = data.payment[0]["CardNumber"];
                if (cardNumber) {
                    cardNumber = cardNumber.trim();
                    let maskedCardNumber = '**** **** **** ' + cardNumber.slice(-4);
                    document.getElementById('cardNumber').textContent = maskedCardNumber;
                } else {
                    document.getElementById('cardNumber').textContent = '';
                }

            } else {
                console.error('Error fetching payment information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Fetch history information
    fetch('php_part/getProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const historyTable = document.getElementById('historyTable');
    
            if (data.history && Array.isArray(data.history)) {
                data.history.forEach(item => {
                    const historyItem = historyTable.insertRow();
                    const formattedItemDetails = item.ItemDetails.replace(/,/g, '<br>'); // Replace commas with <br>
                    const formattedAmount = `$${item.TotalAmount.toFixed(2)}`;
                    historyItem.innerHTML = `
                        <td>${item.OrderID}</td>
                        <td>${formattedItemDetails}</td>
                        <td>${formattedAmount}</td>
                    `;
                });
            }

            
        } else {
            console.error('Error fetching history information:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});