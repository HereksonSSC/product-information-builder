var variables = {
    'Paper': [{
        'inputName': 'Manufacturer',
        'inputType': 'selection',
        'selections': ['Papernet', 'Tork', 'vonDrehle'],
        'nameOrder' : 0,
        'inSpecTable': true,
        'tableOrder' : 20
    }, {
        'inputName': 'Product Family',
        'inputType': 'selection',
        'selections': ['enMotion Style', 'Advanced', 'I-Notch', 'Opticore Style', 'Star-Notch', 'Transend', 'Universal', 'Xpressnap', 'Y-Notch', 'HyTech Ocean', 'Confidence'],
        'nameOrder' : 1,
        'inSpecTable': true,
        'tableOrder' : 21
    }, {
        'inputName': 'Product Title',
        'inputType': 'text',
        'nameOrder' : 2,
        'inSpecTable': false
    }, {
        'inputName': 'Category',
        'inputType': 'selection',
        'selections': ['Dispenser', 'Facial', 'Hand', 'Towels', 'Napkins', 'Toilet', 'Paper', 'Wipers'],
        'nameOrder' : 3,
        'inSpecTable': false,
        'tableOrder' : 0
    }, {
        'inputName': 'Product Category',
        'inputType': 'selection',
        'selections': ['Center Pull', 'Multifold', 'Hardwound Roll', 'Toilet Paper', 'Facial Tissue', 'Napkin', 'Kitchen Roll', 'Singlefold', 'Windshield', 'Wiper'],
        'nameOrder' : 3,
        'inSpecTable': false,
        'tableOrder' : 0
    }, {
        'inputName': 'Modifier',
        'inputType': 'selection',
        'selections': ['Antimicrobial', 'Bio Tech', 'Coreless', 'Cube Box', 'Dinner', 'Dissolvetech', 'Double Layer', 'Dry Tech', 'Electronic', 'Feather Soft', 'Feather Soft HC', 'Flex Core', 'Heavenly Soft', 'Heavenly Soft Superior', 'Heavy Duty', 'High Capacity', 'Jumbo', 'Kraft', 'Low Lint', 'Mechanical', 'Mini - Compact', 'Mini-Jumbo', 'Precious', 'Premium', 'Preserve HC', 'Preserve Plus DRC', 'Quarter Fold', 'Rectangular Box', 'ShopMax', 'Single Jumbo', 'Single Mini Jumbo', 'Smart Core', 'Split Core', 'Standard', 'Triple Down Facing', 'Twin Down Facing', 'Twin Front Facing', 'Twin Jumbo', 'Twin Mini Jumbo', '10 Inch'],
        'nameOrder' : 4,
        'inSpecTable': false,
        'tableOrder' : 0
    }, {
        'inputName': 'Color',
        'inputType': 'selection',
        'selections': ['Black', 'Blue', 'Brown', 'Clear', 'Gray', 'Green', 'Matte Black', 'Matte White', 'Orange', 'Purple', 'Red', 'Smoke', 'White', 'Yellow'],
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Vendor MPN or SKU',
        'inputType': 'text',
        'nameOrder' : 5,
        'inSpecTable': true,
        'tableOrder' : 22
    }, {
        'inputName': 'Vendor UPC',
        'inputType': 'text',
        'inSpecTable': true,
        'tableOrder' : 23
    }, {
        'inputName': 'Sold By',
        'inputType': 'selection',
        'selections': ['Case', 'Each'],
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Individually Wrapped',
        'inputType': 'selection',
        'selections': ['Yes', 'No'],
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Plys',
        'inputType': 'selection',
        'selections': ['1-Ply', '2-Ply', '3-Ply', '4-ply'],
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Qty per Case',
        'inputType': 'number',
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Sheets per Roll',
        'inputType': 'number',
        'inSpecTable': true,
        'tableOrder' : 0
    }, {
        'inputName': 'Sheet Width (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true,
        'tableOrder' : 0
    }, {
        'inputName': 'Sheet Length (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true,
        'tableOrder' : 0
    }, {
        'inputName': 'Roll Length (ft)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true,
        'tableOrder' : 0
    }, {
        'inputName': 'Roll Diameter (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true,
        'tableOrder' : 0
    }, {
        'inputName': 'Core Diameter (in)',
        'inputType': 'number',
        'inSpecTable': true,
        'isMeasurement' : true,
        'tableOrder' : 0
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
    	console.debug(item);
        var inputDiv = document.createElement('div'); //create a div for the input field
        inputDiv.className = 'mb-3'; //add classed to the div
        inputOptionsContainer.appendChild(inputDiv); //add div to productspecifications
        var inputNiceName = item.inputName.replace(/\s+/g, '-').toLowerCase(); //create a string that can be used for IDs
        switch (item.inputType) {
            case 'number':
                var inputField = document.createElement('input');
                inputField.id = inputNiceName; //give the select element a unique ID
                inputField.className = 'inputfield form-control form-control-sm';
                inputField.type = 'number';
                inputField.placeholder = item.inputName;
                inputField.setAttribute('inputName', item.inputName);
                inputDiv.appendChild(inputField);
                break;
            case 'text':
                var inputField = document.createElement('input');
                inputField.id = inputNiceName; //give the select element a unique ID
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
                // placeholder.setAttribute('disabled', ''); //Disable first option
                inputField.add(placeholder);
                buildOptions(item.selections, inputNiceName);
                break;

        }
        inputField.setAttribute('nameOrder', item.nameOrder);
        inputField.setAttribute('inSpecTable', item.inSpecTable);
        inputField.setAttribute('tableOrder', item.tableOrder);
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
    var output = document.getElementById("output");
    var tableInputs = document.getElementById('productspecifications').getElementsByClassName('inputfield'); //get the input fields
    var tableInputsArray = Array.prototype.slice.call(tableInputs); //slice the inputs into individual HTMLelement blocks
    tableInputsArray.sort((a, b) => (a.getAttribute('tableorder') > b.getAttribute('tableorder') ) ? 1 : -1 ) //sort the items by tableOrder
    
    // Build information table
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

    // Build the Product Name
    var productName = document.createElement('h3');
    var productNameArray = [];
    tableInputsArray.sort((a, b) => (a.getAttribute('nameorder') > b.getAttribute('nameorder') ) ? 1 : -1 ) //sort the items by nameOrder
   
    tableInputsArray.forEach(function(item) {

    	var nameOrderAttribute = item.getAttribute('nameOrder');
    	if( nameOrderAttribute !== 'undefined' ){
    		productNameArray.push( item.value );
    		console.log(item.id + ' Name Order = ' + item.getAttribute('nameOrder'))
    	}

    });

    productName.textContent = (productNameArray.join(', ') );

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