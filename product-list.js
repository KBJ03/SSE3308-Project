const params1 = new URLSearchParams(window.location.search);
const memberId = params1.get('MemberID');

const params2 = new URLSearchParams(window.location.search);
const itemId = params2.get('ItemID');

const keyboard = document.getElementById('keyboard');
const mouse = document.getElementById('mouse');
const speaker = document.getElementById('speaker');

const category = [keyboard, mouse, speaker];
const categoryName = ["Keyboard", "Mouse", "Speaker"];
const categoryNameImg = ["keyboard", "mouse", "speaker"];

let productData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('php_part/getProduct.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                productData = data.results;
                
                for(let i = 0 ; i<3 ; i++){
                        
                    const heading = document.createElement('h1');
                    heading.innerHTML = categoryName[i];
                    heading.classList.add('text-primary', 'text-center', 'my-2', 'text-black');
                    category[i].appendChild(heading);
                }

                for(let i = 0 ; i < productData.length ; i++){

                        const div_col = document.createElement('div');
                        div_col.classList.add('col-6');
                        
                        const div_container = document.createElement('div');
                        div_container.classList.add('container', 'p-3', 'bg-white', 'con', 'm-1', 'animation', 'mb-3');
                        div_container.style.display = "flex";
                        div_container.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.1)";
                        
                        const div_image = document.createElement('div');
                        div_image.classList.add('image-container');

                        const productImg = document.createElement('img');
                        productImg.src = productData[i]['Url'];
                        
                        const div_description = document.createElement('div');
                        div_description.classList.add('ms-3');
                        div_description.style.width = '280px';
                        div_description.style.height = '220px';

                        
                        const productName = document.createElement('h3');
                        productName.classList.add('mb-3');
                        productName.innerHTML = productData[i]['ProductName'];
                        
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('d-flex', 'justify-content-evenly');

                        const productPrice = document.createElement('p');
                        productPrice.innerHTML = productData[i]['Price'];
                        productPrice.style.fontSize = "25px";

                        const divRate = document.createElement('div');
                        divRate.classList.add('star-rating');

                        for(var k = 0 ; k < productData[i]['Rating'] ; k++){
                        const star = document.createElement('span');
                        star.classList.add('star-filled');
                        star.innerHTML = '☆';
                        divRate.appendChild(star);
                        }

                        const buttonDiv = document.createElement('div');
                        buttonDiv.classList.add('d-flex', 'justify-content-between');

                        const link = document.createElement('a');
                        link.href = 'product detail.html?MemberID=' + memberId + '&ItemId=' + productData[i]['ItemID'];
                        link.style.textDecoration = 'none';
                        const detail_button = document.createElement('button');
                        const detail_button2 = document.createElement('button');
                        detail_button.innerHTML = 'Add to cart';

                        detail_button.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4', 'ms-2');
                        detail_button2.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4');

                        detail_button.addEventListener('click', function() {
                            fetch('php_part/addToCart.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    memberID: memberId,
                                    itemID: productData[i]['ItemID']
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                                alert(data.message); // Show the response message
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Failed to add product to cart!');
                            });
                        });

                        detail_button2.innerHTML = 'More Details...';

                        detail_button2.addEventListener('mouseenter', function() {
                            detail_button2.classList.remove('btn-primary');
                            detail_button2.classList.add('btn-success');
                            detail_button2.style.transition = "0.5s";
                        });

                        detail_button2.addEventListener('mouseleave', function() {
                            detail_button2.classList.remove('btn-success');
                            detail_button2.classList.add('btn-primary');
                            detail_button2.style.transition = "0.5s";
                        });

                        detail_button.addEventListener('mouseenter', function() {
                        detail_button.classList.remove('btn-primary');
                        detail_button.classList.add('btn-success');
                        detail_button.style.transition = "0.5s";
                    });

                    detail_button.addEventListener('mouseleave', function() {
                        detail_button.classList.remove('btn-success');
                        detail_button.classList.add('btn-primary');
                        detail_button.style.transition = "0.5s";
                    });
                        
                        div_description.appendChild(productName);

                        productDiv.appendChild(productPrice);
                        productDiv.appendChild(divRate);
                        div_description.appendChild(productDiv);


                        link.appendChild(detail_button2);
                        buttonDiv.appendChild(detail_button);
                        buttonDiv.appendChild(link);
                        div_description.appendChild(buttonDiv);
                        
                        div_image.appendChild(productImg);
                        div_container.appendChild(div_image);
                        div_container.appendChild(div_description);
                        
                        div_col.appendChild(div_container);
                        
                        if(productData[i]["Category"] == "keyboard"){
                            keyboard.appendChild(div_col);
                        }else if(productData[i]["Category"] == "mouse"){
                            mouse.appendChild(div_col);
                        }else if(productData[i]["Category"] == "speaker"){
                            speaker.appendChild(div_col);
                        }else{

                        }
                    
                }


            } else {
                document.getElementById('try').innerText = 'No data found or an error occurred';
            }
        })
        .catch(error => console.error('Error:', error));
});
