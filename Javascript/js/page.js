$(function(){
	var faceDataToPass = {},
		imgFileData = {};

	var areaSettingEL = $("#areaSetting"),
		areaDetectingEL = $("#areaShowing");

	FileHandler.MonitorFile($("#fileFaceImage"), function(fileName, fileURL, fileData){
		imgFileData = { fileName: fileName, fileURL: fileURL, fileData: fileData};
	});

	$(":radio[name=sorceType]").change(function(evtObj){
		faceDataToPass.type = $(this).data("stype");
		$("#txtFaceURL, #fileFaceImage").val("").toggle();
		imgFileData = {};
		evtObj.preventDefault();
	});

	$("#btnSubmitSetting").click(function(evtObj){
		var faceType = faceDataToPass.type;
		if(!faceType){
			faceDataToPass.type = faceType = "url";
		}

		var faceData = faceType == "url" ? $.trim($("#txtFaceURL").val()) : imgFileData;
		if(!faceData){
			alert("Face Data is Required!");
			return false;
		}

		faceDataToPass.data = faceData;

		areaSettingEL.removeClass("actived");
		areaDetectingEL.addClass("actived");

		FaceHelper.showImage(faceDataToPass);

		evtObj.preventDefault();
		return false;
	});

	$("#lnkBackToSetting").click(function(evtObj){
		areaSettingEL.addClass("actived");
		areaDetectingEL.removeClass("actived");

		$("#fmFace")[0].reset();
		faceDataToPass = {};
		imgFileData = null;
		$("#txtFaceURL").show(); 
		$("#fileFaceImage").hide();

		$(this).closest(".area").find(".face_info").remove();

		evtObj.preventDefault();
		return false;
	});

	var _imgURL = "http://www.faceplusplus.com/wp-content/uploads/2013/11/home-banner-3.jpg";
	//"http://www.faceplusplus.com.cn/wp-content/uploads/2013/11/home-banner-1.jpg";
	//"http://how-old.net/Images/faces2/main006.jpg";			
	//"http://how-old.net/Images/faces2/main007.jpg";
	//"http://www.faceplusplus.com.cn/static/resources/python_demo/1.jpg";

});	