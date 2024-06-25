function toggleCheckboxes(source) {  
    var checkboxes = document.getElementsByName('chk');  
    for (var i = 0; i < checkboxes.length; i++) {  
        if (checkboxes[i].type == 'checkbox') {  
            checkboxes[i].checked = source.checked;  
        }  
    }  
}

document.addEventListener('DOMContentLoaded', (event) => {
    var checkboxes = document.getElementsByName('chk');
    var selectAllCheckbox = document.querySelector('#checkboxSelectAll input');
    
    selectAllCheckbox.addEventListener('change', function() {
        toggleCheckboxes(this);
    });
    
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function() {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else {
                var allChecked = true;
                for (var j = 0; j < checkboxes.length; j++) {
                    if (!checkboxes[j].checked) {
                        allChecked = false;
                        break;
                    }
                }
                selectAllCheckbox.checked = allChecked;
            }
        });
    }
});

(function () {
    const quantityContainer = document.querySelector(".quantity");
    const minusBtn = quantityContainer.querySelector(".minus");
    const plusBtn = quantityContainer.querySelector(".plus");
    const inputBox = quantityContainer.querySelector(".input-box");
  
    updateButtonStates();
  
    quantityContainer.addEventListener("click", handleButtonClick);
    inputBox.addEventListener("input", handleQuantityChange);
  
    function updateButtonStates() {
      const value = parseInt(inputBox.value);
      minusBtn.disabled = value <= 1;
      plusBtn.disabled = value >= parseInt(inputBox.max);
    }
  
    function handleButtonClick(event) {
      if (event.target.classList.contains("minus")) {
        decreaseValue();
      } else if (event.target.classList.contains("plus")) {
        increaseValue();
      }
    }
  
    function decreaseValue() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : Math.max(value - 1, 1);
      inputBox.value = value;
      updateButtonStates();
      handleQuantityChange();
    }
  
    function increaseValue() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
      inputBox.value = value;
      updateButtonStates();
      handleQuantityChange();
    }
  
    function handleQuantityChange() {
      let value = parseInt(inputBox.value);
      value = isNaN(value) ? 1 : value;
  
      // Execute your code here based on the updated quantity value
      console.log("Quantity changed:", value);
    }
  })();
  
 
//   document.addEventListener('DOMContentLoaded', function () {
//     fetch('php_part/getCart.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             MemberID: id
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         alert(data.message); // Show the response message
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to add product to cart!');
//     });
// });