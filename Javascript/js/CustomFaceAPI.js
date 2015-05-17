/*
TODO: detecting faces from local file does not complete. I have no idea where the problem lies. 
	Form Data causes  CROS issue;
	Custom boundary data is helpless:IMAGE_ERROR_UNSUPPORTED_FORMAT
*/

//no use remote api by three-party
function CustomFaceAPI(){
	var _apiURL = "https://apicn.faceplusplus.com/v2/",
		_apiKey = "7ef2f0af249e09b2e84937b67cc8d90b",
		_apiSecret = "D0iCGD_Z4GlwNIY6KtzmDf3Zo5cALkFR";

	var _post = function(method, imgURL, callback){
		var targetURL = _apiURL + method;

		$.post(
				targetURL,
				{
					api_key: _apiKey,
					api_secret: _apiSecret,
					url: imgURL
				},
				function(jsonObj){
					callback && callback(jsonObj);
				},
				"json"
			)
	};

	var _postWidthImage = function(method, imgFile, callback){
		var targetURL = _apiURL + method;

		var xhr = new XMLHttpRequest();
		xhr.open("post", targetURL, true);
		xhr.onreadystatechange = function(){        	
        	if(this.readyState == 4){
        		var dataObj = {error_code: -1};
        		if(this.status == 200){
	        		try{
	        			dataObj = JSON.parse(this.responseText);
	        		}
	        		catch(err){
	        			//
	        		}
	        	}
	        	callback && callback(dataObj);
        	}        	
        }


		var f_fileInfo = imgFile.fileData;

		var data = {
				api_key: _apiKey,
				api_secret: _apiSecret
			};

		var crlf = "\r\n",
			bhash = "--";

		var boundary = "XX" + Math.floor(Math.random() * 100),
			tmpl_data = "\r\n--"+boundary+"\r\nContent-Disposition: form-data; name=\"{0}\"\r\n\r\n{1}",
			tmpl_fileData = "\r\n--"+boundary+"\r\nContent-Disposition: form-data; name=\"{0}\";filename=\"{2}\""
					+"\r\nContent-type: text/plain; \r\nContent-Transfer-Encoding:base64;\r\n\r\n{1}",
			data_detail = [];

		for(var item in data){
			data_detail.push(tmpl_data.format(item, data[item]));
		}

		
		data_detail.push(tmpl_fileData.format("img", f_fileInfo, imgFile.fileName));
		data_detail.push(imgFile.fileData);
		data_detail.push("\r\n--"+boundary+"--\r\n");

		data_detail = data_detail.join(""); 

        xhr.setRequestHeader("Content-Type", "multipart/form-data;boundary="+boundary);
        xhr.send(data_detail);

        /* // CROS not pass

        xhr.setRequestHeader("X-PINGOTHER", "pingpong");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-Type", "multipart/form-data;");

        var formData = new FormData();
        formData.append("api_key", _apiKey);
        formData.append("api_secret", _apiSecret);
        formData.append("img", f_fileInfo);
        xhr.send(formData);
        */
	}

	//method to invoke api
	this.getFaceObject = function(imgObj, callback){
		var detectMethod = "detection/detect";


		var fnToInvoke = null;

		if(imgObj.type == "url"){
			fnToInvoke = _post;
		}
		else{
			fnToInvoke = _postWidthImage;			
		}
		fnToInvoke(detectMethod, imgObj.data, callback);
	}

}

//Extension
String.prototype.format = function() 
{ 
    var args = arguments; 
    return this.replace(/\{(\d+)\}/g,               
        function(m,i){ 
            return args[i]; 
        }); 
}