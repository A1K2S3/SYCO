
// Declare Info as an Object
var Info = {};

// Fetch Data from LocalStorage
function getInfo(){
	if(localStorage.length == 0){
		Info = {
			Task : [],
		};
	}
	else{
		Info = JSON.parse(localStorage.getItem('Info'))
		console.log(Info)
	}
}

// Update Data in Local Storage
const putInfo = (Task) => {
	Info.Task.push(Task);
	localStorage.setItem('Info', JSON.stringify(Info));
}

// Display the Data in Card
const displayInfo = () => {
	id = 1;
	$('.row').empty();
	$('.alertHurray').empty();
	console.log(Info.Task.length);
	for(let i = 0; i < Info.Task.length; i++){
		if(Info.Task[i] != undefined){
			$('.row').append(`
				<div class=" col col-12 col-lg-3 col-md-4">
					<div class="card border-secondary mb-3 m-auto  shadow-sm" style="max-width: 18em;">
						<div class="card-body text-secondary bg-light rounded-lg">
							<p class="card-text">${Info.Task[i]}</p>
							<button class="btn btn-danger float-right" onclick="deleteThis(this, this.id)" id="${id}"><i class="far fa-trash-alt"></i></button>
						</div>
					</div>
				</div>
			`);
		}
		id++;
	}
	if($('.row').is(':empty')){
		$('.alertHurray').append(`
			<div class="alert alert-primary" role="alert">
				Hurray!! Nothing to do Today
			</div>
		`);
	}
}

// Main Function
const mainFunction = () => {
	let Task = $('#Task').val();
	getInfo();
	putInfo(Task);
	displayInfo();
	$('#Task').val("")
}
// Delete the Task
const deleteThis = (element, id) => {
	delete Info.Task[id-1];
	putInfo();
	displayInfo();
	element.closest(".col").remove();
	alertify.error("Task Deleted");
}
$('document').ready(function(){
	getInfo();
	displayInfo();
	$('#Task').keyup((e)=>{
		if(e.keyCode === 13){
			$('#submit').click();
		}		
	});
})