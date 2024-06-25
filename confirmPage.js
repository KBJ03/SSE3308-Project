const params1 = new URLSearchParams(window.location.search);
const memberId = params1.get('MemberID');
let cartItem=[];
let total=0;

const confirm=document.getElementById('button');
confirm.href='cart.php?MemberID=' + memberId;

document.addEventListener('DOMContentLoaded', function () {
    fetch('php_part/getConfirmPage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ MemberID: memberId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('name').innerHTML=data.results[0]["Name"];
            document.getElementById('phone').innerHTML=data.results[0]["Phone"];
            document.getElementById('address').innerHTML=data.results[0]["Address"];
            document.getElementById('code').innerHTML=data.results[0]["PostalCode"];
            document.getElementById('email').innerHTML=data.results[0]["Email"];
            document.getElementById('method').innerHTML=data.results[0]["PaymentMethod"];
            document.getElementById('card').innerHTML=data.results[0]["CardNumber"];
        }
            else {
                console.error('Error fetching confirm information:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });


    document.addEventListener('DOMContentLoaded', function () {
        fetch('php_part/getCartItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ MemberID: memberId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cartItem=data.results;
                let table=document.createElement('table');
                table.classList.add('table','table-striped');
                for(let i=0;i<cartItem.length;i++){
                    let tr=document.createElement('tr');
                    let td1=document.createElement('td');
                    td1.innerHTML=cartItem[i]['ProductName']+' X '+cartItem[i]['Quantity'];
                    tr.appendChild(td1);
                    let td2=document.createElement('td');
                    var price=cartItem[i]['Quantity']*cartItem[i]['Price'];
                    total+=price;
                    td2.innerHTML='RM'+price.toFixed(2);
                    tr.appendChild(td2);
                    table.appendChild(tr);
                }

                let tr=document.createElement('tr');
                let td1=document.createElement('td');
                td1.innerHTML='Total';
                tr.appendChild(td1);
                let td2=document.createElement('td');
                td2.innerHTML='RM'+total.toFixed(2);
                tr.appendChild(td2);
                table.appendChild(tr);

                document.getElementById('table-container').appendChild(table);
            }
                else {
                    console.error('Error fetching confirm information:', data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        });