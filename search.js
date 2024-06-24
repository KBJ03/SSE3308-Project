const searchResult = document.getElementById('search-result');

const itemName = [ ["AI-Integrated Adaptive Keyboard", "Mechanical Keyboard", "Wireless Ergonomic Keyboard", "RGB Gaming Keyboard", "Ultra-Thin Portable Keyboard", "Compact Mechanical Keyboard"],
["Optical Mouse", "Wireless Mouse", "Gaming Mouse", "Ergonomic Mouse", "Trackball Mouse", "Vertical Mouse"],
["Bluetooth Speaker", "Portable Speaker", "Wireless Speaker", "Desktop Speaker", "Bookshelf Speaker", "Smart Speaker"]
];

const price = [["$100.99", "$120.49", "$80.99", "$150.00", "$99.99", "$110.75"], 
  ["$50.49", "$70.99", "$40.79", "$90.00", "$60.99", "$55.75"],
  ["$200.99", "$180.49", "$250.79", "$300.00", "$220.99", "$195.75"]
];


document.addEventListener('DOMContentLoaded', function() {
  fetch('php_part/getSearch.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ searchTerm:  searchValue})
})
      .then(response => response.json())
      .then(data => {
         if(data.success){
          for(let j = 0 ; j<data.length; j++){
    
            const div_col = document,createElement('div');
            div_col.classList.add('col-6');

            const div_container = document.createElement('div');
            div_container.classList.add('container', 'p-3', 'bg-white', 'con', 'm-1', 'animation', 'mb-3');
            div_container.style.display = "flex";
            div_container.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.1)";
            div_container.style.width = '90%';
            
            const div_image = document.createElement('div');
            div_image.classList.add('image-container');
        
            const productImg = document.createElement('img');
            productImg.src = `Images/keyboard/keyboard${j+1}.png`;
            
            const div_description = document.createElement('div');
            div_description.classList.add('ms-3');
            div_description.style.width = '800px';
            div_description.style.height = '220px';
        
            
            const productName = document.createElement('h3');
            productName.classList.add('mb-3');
            productName.innerHTML = itemName[0][j];
            
            const productDiv = document.createElement('div');
            productDiv.classList.add('d-flex', 'justify-content-start');
        
            const productPrice = document.createElement('p');
            productPrice.innerHTML = price[0][j];
            productPrice.style.fontSize = "25px";
        
            const divRate = document.createElement('div');
            divRate.classList.add('star-rating', 'ms-4');
        
            for(var k = 0 ; k < 5 ; k++){
              const star = document.createElement('span');
              star.classList.add('star-filled');
              star.innerHTML = '☆';
              divRate.appendChild(star);
            }
        
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('d-flex', 'justify-content-end');
        
            const link = document.createElement('a');
            link.href = "product detail.html"; 
            link.style.textDecoration = 'none';
            const detail_button = document.createElement('button');
            const detail_button2 = document.createElement('button');
            detail_button.innerHTML = 'Add to cart';
        
            detail_button.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4');
            detail_button2.classList.add('btn', 'btn-primary', 'button-hover', 'mt-4', 'ms-4');
        
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
            
            searchResult.appendChild(div_col);
        }
        
         }
              
      })
      .catch(error => console.error('Error:', error));
});
