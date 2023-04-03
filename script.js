// JS Code here...

let btnSubmit = document.getElementById("btn-submit");
if (localStorage.getItem('tasks') !== null){
	renderData();
}




btnSubmit.addEventListener("click", function(e){
	e.preventDefault()
	let today = new Date();
	today = today.toDateString();
	let id = setId();
	let product = document.getElementById("product").value;
	let price = parseInt(document.getElementById("price").value);
	let iva = document.getElementById("iva").value;
	if (product === "" || price === "") {
		alert("Product and price box must not be empty");
	}else{
		if (iva === "" || iva === NaN) {
			iva = 21;
		}else{
			parseInt(iva);
			iva = iva
		}
		let total = (price + ((price * iva)/100));
		let fullProduct = {
			id:id,
			product: document.getElementById("product").value,
			price: document.getElementById("price").value,
			iva:iva,
			total: total,
			date:today
		}
		saveData(fullProduct);
		renderData();
		deleteItem();
		document.getElementById("product-form").reset();
	}
});

const setId = () => {
	let id = Math.floor(Math.random() * (999 - 1) + 1);
	return id;
}

function saveData(fullProduct){
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.push(fullProduct);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderData(){
	const tableBody = document.querySelector(".body-table");
	tableBody.innerHTML = "";
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	const headers = `<thead>
          <tr>
            <th class="form-header" >ID</th>
            <th class="form-header" >Product</th>
            <th class="form-header" >Price</th>
            <th class="form-header" >IVA</th>
            <th class="form-header" >Total</th>
            <th class="form-header" >Date</th>
            <th class="form-header" >Delete</th>
          </tr>
        </thead>`
  document.querySelector(".body-table").insertAdjacentHTML('beforeend', headers);
	tasks.forEach(task => {
		const row = `<tr class ="row" id="${task.id}">
			<td class="td" >${task.id}</td>
			<td class="td">${task.product}</td>
			<td class="td">$${task.price}</td>
			<td class="td">${task.iva}%</td>
			<td class="td">$${task.total}</td>
			<td class="td">${task.date}</td>
			<td class="td" ><button class="btn-delete" >DELETE</button></td>
		</tr>`
		document.querySelector(".body-table").insertAdjacentHTML('beforeend', row);
	});
}

deleteItem();

function deleteItem(){
		let buttons = document.querySelectorAll(".btn-delete");
		for(let i=0; i < buttons.length; i++){
			buttons[i].addEventListener("click", function(e){
				console.log("funciona");
				let tasks = JSON.parse(localStorage.getItem('tasks'));
				//console.log(tasks[i]);
				//console.log(tasks.indexOf(tasks[i]));
				tasks = tasks.filter(x => x != tasks[i]);
				deleteItem(tasks)
				
				localStorage.clear();
				localStorage.setItem('tasks', JSON.stringify(tasks));
				renderData();
				console.log(tasks);
				deleteItem();
			});
		}

}



	/*Falta que se borre el correcto, que se guarde el nuevo array y que se actualice en tiempo real*/
