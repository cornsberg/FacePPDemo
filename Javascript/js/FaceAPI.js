//Offical FaceAPI

//http://www.faceplusplus.com/first_javascript_app/
function FaceAPI(){
	var _apiURL = "https://apicn.faceplusplus.com/v2/",
		_apiKey = "7ef2f0af249e09b2e84937b67cc8d90b",
		_apiSecret = "D0iCGD_Z4GlwNIY6KtzmDf3Zo5cALkFR";

	var _faceAPI = new FacePP(
			_apiKey,
			_apiSecret,
			{
				apiURL: _apiURL
			}
		);


	this.getFaceObject = function(imgObj, callback){

		var dataToPass = {};
		if(imgObj.type == "url"){
			dataToPass.url = imgObj.data;
		}
		else{
			dataToPass.img = imgObj.data.fileData;
		}

		_faceAPI.request(
			"detection/detect",
			dataToPass,
			function(err, jsonResult){
				callback(jsonResult);
			}
		);
	}
}