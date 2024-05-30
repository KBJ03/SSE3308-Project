
function editAccount(event){
    event.preventDefault();
    var userName = document.getElementById("editUserName").value;
    var memberId = document.getElementById("EditMemberId").value;
    var gender= document.getElementById("editGender");
    var option=gender.options[gender.selectedIndex].text;
    var date=document.getElementById("birthday").value;
    var phone=document.getElementById("phone").value;
    var email=document.getElementById("email").value;

    document.getElementById("user").innerHTML=userName;
    document.getElementById("id").innerHTML=memberId;
    document.getElementById("Gender").innerHTML=option;
    document.getElementById("date").innerHTML=date;
    document.getElementById("phoneNumber").innerHTML=phone;
    document.getElementById("email-address").innerHTML=email;
}

function editShipping(event){
    event.preventDefault();
    var name=document.getElementById("shipping-name").value;
    var phone=document.getElementById("shipping-phone").value;
    var address=document.getElementById("shipping-address").value;
    var postal=document.getElementById("shipping-postal").value;
    var remark=document.getElementById("shipping-remark").value;

    document.getElementById("name").innerHTML=name;
    document.getElementById("number").innerHTML=phone;
    document.getElementById("address").innerHTML=address;
    document.getElementById("postalCode").innerHTML=postal;
    document.getElementById("remark").innerHTML=remark;
}

function editPayment(event){
    event.preventDefault();
    var payment=document.getElementById("payment-method").value;
    var card=document.getElementById("card-number").value;

    document.getElementById("paymentMethod").innerHTML=payment;
    document.getElementById("card").innerHTML=card;
}