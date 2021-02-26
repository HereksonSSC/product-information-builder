var variables ={
	'Paper' : [
		{
			'inputName' : 'Manufacturer',
			'inputType' : 'selection',
			'selections' : ['this','that']
		},
		{
			'inputName' : 'Program/Model/Series',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Color',
			'inputType' : 'selection',
			'selections': ['white','yellow','black']
		},
		{
			'inputName' : 'Vendor MPN or SKU',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Vendor UPC',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Color',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Unit of Measurement',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Individually Wrapped',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Plys',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Qty per Case',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Sheets per Roll',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Sheet Width (in)',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Sheet Length (in)',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Roll Length (ft)',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Roll Diameter (in)',
			'inputType' : 'text',
		},
		{
			'inputName' : 'Core Diameter (in)',
			'inputType' : 'text',
		}
	]
};

function buildProductTypes(){
	function productTypes(){
		var array = [];
		Object.keys(variables).forEach(function(item){
			console.log(item);
			array.push(item);
		});
		return array;
	};
	var types = productTypes();
	buildOptions(types,"producttype")
}

function buildOptions(arrayname,selectid){
	var eid = selectid.toString();
	arrayname.forEach(function(item){
		var selectelement = document.getElementById(selectid);
		var option = document.createElement("option");
		option.text = item;
		option.setAttribute('inputName', item.inputName);

		selectelement.add(option); //add option to select element
	} 
	
)};

function buildInputOptions(selectedType){

	console.log("Changed to ", selectedType);
	inputOptionsContainer = document.getElementById("productspecifications");
	inputOptionsContainer.innerHTML = "";
	var ptype = variables[selectedType];
	ptype.forEach(function(item){
		var inputDiv = document.createElement('div'); //create a div for the input field
		inputDiv.className = 'mb-3'; //add classed to the div
		inputOptionsContainer.appendChild(inputDiv); //add div to productspecifications

		var inputNiceName = item.inputName.replace(/\s+/g, '-').toLowerCase(); //create a string that can be used for IDs

		switch(item.inputType){
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

				var placeholder = document.createElement('option');
				placeholder.text = '- Select ' + item.inputName + '  -'
				placeholder.setAttribute('selected', '');
				placeholder.setAttribute('disabled', '');
				inputField.add(placeholder);
				
				buildOptions(item.selections, inputNiceName);
				// item.selections.forEach(function(option){
				// 	var inputOption = document.createElement('option');
				// 	inputOption.innerHTML = option;
				// 	inputField.appendChild(inputOption); //add option to select field
				// 	inputField.setAttribute('inputName', item.inputName);
				// });
				break;
		}
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

function buildContent(){
	var outputHTML = [];
	var preview = document.getElementById('preview');
	var content = tinymce.get("content").getContent();
	var productName = document.createElement('h3');
	productName.innerHTML = document.getElementById('productName').value;

	var output = document.getElementById("output");

	var tableInputs = document.getElementById('productspecifications').getElementsByClassName('inputfield'); //get the input fields
	var arr = Array.prototype.slice.call( tableInputs ); //slice the inputs into individual HTMLelement blocks
	let table = document.createElement('table'); //create a table
	table.className = "table table-striped"; //give the table a classname
	
	
	arr.forEach(function(item){
		if(item.value != ''){
			let newRow = table.insertRow(-1);
			let cell0 = newRow.insertCell(0);
			let cell1 = newRow.insertCell(1);

			cell0.textContent = item.getAttribute('inputName');
			cell1.textContent = item.value;
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
document.addEventListener("DOMContentLoaded", function(){
	buildProductTypes()
});