
        const params2 = new URLSearchParams(window.location.search);
        const itemId = params2.get('ItemId');

        document.addEventListener('DOMContentLoaded', function () {
            fetch('php_part/getProductDetail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemID: itemId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const similar1 = data.results[0]["Similar1"];
                    const similar2 = data.results[0]["Similar2"];
                    
                    document.getElementById('image').src = data.results[0]["Url"];
                    document.getElementById('image').alt = data.results[0]["ProductName"];
                    document.getElementById('name').innerHTML = data.results[0]["ProductName"];
                    document.getElementById('price').innerHTML = data.results[0]["Price"];
                    document.getElementById('item').innerHTML = data.results[0]["ItemID"];
                    document.getElementById('description').innerHTML = data.results[0]["Description"];
                    document.getElementById('feature1').innerHTML = data.results[0]["Feature1"];
                    document.getElementById('feature2').innerHTML = data.results[0]["Feature2"];
                    
                    // Nested fetch for similar products
                    fetch('php_part/getSimilar.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Similar1: similar1,
                            Similar2: similar2
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            document.getElementById('similar1').src = data.results[0]["Url"];
                            document.getElementById('similar1').alt=data.results[0]["ProductName"];
                            document.getElementById('similar1Name').innerHTML=data.results[0]["ProductName"];
                            document.getElementById('similar1Price').innerHTML=data.results[0]["Price"];
                            document.getElementById('similar2').src = data.result[0]["Url"];
                            document.getElementById('similar2').alt=data.result[0]["ProductName"];
                            document.getElementById('similar2Name').innerHTML=data.result[0]["ProductName"];
                            document.getElementById('similar2Price').innerHTML=data.result[0]["Price"];
                        } else {
                            console.error('Error fetching similar product information:', data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
                } else {
                    console.error('Error fetching product detail information:', data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        });
 