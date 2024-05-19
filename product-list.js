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
    heading.classList.add('text-primary', 'text-center', 'my-2');
    category[i].appendChild(heading);

    for(let j = 0 ; j<6; j++){

        const div_col = document.createElement('div');
        div_col.classList.add('col-6');
        
        const div_container = document.createElement('div');
        div_container.classList.add('container', 'p-3');
        div_container.style.display = "flex";
        
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
        
        div_description.appendChild(productName);
        div_description.appendChild(productPrice);
        div_description.appendChild(productId);
        
        div_container.appendChild(productImg);
        div_container.appendChild(div_description);
        
        div_col.appendChild(div_container);
        category[i].appendChild(div_col);
    }
}

