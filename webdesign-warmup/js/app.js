/**
 * @fileOverview App.js produces the pause/play and stop buttons iteratively for videos
 * @author s824894@beuth, s825800@beuth 
 */
 
/**
 * @description Adds controls (pause/play and stop buttons) after window finished loading
 */
document.addEventListener("DOMContentLoaded", function(){
	// for(video in document.getElementsByTagName("video")){
	var videos= document.getElementsByTagName("video");
	for(var i= 0; i< videos.length; i++){

		/**
		 * @description Creates and pairs its control buttons to a video
         * @description furthermore this function remembers the video and links it to the right eventListener
		 * @param The video for which this function creates controls
		 */
		(function(video){
			var buttonDiv= document.createElement("div");
			buttonDiv.classList.add("buttons");
            /**
             * @description a template for buttons
             * @param classS the button's class
             * @param idS the button's id
             * @returns the button element
             * @example '<button class="playButtom" id="playBv1">'
             */
			var createButton= function(classS, idS) {
				var button= document.createElement("button");
				button.classList.add(classS);
				button.id += idS;
				return button;
			};
			var pausePlayButton= createButton("playButton", "playBv"+i);
			var stopButton= createButton("stopButton", "stopBv"+i);
			var vParent= video.parentNode;
			var playNPause= function () {
				if(video.paused){
					video.play();
					/**
					 * paused attribute for background-image control
					 */
					video.setAttribute("paused",false);
				}else{
					video.pause();
					video.setAttribute("paused", true);
				}
			};
			var stop= function () {
				video.setAttribute("paused", true);
				video.pause();
				video.currentTime= 0;
			};
			pausePlayButton.addEventListener("click", playNPause);
			stopButton.addEventListener("click", stop);
			buttonDiv.appendChild(pausePlayButton);
			buttonDiv.appendChild(stopButton);
			video.parentNode.appendChild(buttonDiv);
		})(videos[i]);
	}
});