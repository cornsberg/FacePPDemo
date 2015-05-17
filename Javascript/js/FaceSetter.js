// html info
function FaceSetter(imgContainerEL){
	//
	var _htmlLayout = [
			'<div class="face_info">',
				'<div class="face_box">',
					'<div class="face_border"></div>',
					'<div class="face_tip">',
						'<span class="gender"></span>',
						'<span class="age"></span>',
						'<div class="tip_arrow"></div>',
					'</div>',
				'</div>',
			'</div>'
		].join("");


	function _toSetFaceLayout(){
		var faceEL = $(_htmlLayout);
		imgContainerEL.find("img").before(faceEL);
		return faceEL;
	}

	function _toSetEachFaceInfo(index, faceObj, originalWidth, originalHeight){
		var faceContainerEL = _toSetFaceLayout();

		//some info such as gender and age
		var faceInfo = faceObj.attribute;
		faceContainerEL.find(".face_tip span").each(function(){
			var tipEL = $(this),
				tipKey = tipEL.attr("class");

			tipEL.html(faceInfo[tipKey].value);
		});

		// draw the face border
		var pos = faceObj.position,
			centerPos = pos.center; 

		/*Attention: the position of face data gotten cannot use directly!
		//for "x & y coordinates of the center point of the detected face rectangle, as 0-100% of photo width and height"
		// that is "Border-Width / Image-Width = Pos.x% "
		*/

		//width and height for the part of face
		var faceWidth = pos.width * originalWidth,
			faceHeight = pos.height * originalHeight;

		//calculate the position of the border
		var boxLeft = centerPos.x * originalWidth - faceWidth / 2.0,
			boxTop = centerPos.y * originalHeight - faceHeight / 2.0;

		faceContainerEL.find(".face_box").css({
			"left": boxLeft,
			"top": boxTop
		});

		faceContainerEL.find(".face_border").css({											
			"width": faceWidth,
			"height": faceHeight					
		});

		/*
		faceContainerEL.find(".key_point").each(function(){
			var pointEL = $(this),
				pointKey = pointEL.attr("id").replace("f_", "");

			var tmpPos = pos[pointKey];

			pointEL.css({
				"left": tmpPos.x * originalWidth - boxLeft,
				"top": tmpPos.y * originalHeight - boxTop
			});
		});
		*/
		faceContainerEL.find(".face_tip").addClass(index % 2 ? "bottom": "top");
		
	}

	// sort by x only
	function _facePosComparer(item1, item2){
		var x1 = item1.position.center.x,
			x2 = item2.position.center.x;

		if(x1 > x2)
			return 1;
		else if(x1 < x2)
			return -1;
		else 
			return 0;
	}


	this.setFaceInfo = function(imgInfoObj){
		//width and height of the image
		var originalWidth = imgInfoObj.img_width / 100.0,
			originalHeight = imgInfoObj.img_height / 100.0;

		var arrFace = imgInfoObj.face.sort(_facePosComparer);

		$.each(arrFace, function(index, item){
			_toSetEachFaceInfo(index, item, originalWidth, originalHeight);
		});
	}
}