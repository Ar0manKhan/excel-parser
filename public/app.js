const sheet = document.getElementById('sheet');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form');

const handleSelection = () => {
	// Getting elemen where to place filename
	const fileNameElement = document.getElementById('filename');
	// Writing filename
	fileNameElement.textContent = sheet.value.replace(/^.*\\/, "");
	// displaying element which contain file name
	fileNameElement.classList.remove('d-none');
	// displaying submit button
	submitBtn.classList.remove('d-none');
}

const handleResponse = response => {
	console.log(response);
}

const handleError = err => {
	console.error(err);
}

const uploadFile = async (file) => {
	let formData = new FormData();
	formData.append('file', file);

	try {
		let response = await fetch('/upload', { method: 'POST', body: formData });
		handleResponse(response);
	} catch (e) {
		handleError(e);
	}

}


sheet.addEventListener('change', handleSelection);
submitBtn.addEventListener('click', () => uploadFile(sheet.files[0]));