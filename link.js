const params = new URLSearchParams(window.location.search);
const id = params.get('MemberID');

//Navigation link
const logoHome = document.getElementById('logoHome');
logoHome.href = 'home.html?MemberID=' + id;

const navProduct = document.getElementById('navProduct');
navProduct.href = 'product-list.html?MemberID=' + id;

const navProfile = document.getElementById('navProfile');
navProfile.href = 'profile.html?MemberID=' + id;

const navCart = document.getElementById('navCart');
navCart.href = 'cart.html?MemberID=' + id;

//Modal link
const modalHome = document.getElementById('modalHome');
modalHome.href = 'home.html?MemberID=' + id + '#welcome';

const modalHomeAnnouncement = document.getElementById('modalHomeAnnouncement');
modalHomeAnnouncement.href = 'home.html?MemberID=' + id + '#announcement';

const modalHomeAbout = document.getElementById('modalHomeAbout');
modalHomeAbout.href = 'home.html?MemberID=' + id + '#about';

const modalHomeHistory = document.getElementById('modalHomeHistory');
modalHomeHistory.href = 'home.html?MemberID=' + id + '#history';

const modalHomeCommitment = document.getElementById('modalHomeCommitment');
modalHomeCommitment.href = 'home.html?MemberID=' + id + '#commitment';

const modalHomeTeam = document.getElementById('modalHomeTeam');
modalHomeTeam.href = 'home.html?MemberID=' + id + '#team';

const modalProduct = document.getElementById('modalProduct');
modalProduct.href = 'product-list.html?MemberID=' + id;

const modalKeyboard = document.getElementById('modalKeyboard');
modalKeyboard.href = 'product-list.html?MemberID=' + id + '#keyboard';

const modalMouse = document.getElementById('modalMouse');
modalMouse.href = 'product-list.html?MemberID=' + id + '#mouse';

const modalSpeaker = document.getElementById('modalSpeaker');
modalSpeaker.href = 'product-list.html?MemberID=' + id + '#speaker';

const modalContact = document.getElementById('modalContact');
modalContact.href = 'contact.html?MemberID=' + id;
