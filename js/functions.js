var variables = {
    'Paper': [{
        'inputName': 'Manufacturer',
        'inputType': 'selection',
        'selections': ['Papernet', 'Tork', 'vonDrehle'],
        'inSpecTable': true
    }, {
        'inputName': 'Category',
        'inputType': 'selection',
        'selections': ['Dispenser', 'Facial', 'Hand', 'Towels', 'Napkins', 'Toilet', 'Paper', 'Wipers'],
        'inSpecTable': false
    }, {
        'inputName': 'Brand/Model',
        'inputType': 'selection',
        'selections': ['enMotion Style', 'Advanced', 'I-Notch', 'Opticore Style', 'Star-Notch', 'Transend', 'Universal', 'Xpressnap', 'Y-Notch', 'HyTech Ocean', 'Confidence'],
        'inSpecTable': true
    }, {
        'inputName': 'Product Name',
        'inputType': 'selection',
        'selections': ['Center Pull', 'Multifold', 'Hardwound Roll', 'Toilet Paper', 'Facial Tissue', 'Napkin', 'Kitchen Roll', 'Singlefold', 'Windshield', 'Wiper'],
        'inSpecTable': false
    }, {
        'inputName': 'Modifier',
        'inputType': 'selection',
        'selections': ['Antimicrobial', 'Bio Tech', 'Coreless', 'Cube Box', 'Dinner', 'Dissolvetech', 'Double Layer', 'Dry Tech', 'Electronic', 'Feather Soft', 'Feather Soft HC', 'Flex Core', 'Heavenly Soft', 'Heavenly Soft Superior', 'Heavy Duty', 'High Capacity', 'Jumbo', 'Kraft', 'Low Lint', 'Mechanical', 'Mini - Compact', 'Mini-Jumbo', 'Precious', 'Premium', 'Preserve HC', 'Preserve Plus DRC', 'Quarter Fold', 'Rectangular Box', 'ShopMax', 'Single Jumbo', 'Single Mini Jumbo', 'Smart Core', 'Split Core', 'Standard', 'Triple Down Facing', 'Twin Down Facing', 'Twin Front Facing', 'Twin Jumbo', 'Twin Mini Jumbo', '10 Inch'],
        'inSpecTable': false
    }, {
        'inputName': 'Color',
        'inputType': 'selection',
        'selections': ['Black', 'Blue', 'Brown', 'Clear', 'Gray', 'Green', 'Matte Black', 'Matte White', 'Orange', 'Purple', 'Red', 'Smoke', 'White', 'Yellow'],
        'inSpecTable': true
    }, {
        'inputName': 'Vendor MPN or SKU',
        'inputType': 'text',
        'inSpecTable': true
    }, {
        'inputName': 'Vendor UPC',
        'inputType': 'text',
        'inSpecTable': true
    }, {
        'inputName': 'Unit of Measurement',
        'inputType': 'selection',
        'selections': ['Case', 'Each'],
        'inSpecTable': true
    }, {
        'inputName': 'Individually Wrapped',
        'inputType': 'selection',
        'selections': ['Yes', 'No'],
        'inSpecTable': true
    }, {
        'inputName': 'Plys',
        'inputType': 'selection',
        'selections': ['1-Ply', '2-Ply', '3-Ply', '4-ply'],
        'inSpecTable': true
    }, {
        'inputName': 'Qty per Case',
        'inputType': 'number',
        'inSpecTable': true
    }, {
        'inputName': 'Sheets per Roll',
        'inputType': 'number',
        'inSpecTable': true
    }, {
        'inputName': 'Sheet Width (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true
    }, {
        'inputName': 'Sheet Length (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true
    }, {
        'inputName': 'Roll Length (ft)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true
    }, {
        'inputName': 'Roll Diameter (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true
    }, {
        'inputName': 'Core Diameter (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true
    }]
};

function buildProductTypes() {
    function productTypes() {
        var array = [];
        Object.keys(variables).forEach(function(item) {
            console.log(item);
            array.push(item);
        });
        return array;
    };
    var types = productTypes();
    buildOptions(types, "producttype")
}

function buildOptions(arrayname, selectid) {
    var eid = selectid.toString();
    arrayname.forEach(function(item) {
        var selectelement = document.getElementById(selectid);
        var option = document.createElement("option");
        option.text = item;
        option.setAttribute('inputName', item.inputName);
        selectelement.add(option); //add option to select element
    })
};

function buildInputOptions(selectedType) {
    console.log("Changed to ", selectedType);
    inputOptionsContainer = document.getElementById("productspecifications");
    inputOptionsContainer.innerHTML = "";
    var ptype = variables[selectedType];
    ptype.forEach(function(item) {
        var inputDiv = document.createElement('div'); //create a div for the input field
        inputDiv.className = 'mb-3'; //add classed to the div
        inputOptionsContainer.appendChild(inputDiv); //add div to productspecifications
        var inputNiceName = item.inputName.replace(/\s+/g, '-').toLowerCase(); //create a string that can be used for IDs
        switch (item.inputType) {
            case 'number':
                var inputField = document.createElement('input');
                inputField.id = inputNiceName; //give the input element a unique ID
                inputField.className = 'inputfield form-control form-control-sm';
                inputField.type = 'number';
                inputField.placeholder = item.inputName;
                inputField.setAttribute('inputName', item.inputName);
                inputDiv.appendChild(inputField);
                break;
            case 'text':
                var inputField = document.createElement('input');
                inputField.id = inputNiceName; //give the input element a unique ID
                inputField.className = 'inputfield form-control form-control-sm';
                inputField.type = 'text';
                inputField.placeholder = item.inputName;
                inputField.setAttribute('inputName', item.inputName);
                inputDiv.appendChild(inputField);
                break;
            case 'selection':
                var inputField = document.createElement('select');
                inputField.id = inputNiceName; //give the select element a unique ID
                inputField.className = 'inputfield form-select form-select-sm';
                inputField.placeholder = item.inputName;
                inputField.setAttribute('inputName', item.inputName); //add inputName to the select field
                inputDiv.appendChild(inputField); //add select field to div
                var placeholder = document.createElement('option'); //create placeholder option with the value of null
                placeholder.text = '- Select ' + item.inputName + '  -';
                placeholder.value = '';
                placeholder.setAttribute('selected', '');
                placeholder.setAttribute('disabled', '');
                inputField.add(placeholder);
                buildOptions(item.selections, inputNiceName);
                break;

        }
        inputField.setAttribute('inSpecTable', item.inSpecTable);
    });
}

function copyToClip(str) {
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
};

function buildContent() {
    var outputHTML = [];
    var preview = document.getElementById('preview');
    var content = tinymce.get("content").getContent();
    var productName = document.createElement('h3');
    productName.innerHTML = document.getElementById('productName').value;
    var output = document.getElementById("output");
    var tableInputs = document.getElementById('productspecifications').getElementsByClassName('inputfield'); //get the input fields
    var tableInputsArray = Array.prototype.slice.call(tableInputs); //slice the inputs into individual HTMLelement blocks
    let table = document.createElement('table'); //create a table
    table.className = "table table-striped"; //give the table a classname
    tableInputsArray.forEach(function(item) {
        if (item.value !== '' && item.getAttribute('inspectable') === 'true') {
        	//console.log(item.id + ' ' + item.getAttribute('inspectable') + ' passed');
            let newRow = table.insertRow(-1);
            let cell0 = newRow.insertCell(0);
            let cell1 = newRow.insertCell(1);
            cell0.textContent = item.getAttribute('inputName');
            cell1.textContent = item.value;
        }else{
        	//console.log(item.id + ' failed');
        }
    });
    outputHTML.push(productName.outerHTML);
    outputHTML.push(content);
    outputHTML.push('<h5><strong>Product Specifications</strong></h5>');
    outputHTML.push(table.outerHTML);
    output.innerHTML = outputHTML.join('');
    preview.innerHTML = outputHTML.join('');
    document.getElementById('codecopy').disabled = false;
}
tinymce.init({
    selector: 'textarea',
    menubar: false,
    plugins: 'lists, paste',
    toolbar: 'undo redo | paste | bold italic underline | link image | numlist bullist',
    toolbar_mode: 'floating',
    height: 300,
    paste_as_text: true
});
document.addEventListener("DOMContentLoaded", function() {
    buildProductTypes()
});