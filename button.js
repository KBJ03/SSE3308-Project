$(document).ready(function() {
    $('#checkoutButton').click(function() {
        $('#checkoutModal').modal('show');
    });

    // Handle confirm checkout button click
    $('#confirmCheckout').click(function() {
        // Clear checked items
        $('.cart-item input[type="checkbox"]:checked').each(function() {
            $(this).closest('.cart-item').remove();
        });
        updateTotalPrice(); // Update total price after removing items
        $('#checkoutModal').modal('hide');
    });

    // Handle delete item button click
    $('.delete-item').click(function(e) {
        e.preventDefault();
        // Get the parent cart item
        var cartItem = $(this).closest('.cart-item');
        // Get the product name of the item to be deleted
        var productName = cartItem.find('h4').text();
        
        // Send an AJAX request to the server-side script to delete the item
        $.ajax({
            url: 'delete_item.php',
            method: 'POST',
            data: {productName: productName}, // Include the product name in the request data
            success: function(response) {
                // Parse the JSON response
                var data = JSON.parse(response);
                // Check if deletion was successful
                if (data.success) {
                    // Display an alert message
                    alert(data.message);
                    // If deletion is successful, remove the item from the DOM
                    cartItem.remove();
                    // Update total price after removing the item
                    updateTotalPrice();
                } else {
                    // Display an error message
                    alert(data.message);
                }
            },
            error: function(xhr, status, error) {
                // Handle any errors that occur during the AJAX request
                console.error(error);
            }
        });
    });
    
    
    // Constant for shopping fee
    const shoppingFee = 5.00; // You can adjust this value as needed

    function updateTotalPrice() {
        var totalPrice = 0;
        $('.cart-item').each(function() {
            // Check if the checkbox is checked
            var isChecked = $(this).find('input[type="checkbox"]').prop('checked');
            if (isChecked) {
                var quantity = parseInt($(this).find('.input-number').val());
                var price = parseFloat($(this).find('.current-price').text().replace('$', ''));
                totalPrice += quantity * price;
            }
        });
        // Add shopping fee to total price
        totalPrice += shoppingFee;
        $('#totalPrice').text('Total Price: $' + totalPrice.toFixed(2));
        // Update shipping fee
        $('#shippingFee').text('Shipping Fee: $' + shoppingFee.toFixed(2));
    }

    // Checkbox change event handler
    $('input[type="checkbox"]').change(function() {
        updateTotalPrice();
    });

    // Plus button click handler
    $('.btn-number[data-type="plus"]').click(function(e){
        e.preventDefault();
        var input = $(this).closest('.cart-item').find('.input-number');
        var currentValue = parseInt(input.val());
        if (!isNaN(currentValue)) {
            input.val(currentValue + 1);
            updateTotalPrice();
        }
    });

    // Minus button click handler
    $('.btn-number[data-type="minus"]').click(function(e) {
        e.preventDefault();
        var input = $(this).closest('.cart-item').find('.input-number');
        var currentValue = parseInt(input.val());
        if (!isNaN(currentValue) && currentValue > 1) {
            input.val(currentValue - 1);
            updateTotalPrice();
        }
    });

    // Initial calculation of total price
    updateTotalPrice();
});
