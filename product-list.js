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

const itemName = [ ["AI-Integrated Adaptive Keyboard", "Mechanical Keyboard", "Wireless Ergonomic Keyboard", "RGB Gaming Keyboard", "Ultra-Thin Portable Keyboard", "Compact Mechanical Keyboard"],
["Optical Mouse", "Wireless Mouse", "Gaming Mouse", "Ergonomic Mouse", "Trackball Mouse", "Vertical Mouse"],
["Bluetooth Speaker", "Portable Speaker", "Wireless Speaker", "Desktop Speaker", "Bookshelf Speaker", "Smart Speaker"]
];

const price = [["$100.99", "$120.49", "$80.99", "$150.00", "$99.99", "$110.75"], 
  ["$50.49", "$70.99", "$40.79", "$90.00", "$60.99", "$55.75"],
  ["$200.99", "$180.49", "$250.79", "$300.00", "$220.99", "$195.75"]
];

const id1 = [["Item ID: KB-AI001", "Item ID: KB-ME002", "Item ID: KB-WE003", "Item ID: KB-RG004", "Item ID: KB-UP005", "Item ID: KB-CM006"],
["Item ID: MS-OPT001", "Item ID: MS-WRL002", "Item ID: MS-GAM003", "Item ID: MS-ERG004", "Item ID: MS-TRK005", "Item ID: MS-VRT006"],
["Item ID: SP-BTH001", "Item ID: SP-PRT002", "Item ID: SP-WRL003", "Item ID: SP-DKT004", "Item ID: SP-BKS005", "Item ID: SP-SMT006"]
];


for(let i = 0 ; i<3 ; i++){
        
    const heading = document.createElement('h1');
    heading.innerHTML = categoryName[i];
    heading.classList.add('text-primary', 'text-center', 'my-2', 'text-black');
    category[i].appendChild(heading);

    for(let j = 0 ; j<6; j++){

        const div_col = document.createElement('div');
        div_col.classList.add('col-6');
        
        const div_container = document.createElement('div');
        div_container.classList.add('container', 'p-3', 'bg-white', 'con', 'm-1', 'animation', 'mb-3');
        div_container.style.display = "flex";
        div_container.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.1)";
        
        const div_image = document.createElement('div');
        div_image.classList.add('image-container');

        const productImg = document.createElement('img');
        productImg.src = `Images/${categoryNameImg[i]}/${categoryNameImg[i]}${j+1}.png`;
        
        const div_description = document.createElement('div');
        div_description.classList.add('ms-3');
        div_description.style.width = '280px';
        div_description.style.height = '220px';

        
        const productName = document.createElement('h3');
        productName.classList.add('mb-3');
        productName.innerHTML = itemName[i][j];
        
        const productDiv = document.createElement('div');
        productDiv.classList.add('d-flex', 'justify-content-evenly');

        const productPrice = document.createElement('p');
        productPrice.innerHTML = price[i][j];
        productPrice.style.fontSize = "25px";

        const divRate = document.createElement('div');
        divRate.classList.add('star-rating');

        for(var k = 0 ; k < 5 ; k++){
          const star = document.createElement('span');
          star.classList.add('star-filled');
          star.innerHTML = '☆';
          divRate.appendChild(star);
        }

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('d-flex', 'justify-content-between');

        const link = document.createElement('a');
        link.href = 'product detail.html?MemberID=' + memberId + '&ItemId=' + itemId;
        link.style.textDecoration = 'none';
        const detail_button = document.createElement('button');
        const detail_button2 = document.createElement('button');
        detail_button.innerHTML = 'Add to cart';

        detail_button.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4', 'ms-2');
        detail_button2.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4');

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
        category[i].appendChild(div_col);
    }
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('/webProject/php_part/getData.php')
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              let resultHTML = '<p>';
              data.results.forEach(item => {
                  resultHTML += `${item.name} - ${item.price}`;
              });
              resultHTML += '</p>';
              document.getElementById('try').innerHTML = resultHTML;
          } else {
              document.getElementById('try').innerText = 'No data found or an error occurred';
          }
      })
      .catch(error => console.error('Error:', error));
});