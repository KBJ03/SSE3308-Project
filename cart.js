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