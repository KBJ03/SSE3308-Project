const params = new URLSearchParams(window.location.search);
const id = params.get('MemberID');
console.log(id);

const modalContact = document.getElementById('modalContact');
modalContact.href = 'contact.html?MemberID=' + id;

const navProduct = document.getElementById('navProduct');
navProduct.href = 'product-list.html?MemberID=' + id;