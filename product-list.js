

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

const price = [ ["Price: $100.99", "Price: $120.49", "Price: $80.99", "Price: $150.00", "Price: $99.99", "Price: $110.75"],
["Price: $50.49", "Price: $70.99", "Price: $40.79", "Price: $90.00", "Price: $60.99", "Price: $55.75"],
["Price: $200.99", "Price: $180.49", "Price: $250.79", "Price: $300.00", "Price: $220.99", "Price: $195.75"]
];

const id = [["Item ID: KB-AI001", "Item ID: KB-ME002", "Item ID: KB-WE003", "Item ID: KB-RG004", "Item ID: KB-UP005", "Item ID: KB-CM006"],
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
        div_container.classList.add('container', 'p-3', 'bg-white', 'm-1', 'con', 'animation', 'mb-3');
        div_container.style.display = "flex";
        div_container.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.1)";
        
        
        const productImg = document.createElement('img');
        productImg.src = `Images/${categoryNameImg[i]}/${categoryNameImg[i]}${j+1}.png`;
        
        const div_description = document.createElement('div');
        div_description.classList.add('ms-3');
        
        const productName = document.createElement('h3');
        productName.classList.add('mb-3');
        productName.innerHTML = itemName[i][j];
        
        const productPrice = document.createElement('p');
        productPrice.innerHTML = price[i][j];
        
        const productId = document.createElement('p');
        productId.innerHTML = id[i][j];

        const link = document.createElement('a');
        link.href = "login.html"; 
        const detail_button = document.createElement('button');

        detail_button.classList.add('btn', 'btn-primary', 'button-hover', 'd-flex', 'justify-content-end', 'mt-4');

        if(i == 0 && j == 5){
            detail_button.classList.remove('mt-3');
        }

        detail_button.style.marginLeft = "125px";
        detail_button.innerHTML = 'More Details...';

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
        div_description.appendChild(productPrice);
        div_description.appendChild(productId);

        link.appendChild(detail_button);
        div_description.appendChild(link);
        
        div_container.appendChild(productImg);
        div_container.appendChild(div_description);
        
        div_col.appendChild(div_container);
        category[i].appendChild(div_col);
    }
}

/*Javascript for mouse trailer */
const dots = [];
      const cursor = {
        x: 0,
        y: 0,
      };

      for (let i = 0; i < 20; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        document.body.appendChild(dot);
        dots.push(dot);
      }

      document.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      });

      function draw() {
        let x = cursor.x;
        let y = cursor.y;

        dots.forEach((dot, index) => {
          const nextDot = dots[index + 1] || dots[0];

          dot.style.left = x + "px";
          dot.style.top = y + "px";

          x += (nextDot.offsetLeft - dot.offsetLeft) * 0.5;
          y += (nextDot.offsetTop - dot.offsetTop) * 0.5;
        });
      }

      setInterval(draw, 10);