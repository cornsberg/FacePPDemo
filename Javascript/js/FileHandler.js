//get image file info by File Object
function FileHandler(){}
FileHandler.MonitorFile = function(fileEL, callback){
	var imageFile = fileEL.get(0);
	imageFile.onchange = function(evtObj){
		var files = imageFile.files;
		if(files.length > 0 && files[0] instanceof File){
			_readFile(files[0]);
		}
		return false;
	}

	function _readFile(imgFile){
		var fileReader = new FileReader();
		fileReader.onload = function(){
			if(fileReader.readyState == FileReader.DONE){
				_getFileBolb(imgFile, this.result, callback);
			}
		}
		fileReader.readAsDataURL(imgFile);
	}

	function _getFileBolb(imgFile, fileURL, callback){
		var fileReader_b = new FileReader();
		fileReader_b.onload = function(){
			if(fileReader_b.readyState == FileReader.DONE){
				callback(imgFile.name, fileURL, new Blob([this.result]));
			}
		}
		fileReader_b.readAsArrayBuffer(imgFile);
		//http://www.w3.org/TR/file-upload/#dfn-Blob
	}
}