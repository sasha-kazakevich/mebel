(function(){
	var time = 2000,
		i = 1,
		elem = document.getElementById("header");

	function changeBack (){
		var img = ["slider1.png","slider2.png","slider3.png","slider4.png"];

		if (i === img.length) i = 0;

		elem.style.backgroundImage = 'url("./img/'+ img[i] + '")';
		i++;
	}

	setInterval(changeBack,time);
})();

(function initMap() {
	var myMap,myPlacemark;
	ymaps.ready(init);

	function init(){
		myMap = new ymaps.Map("map", {
			center: [54.492567, 26.917414],
			zoom: 17
		});

		myMap.behaviors.disable('scrollZoom');

		myPlacemark = new ymaps.Placemark([54.492567, 26.917414], {
			hintContent: 'yuldenmebel',
			balloonContent: 'yuldenmebel'
		});

		myMap.geoObjects.add(myPlacemark);

	};

})();

(function(){
	lightgallery.init();
})();

(function(){
	var menu = document.getElementById("menu"),
		all = document.getElementsByClassName("all"),
		li = document.getElementsByClassName("li"),
		foot = document.getElementById('footer');

	menu.addEventListener("click", function(e){
		var data = e.target.getAttribute("data");

		for (var i = 0;i < all.length;i++){
			all[i].style.display = "none";
			li[i].classList.remove("active");
		}
		all[+data].style.display = "block";
		li[+data].classList.add("active");
		if(data == 0)
			foot.style.display = 'none'
		else
			foot.style.display = ''
	});
})();

(function(){
	var arr = document.getElementById("arrowUp")
	var current = null;
	var frames  = 25;
	var time    = 500;

	arr.addEventListener('click', function(){
		if(current) return;
		current = true;

		var distance  = window.scrollY,
    current_frame = 0,
    delta         = Math.ceil(distance / frames),
    my_timer;

		if(!distance) return;
		my_timer = setInterval(function () {
		    if (current_frame < frames) {
		      window.scrollTo(0, window.scrollY-delta)
		    } else {
	        clearInterval(my_timer);
					current = null;
		    }
		    current_frame++;
		}, Math.floor(time / frames));
	})

	window.addEventListener('scroll', function(){
		if(scrollY)
			arr.style.display = '';
		else
			arr.style.display = 'none';
	})
}());


(function(){
	var form = document.getElementById("contact-form");
	var rows = document.getElementsByClassName("form-row");
	var pic = document.getElementById("pic");
	form.addEventListener('submit', function(e){
		e.preventDefault();
		var name = e.target.elements.name;
		var phone = e.target.elements.number;
		var email = e.target.elements.email;
		var message = e.target.elements.message;
		for (var i = 0; i < rows.length; i++) {
			rows[i].classList.remove("error")
		}
		if (name.value.length < 2) {
			name.parentNode.classList.add("error")
			return
		}
		if (!/^\S+@\S+\.\S+/.test(email.value)) {
			email.parentNode.classList.add("error")
			return
		}
		if (phone.value.length < 2) {
			phone.parentNode.classList.add("error")
			return
		}
		if (message.value.length < 2) {
			message.parentNode.classList.add("error")
			return
		}
		$.ajax({
			type: "post",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
				"key": "vHCOU15BFAtptKf0b1ZzLQ",
				"message": {
					"from_email": email.value,
					"to": [
							{
								"email": "partyeverdayalltime@gmail.com",
								"type": "to"
							}
						],
					"autotext": "true",
					"subject": "Сообщение из формы обратной связи",
					"html": "Имя: "+name.value+",\nНомер телефона: "+phone.value+",\nСообщение: "+message.value
				}
			}
		})
		phone.value = "";
		name.value = "";
		email.value = "";
		message.value = "";
		pic.click();
	})
}());
