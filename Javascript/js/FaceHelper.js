function FaceHelper(){}

FaceHelper.showImage = function(faceConfig){
	//init image
	var _init = function(){
		var imgInfo = faceConfig.data;
		if(faceConfig.type != "url"){
			imgInfo = imgInfo.fileURL;
		}
		$("#areaShowing img").attr("src", imgInfo);
	}

	//mask and loading

	//detect faces
	var _detect = function(){
		$(".f_detect").each(function(){
			var containerEL = $(this),
				imgData = faceConfig;

			//get faceInfo
			new FaceAPI().getFaceObject(imgData, function(faceResult){
				if(faceResult.error_code){
					alert("Fail to Load");
					return false;
				}

				new FaceSetter(containerEL).setFaceInfo(faceResult);
			});// end of API
		}); // end of each
	}

	_init();
	_detect();
}