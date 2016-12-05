pwd.addEventListener("submit", generate);
pwd["output"].addEventListener("click", copy);

function generate(e) {
	e.preventDefault();

	var options = {
		counter: 1,
		length: 16,
		lowercase: true,
		uppercase: true,
		numbers: true,
		// symbols: false,
		template: 'vcVCns'
	};

	LessPass.encryptLogin(pwd["username"].value, pwd["master"].value)
	.then(function(response) {
		LessPass.renderPassword(
			response,
			pwd["service"].value.toLowerCase().replace(/\s/g, ''),
			options
		)
		.then(function(output) {
			pwd["output"].innerHTML = output;
		});

		copy.call(pwd["output"], e);
	});
}

function copy(e) {
	this.select();
	if(document.execCommand("copy")) {
		document.body.classList.add("coppied");

		setTimeout(function() {
			document.body.classList.remove("coppied");
		}, 1000);
	}
}