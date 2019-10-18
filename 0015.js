;(function(window, $, undefined){

	/*
	*	SocialShare
	*/
	var SocialShare = function(opt){
		$.extend(this, opt);

		this.initialize();
	};

	SocialShare.prototype.initialize = function(){
		this.events();
	};

	SocialShare.prototype.ajaxUrl  = socialShareAjaxUrl;
	SocialShare.prototype.mailData = '';
	SocialShare.prototype.mailSpan = '';

	/*
	* Attach click events to buttons
	*/
	SocialShare.prototype.events = function(){
		var btns      = this.btns;
		var mailForm  = this.mailForm;
		var closeForm = this.mailClose;

		for (var btn in btns) {
			if (btns.hasOwnProperty(btn)) {
				btns[btn].on('click', this.popup);
			}
		}

		//  Email form submit:
		$("body").on('submit', '.form-share-via-email', this.sendMail);
		$("body").on('click', closeForm.selector, this.closeMailForm);

	};

	/*
	* Render url for sharing
	*/
	SocialShare.prototype.renderUrl = function(details){
		var templates = {
			google:    'https://plus.google.com/share?url={{url}}',
			facebook:  'http://www.facebook.com/sharer.php?s=100&p[title]={{title}}&p[url]={{url}}&p[images][0]={{img}}',
			pinterest: 'http://pinterest.com/pin/create/bookmarklet/?media={{img}}&url={{url}}&is_video=false&description={{title}}',
			twitter:   'http://twitter.com/share?text={{title}}&url={{url}}',
			linkedin:  'https://www.linkedin.com/cws/share?url={{url}}',
			email:     ''
		};
		var url = templates[details.netname];

		for (var item in details){
			if (details.hasOwnProperty(item)){
				url = url.replace('{{'+item+'}}', details[item]);
			}
		}

		return url;
	}

	/*
	* Get data-attributes from link
	*/
	SocialShare.prototype.linkData = function(link){
		var details = {
			netname:    $(link).data('netname'),
			objecttype: $(link).data('objecttype'),
			id:         $(link).data('id'),
			url:        $(link).data('uri'),
			title:      $(link).data('title'),
			img:        $(link).data('thumbnail')
		};

		return details;
	}

	/*
	* Open pop-up window
	*/
	SocialShare.prototype.popup = function(e){
		var countSpan = $('.nfm-share-count', this);
		var details   = SocialShare.prototype.linkData(this);
		var url       = SocialShare.prototype.renderUrl(details);

		if(details.netname == 'email'){
			SocialShare.prototype.mailform(details, countSpan);
		} else {
			var socialWindow = window.open(url,'','toolbar=0,status=0,width=626,height=436');
			SocialShare.prototype.request(socialWindow, details, countSpan);
		}

		e.preventDefault();
	};

	/*
	* Email form
	*/
	SocialShare.prototype.mailform = function(details, countSpan){

		SocialShare.prototype.mailData = details;
		SocialShare.prototype.mailSpan = countSpan;

		details.action = 'tpl';

		jQuery.ajax({
			url:	  SocialShare.prototype.ajaxUrl,
			type:	  'POST',
			dataType: 'JSON',
			data:	  details,
			success:  function(response){
				jQuery('body').prepend(response);
			},
			error:    function(response){
				console.log('Sorry, an error occured');				
			}
		});
	}

	/*
	* Get email form data
	*/
	SocialShare.prototype.getFormData = function(details, form){
		details.action =  'send';
		details.from =    jQuery("#email_from", form).val();
		details.to =      jQuery("#email_to", form).val();
		details.message = jQuery("#email_message", form).val();

		return details;
	}

	/*
	* Close email form
	*/
	SocialShare.prototype.closeMailForm = function(e){
		e.preventDefault();
		e.stopPropagation();

		jQuery('.share-via-email').fadeOut("slow", function(){
			jQuery('.share-via-email').remove();
		});
	}

	/*
	* Send email
	*/
	SocialShare.prototype.sendMail = function(e){

		var details   = SocialShare.prototype.getFormData(SocialShare.prototype.mailData, this);
		var countSpan = SocialShare.prototype.mailSpan;

		jQuery.ajax({
			url:	  SocialShare.prototype.ajaxUrl,
			type:	  'POST',
			dataType: 'JSON',
			data:	  details,
			success: function(response){
				countSpan.text(response.count);
			},
			error: function(response){
				console.log('Sorry, an error occured');
			}
		});

		return false;
	}

	/*
	* Ajax
	*/
	SocialShare.prototype.request = function(socialWindow, details, countSpan){
		details.action = 'like';
		
		var timer = setInterval(function() {
		if(socialWindow.closed) {
				clearInterval(timer);
				$.ajax( {
					url:	  SocialShare.prototype.ajaxUrl,
					type:	  'POST',
					dataType: 'JSON',
					data:	  details,
					success:  function(response) {
						countSpan.text(response.count);
					},
					error:    function(response){
						console.log('Sorry, an error occured');				
					}
				});
			}
		}, 1000);

	};

	/*
	*	Document ready event
	*/
	$(function(){		
		new SocialShare({
			btns: {
				facebook:  $('.nfm-facebook-share'),
				twitter:   $('.nfm-twitter-share'),
				pinterest: $('.nfm-pinterest-share'),
				google:    $('.nfm-google-share'),
				linkedin:  $('.nfm-linkedin-share'),
				email:     $('.nfm-email-share')
			},
			mailForm:  $('#social-share-email-form'),
			mailClose: $('.share-via-email-close')
		});
	});

})(window, jQuery);
