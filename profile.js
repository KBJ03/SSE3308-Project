document.getElementById('editProfileButton').addEventListener('click', function() {
    // Show the modal when edit icon is clicked
    var modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
    modal.show();
});

$(document).ready(function() {
    // Handle form submission
    $('#editProfileForm').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        // Gather form data
        var formData = {
            username: $('#username').val(),
            memberId: $('#memberId').val(),
            gender: $('#gender').val(),
            birthday: $('#birthday').val(),
            phone: $('#phone').val(),
            email: $('#email').val()
            // Get other form field values similarly
        };

        // Perform AJAX request or update logic here
        console.log(formData); // For testing, log form data to console
        alert('Profile updated successfully!'); // Show success message

        // Close the modal after successful submission
        var modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();
    });
});