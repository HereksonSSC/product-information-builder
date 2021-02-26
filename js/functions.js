var variables ={
	'Paper' : ['Color','Sheet Length','Sheet Width','Roll Diameter','Core Diameter'],
	'Dispenser' : ['Manufacturer', 'width', 'height', 'depth']
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
		var selectelement = document.getElementById(eid);
		var option = document.createElement("option");
		option.text = item;
		selectelement.add(option);
	} 
	
)};

function buildInputOptions(selectedType){

	console.log("Changed to ", selectedType);
	inputOptionsContainer = document.getElementById("productspecifications");
	inputOptionsContainer.innerHTML = "";
	var ptype = variables[selectedType];
	ptype.forEach(function(item){
		var inputDiv = document.createElement('div');
		inputDiv.className = 'mb-3';

		var inputOption = document.createElement('input');
		inputOption.id = item + '-field';
		inputOption.className = 'form-control form-control-lg';
		inputOption.type = 'text';
		inputOption.placeholder = item;
		inputOption.setAttribute('inputName', item);

		inputOptionsContainer.appendChild(inputDiv);
		inputDiv.appendChild(inputOption);


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

	var tableInputs = document.getElementById('productspecifications').getElementsByTagName('input');
	let table = document.createElement('table');
	table.className = "table table-striped";
	
	var arr = Array.prototype.slice.call( tableInputs );
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