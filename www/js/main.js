;(function($){

	'use strict';

	var form = $('#sign-up-form'),
		input = $('input');	

	function errorField(input){
		input.className = 'error-field';
		input.value = '';
		event.preventDefault();
	}		

	function formValidator(){
		var filledState,
			formInputs = $('#sign-up-form').children('input');

		for(var i = 0, length = formInputs.length; i < length; i++){
			var allInput = formInputs[i],
				value = allInput.value;
				
			if(!value){				
				errorField(allInput);
				allInput.placeholder = 'This field cannot be empty!';
				
			} else {
				filledState = true;
			}
		}
		
		if(filledState){
			phoneChecker();
		}		
	}

	function phoneChecker(){				
		var telValidateTrue,
			telValidateFalse = 0,
			formTel = $('input[type=tel]');

		for(var i = 0, pLength = formTel.length; i < pLength; i++){
			var input = formTel[i],
				value = input.value;

			if(value < '0' || value > '9'){				
				errorField(input);
				input.placeholder = 'Here should be number!';
				telValidateFalse += 1;
			} else if(value.length > 7){
				errorField(input);
				input.placeholder = 'Too many numbers!';
				telValidateFalse += 1;
			} 
		}	
		if(telValidateFalse){
			telValidateTrue = false;
			event.preventDefault();
		} else {
			emailChecker();
		}
	}

	function emailChecker(){
		var mailInput = $('input[name=email]'),
			dog = mailInput.val().indexOf('@'),
			dot = mailInput.val().indexOf('.');			

		if(dog < 1 || dot < 1){
			mailInput.addClass('error-field');
			mailInput.val('Here should be valid e-mail');	
			event.preventDefault();		
		} else {
			formSubmitionMessage();
		}			
	}

	function formSubmitionMessage(){
		$.ajax({
			url: 'files/success_message.txt',
			success: function(data){
				if(data){
					alert(data);				
				}	
				mailListAjaxRequest();
			}			
		});
	}
	
	function mailListAjaxRequest(){	
		$.ajax({
			url: 'files/existing_emails.json',
			success: function(data){									
				mailChecker(data);				
			}
		});
	}

	function mailChecker(existingMails){
		var mailInput = $('input[name = email]'),
			mailValue = mailInput.val();

		for(var i = 0, width = existingMails.length; i < width; i++){
			if(mailValue == existingMails[i]){
				alert('Email exist!');
				break;
			} else {
				alert('Greetings to a new customer!');
				break;
			}			
		}

		location.reload();
	}	

	form.on('submit', function(event){	
		formValidator();	
		event.preventDefault();			
	});

})(jQuery);

