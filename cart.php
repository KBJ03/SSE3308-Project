<?php
// Include the database connection file
require 'db.php';

try {
    $memberId = htmlspecialchars($_GET['MemberID']);
    // Fetch all items from the cart table
    $query = "
        SELECT Cart.ItemID, Product.ProductName, Product.Price, Product.Url
        FROM Cart
        JOIN Product ON Cart.ItemID = Product.ItemID
        WHERE Cart.MemberID = ?
    ";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$memberId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
    exit;
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script src="cart.js"></script>
    <script src="button.js"></script>
    <link rel="stylesheet" type="text/css" href="cart.css">
    <link rel="stylesheet" type="text/css" href="main.css">
    <link rel="stylesheet" type="text/css" href="product-list.css">
    <title>Cart</title>
</head>
<body>
    <nav class="navbar navbar-expand-md"> 
        <div class="container-fluid">

            <div class="navbar-nav">
                <button class="btn text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
                    <i class="fa fa-bars fa-2x"></i>
                </button>
            </div>
            
            <div class="d-flex me-3 ms-3">
                <a class="navbar-brand d-flex" id="logoHome">
                    <img src="Images/CompanyIcon.png" width="50" height="50" alt="Logo">
                    <h1 class="text-white ms-2">TechTonic</h1>
                </a>
            </div>

            <div class="container search-bar">
                <div class="search-container w-75">
                    <a id="searchLink">
                        <i class="fas fa-search search-icon"></i>
                    </a>
                    <input type="text" class="form-control" id="search-input" placeholder="Search...">
                    <i class="fas fa-times delete-icon" id="delete-icon"></i>
                </div>
            </div>

            <div class="navbar-nav">
                <a class="nav-item nav-link ms-4" id="navProduct">
                    <i class="fa fa-desktop fa-2x text-white"></i>
                </a>
                <a class="nav-item nav-link ms-4" id="navProfile">
                    <i class="fas fa-user fa-2x text-white"></i>
                </a>
                <a class="nav-item nav-link ms-4" id="navCart">
                    <span class="fas fa-shopping-cart fa-2x text-white"></span>
                </a>
                <a class="nav-item nav-link ms-4" href="index.html">
                    <span class="fas fa-sign-out-alt fa-2x text-white"></span>
                </a>
            </div>
        </div>
    </nav>

    <h1 class="row justify-content-center my-3 text-white">Cart</h1>
    <div class="container text-white" id="itemContainer">
        <div class="list-header-container">
            <div class="list-header-main">
                <div class="checkbox-wrap">
                    <label class="next-checkbox list-header-checkbox" id="checkboxSelectAll">
                        <input type="checkbox" value="Select All"/> 
                    </label>
                    Select All
                </div>
            </div>
        </div>
        <div class="checkout-shop-children">
            <?php foreach ($result as $item): ?>
                <div class="cart-item mb-3">
                    <div class="cart-item-inner">
                        <div class="cart-item-left">
                            <input type="checkbox" name="chk">
                            <div class="img-wrap me-3">
                                <img src=<?php echo htmlspecialchars($item['Url']); ?> alt="Keyboard Image">
                            </div>
                            <div class="content-wrap me-5">
                                <h4><?php echo htmlspecialchars($item['ProductName']); ?></h4>
                            </div>
                        </div>
                        <div class="cart-item-middle">
                            <div>
                                <p class="current-price"><?php echo htmlspecialchars($item['Price']); ?></p>
                            </div>
                            <div class="operations">
                                <span class="automation-btn-delete ms-3">
                                    <a href="#" class="delete-item"><i class="fa-solid fas fa-trash fa-2x" style="color: #ffffff;"></i></a>
                                </span>
                            </div>
                        </div>
                        <div class="cart-item-end ms-5">
                            <div class="input-group">
                                <span class="input-group-prepend">
                                    <button type="button" class="btn btn-outline-secondary btn-number" data-type="minus" data-field="quant[<?php echo htmlspecialchars($item['productName']); ?>]">
                                        <span class="fa fa-minus"></span>
                                    </button>
                                </span>
                                <input type="text" name="quant[<?php echo htmlspecialchars($item['productName']); ?>]" class="form-control input-number custom-width" value="<?php echo htmlspecialchars($item['quantity']); ?>" min="1" max="99">
                                <span class="input-group-append">
                                    <button type="button" class="btn btn-outline-secondary btn-number" data-type="plus" data-field="quant[<?php echo htmlspecialchars($item['productName']); ?>]">
                                        <span class="fa fa-plus"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>    
    </div>
    <div class="footer">
        <div class="container-fluid">
            <div class="row justify-content-between">
                <div class="col-sm-3 d-flex flex-column justify-content-end">
                    <p id="shippingFee">Shipping Fee: $0.00</p>
                    <p id="totalPrice">Total Price: $0.00</p>
                </div>
                <div class="col-sm-3">
                    <!-- Checkout button -->
                    <button type="button" class="btn btn-outline-dark my-5" id="checkoutButton" data-bs-toggle="modal" data-bs-target="#checkoutModal">Checkout</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for checkout confirmation -->
    <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="checkoutModalLabel">Confirm Checkout</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to checkout?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary" id="confirmCheckout">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start" id="menu">
        <div class="offcanvas-header">
            <div class="d-flex me-3 ms-3">
                <div class="navbar-brand d-flex">
                    <img src="Images/CompanyIcon.png" width="100" height="100" alt="Logo">
                    <h1 class="text-black ms-3 offcanvas-header">TechTonic</h1>
                    <button type="button" class="btn-close text-reset justify-content-end" data-bs-dismiss="offcanvas"></button>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>

        <div class="offcanvas-body">
            <div class="btn-group-vertical">
                <div class="dropdown first-dropdown">
                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                    Home
                    </button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="modalHome">Welcome</a></li>
                    <li><a class="dropdown-item" id="modalHomeAnnouncement">Announcement</a></li>
                    <li><a class="dropdown-item" id="modalHomeAbout">About us</a></li>
                    <li><a class="dropdown-item" id="modalHomeHistory">Our History</a></li>
                    <li><a class="dropdown-item" id="modalHomeCommitment">Our Commitment</a></li>
                    <li><a class="dropdown-item" id="modalHomeTeam">Our Team</a></li>
                    </ul>
                </div>
        
                <div class="dropdown second-dropdown mt-auto">
                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                    Product
                    </button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="modalProduct">Category</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" id="modalKeyboard">Keyboard</a></li>
                    <li><a class="dropdown-item" id="modalMouse">Mouse</a></li>
                    <li><a class="dropdown-item" id="modalSpeaker">Speaker</a></li>
                    </ul>
                </div>
        
                <button type="button" class="btn contact-button mt-autp">
                    <a class="dropdown-item" id="modalContact">Contact Us</a>
                </button>

            </div>
        </div>
    </div>

    <script src="link.js"></script>

</body>
</html>
