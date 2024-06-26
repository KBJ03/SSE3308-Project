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

    $('#checkoutButton').click(function(){
        window.location = '../index.html';
    }

    );



    // Constant for shopping fee
    const shoppingFee = 5.00; // You can adjust this value as needed

    // Function to update total price
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

    // Checkbox change event handler using event delegation
    $(document).on('change', '.cart-item input[type="checkbox"]', function() {
        updateTotalPrice();
    });

    // Plus and minus button event handlers
    $(document).on('click', '.plus', function() {
        var $quantityInput = $(this).closest('.quantity').find('.input-number');
        var currentQuantity = parseInt($quantityInput.val());
        if (currentQuantity < 99) { // Ensure quantity does not exceed max value
            $quantityInput.val(currentQuantity + 1);
            var itemID = $(this).closest('.cart-item').data('itemid');
            updateCartItemQuantity(itemID, currentQuantity + 1);
            updateTotalPrice();
        }
    });

    $(document).on('click', '.minus', function() {
        var $quantityInput = $(this).closest('.quantity').find('.input-number');
        var currentQuantity = parseInt($quantityInput.val());
        if (currentQuantity > 1) { // Ensure quantity does not go below min value
            $quantityInput.val(currentQuantity - 1);
            var itemID = $(this).closest('.cart-item').data('itemid');
            updateCartItemQuantity(itemID, currentQuantity - 1);
            updateTotalPrice();
        }
    });

    // Handle click event on trash icon to delete cart item
    $(document).on('click', '.fa-trash', function() {
        var cartItem = $(this).closest('.cart-item');
        var itemID = cartItem.data('itemid');
        
        // Send AJAX request to deleteCartItem.php
        $.ajax({
            url: 'php_part/deleteCartItem.php',
            type: 'POST',
            data: { itemID: itemID },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Remove the cart item from the UI
                    cartItem.remove();
                    updateTotalPrice();
                } else {
                    console.error('Failed to delete cart item:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error deleting cart item:', error);
            }
        });
    });

    // Function to update cart item quantity in the database

    function updateCartItemQuantity(itemID, newQuantity) {
        $.ajax({
            url: 'php_part/updateQuantity.php',
            type: 'POST',
            data: { itemID: itemID, quantity: newQuantity, memberID: id },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    console.log('Cart item quantity updated successfully');
                } else {
                    console.error('Failed to update cart item quantity:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating cart item quantity:', error);
            }
        });
    }


    // Select all checkbox event handler
    $('#checkboxSelectAll input').change(function() {
        var isChecked = $(this).prop('checked');
        $('.cart-item input[type="checkbox"]').prop('checked', isChecked);
        updateTotalPrice();
    });

    // Initial call to set total price on page load
    updateTotalPrice();
});
