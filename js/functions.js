var variables = {
    'Universal Attributes' : [
        {
            'inputName': 'MPN',
            'inputType': 'text',
            'inSpecTable': true,
            'tableOrder' : 20
        }, {
            'inputName': 'Manufacturer',
            'inputType': 'selection',
            'selections': ['3M','Ammex','Anderson Chemical','Berry Global','Betco','Clarke','Colgate-Palmolive','Ekcos','Fresh Products','Golden Star','Hillyard','Hospeco','Kutol','M + A Matting','Natur-Tec','Papernet','ProTeam','Procter and Gamble','Rubbermaid','SSC','Salt Depot','Sandia','Scensible Source','Sofidel America','Square Scrub','Tennant','Tork','Unger','Unisan','Windsor-Karcher','ZEHN-X','vonDrehle'],
            'nameOrder' : 0,
            'inSpecTable': true,
            'tableOrder' : 20
        }, {
            'inputName': 'Program',
            'inputType': 'selection',
            'selections': ['Universal','Confidence','Transcend','Tork I-Notch','Tork Star-Notch','Flex Core','Enmotion 10 In'],
            'ignoreselections' : ['Universal'],
            'nameOrder' : 1,
            'inSpecTable': true,
            'tableOrder' : 21
        }, {
            'inputName': 'Status',
            'inputType': 'selection',
            'selections': ['NEW','DC'],
            'nameOrder' : 100,
            'inSpecTable': true,
            'tableOrder' : 21
        }
    ],
    'Grouped Attributes' : {
        'Paper': [
            {
                'inputName': 'Product Name',
                'inputType': 'selection',
                'selections': ['Center Pull Towels','Multifold Towels','Hardwound Roll Towels','Toilet Paper','Facial Tissue','Napkin','Kitchen Roll Towels','Singlefold Towels','Windshield Towels','Wipers','Toilet Seat Covers'],
                'nameOrder' : 2,
                'inSpecTable': false
            }, {
                'inputName': 'Product Model',
                'inputType': 'selection',
                'selections': ['Advanced','Baseline','Bio Tech','Dissolve Tech','Double Layer','Dry Tech','Elegance','Feathersoft','Feathersoft HC','Heavenly Soft','Heavenly Soft Special','Heavenly Soft Standard','Heavenly Soft Superior','HyTech Ocean','Kraft','Precious','Preserve','Preserve','Preserve HC','Preserve Plus','SmartCore','SmartCore Premium','Xpressnap','Health Gards','Discreet Seat'],
                'nameOrder' : 2,
                'inSpecTable': false
            },{
                'inputName': 'Modifier',
                'inputType': 'selection',
                'selections': ['10 Inch','1000 ft','1145 ft','1150 ft','2000 ft','223 Sheets','250 Sheets','320 ft','350 ft','400 ft','400 Sheets','420 ft','450 Sheets','475 ft','500 Sheets','600 ft','600 Sheets','700 ft','750 ft','800 ft','800 ft','85  Sheets','850 ft','900 Sheets','Rectangular Box'],
                'nameOrder' : 4,
                'inSpecTable': false,
                'tableOrder' : 0
            }, {
                'inputName': 'Color',
                'inputType': 'selection',
                'selections': ['White','Brown','Blue','Black','Yellow'],
                'nameOrder' : 5,
                'inSpecTable': true,
                'tableOrder' : 0
            }
        ],
        'Dispensers' : []
    }

};

function buildProductTypes() {
    function productTypes() {
        var array = [];
        Object.keys(variables["Grouped Attributes"]).forEach(function(item) {
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
    //Build an array with Universal Atributes
    var ptype = variables["Universal Attributes"];
    //Add the attributes from the selected product type to the array
    ptype = ptype.concat(variables["Grouped Attributes"][selectedType]);
    //Sort the array based on nameOrder
    ptype.sort(function(a, b){return a.nameOrder - b.nameOrder});
    console.log(ptype);
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
    //Grab the current product type selected
    selectedType = document.getElementById('producttype').value;
    //Get Global attributes
    var attributesArray = variables["Universal Attributes"];
    //Add attributes related to the selected type
    attributesArray = attributesArray.concat(variables["Grouped Attributes"][selectedType]);

    var outputHTML = [];
    var preview = document.getElementById('preview');
    //var content = tinymce.get("content").getContent();
    var output = document.getElementById("output");
    var formInputs = document.getElementById('productspecifications').getElementsByClassName('inputfield'); //get the input fields
    var formInputsArray = Array.prototype.slice.call(formInputs); //slice the inputs into individual HTMLelement blocks

    // Build the Product Name
    var productName = document.createElement('h5');
    var productNameArray = [];
    formInputsArray.forEach(function(item) {
        //Get the name of the current item
        var inputName = item.getAttribute('inputname');
        //Find the coresponding item in the array 
        var itemObject = attributesArray.find(o => o.inputName === inputName);

        if( item.value !== '' && itemObject.nameOrder !== 'undefined'){
            //if there are things to ignore
            if( itemObject.ignoreselections ){
                //and the value is NOT the one to ignore
                if(!itemObject.ignoreselections.includes(item.value)){
                    productNameArray.push( item.value );
                }else{
                    console.log(item.value, " is ignored");
                }
            }else{
                productNameArray.push( item.value );
            }
        }
    });
    console.log(productNameArray.length);
    productName.textContent = (productNameArray.join(', ') );

    // Build information table
    /*
    formInputsArray.sort((a, b) => (a.getAttribute('tableorder') > b.getAttribute('tableorder') ) ? 1 : -1 ) //sort the items by tableOrder
    let table = document.createElement('table'); //create a table
    table.className = "table table-striped"; //give the table a classname
    formInputsArray.forEach(function(item) {
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
    */

    

    outputHTML.push(productName.outerHTML);
    //outputHTML.push(content);
    //outputHTML.push('<h5><strong>Product Specifications</strong></h5>');
    //outputHTML.push(table.outerHTML);
    //output.innerHTML = outputHTML.join('');
    preview.innerHTML = outputHTML.join('');
    //document.getElementById('codecopy').disabled = false;
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