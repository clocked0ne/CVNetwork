var historyCount = 1,
	submitCV = null,
	entries = {};
	entries.isLooking = 'false';
	entries.phone = null;
	entries.address = null;
	entries.email = null;
	entries.jobtitle = null;
	entries.summary = null;
	entries.history1 = null;
	entries.history2 = null;
	entries.history3 = null;
	entries.history4 = null;
$(function() {
	$('.ui.left.sidebar').sidebar('setting', 'transition', 'uncover').sidebar('attach events', '.toc.item');
	$.get('/groups', function (data){
		$.each(data.content, function (index, item){
			$('select.dropdown').append('<option value="' + item.groupId + '">' + item.name + '</option>');
		});
		$('select.dropdown').dropdown();
	});
	$('.ui.checkbox').checkbox({
		onChecked: function () {
			entries.isLooking = 'true';
		},
		onUnchecked: function () {
			entries.isLooking = 'false';
		}
	});
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
		replace(/<[\/\!]*?[^<>]*?>/gi, '').
		replace(/<style[^>]*?>.*?<\/style>/gi, '').
		replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
		return output;
	};
	$('#main')
		.on('click', '.edit', function (){
			var $item = $(this),
				type = $item.data('type'),
				text = $item.children('.userContent').text().trim(),
				trimmedContent = !text.match(/unknown/gi) ? text : '',
				$input = $('<input />', {
					'type': 'text',
					'name': type + '-new',
					'class': 'editInput',
					'value': trimmedContent
				});
			if (!$item.children('input').length){
				$item.append($input);
				$input.focus();
				$item.children('.userContent').hide();
			}
		})
		.on('change', '.editInput', function (e){
			e.stopImmediatePropagation();
			var $input = $(this),
				type = $input.attr('name').split('-')[0],
				sanitisedInput = $.sanitize($input.val().trim());
			if (sanitisedInput!=''){
				submitCV = submitCV || { cvDataDetailList: [], jobHistory: [] };
				if(type=='name') {
					submitCV['firstname'] = sanitisedInput.split(' ')[0];
					submitCV['lastname'] = sanitisedInput.split(' ')[1];
				} else if (!isNaN(Number(type.slice(-1)))){
					var position = 'history' + type.slice(-1);
					var field = type.split('_')[1].slice(0, -1);
					entries[position] = entries[position] || {};
					entries[position].detail = 'WORKHISTORY';
					entries[position].permission = 2;
					entries[position]['value'] = entries[position]['value'] || [{}];
		//			console.dir(entries[position]['value']);
		//			console.dir(entries[position]['value'][0]);
					entries[position]['value'][0][field] = sanitisedInput;

		//			"value": [{
		//				"date": "05/09/1989",
		//				"title": "hello perfect"
		//			}],

				} else {
					entries[type] = {
						detail: type.toUpperCase(),
						value: sanitisedInput,
						permission: type=='phone' ? 3 : 1
					}
				}
				$input.siblings('.userContent').text(sanitisedInput);
			}
		})
		.on('focusout', '.editInput', function (e) {
			e.stopImmediatePropagation();
			var $input = $(this);
			$input.siblings('.userContent').show();
			$input.remove();
		})
		.on('click', '.editSummary', function (){
			var $item = $(this),
				type = $item.data('type'),
				text = $item.children('.userContent').text().trim(),
				trimmedContent = !text.match(/unknown/gi) ? text : '',
				$input = $('<textarea />', {
					'type': 'text',
					'rows': '3',
					'name': type + '-new',
					'class': 'editInput'
				});
			$input.val(trimmedContent);
			if (!$item.children('input').length){
				$item.append($input);
				$input.focus();
				$item.children('.userContent').hide();
			}
		})
		.on('change', '.editSummary', function (e){
			e.stopImmediatePropagation();
			var $note = $(this),
				sanitisedNotes = $.sanitize($note.val().trim());
			if (sanitisedNotes!='' || sanitisedNotes!='Notes'){
				submitCV = submitCV || { cvDataDetailList: [], jobHistory: [] };
				entries.summary = {
					detail: type.toUpperCase(),
					value: sanitisedNotes,
					permission: 1
				};
			}
		})
		.on('click', '.addHistory', function (e){
			if (historyCount < 4){
				historyCount++;
				$('<div class="event"><div class="content"><div class="summary"><span class="edit" data-type="previous_title' + historyCount
					+ '"><span class="userContent">Previous Job title</span></span><div class="date edit" data-type="previous_date' + historyCount
					+ '"><span class="userContent">November 2015</span></div></div><div class="extra text editSummary" data-type="previous_summary' + historyCount
					+ '"><span class="userContent">Job Summary</span></div></div></div>')
					.appendTo('.feed');
				if (historyCount === 4)
					$('.addHistory').remove();
			}
		})
		.on('click', '.addCV', function (e){
			e.preventDefault();
			if (!submitCV
				|| !submitCV.firstname
				|| submitCV.firstname==''){
				$.toast('You must enter your name', 4000, 'rounded');
				return false;
			}

			submitCV.cvDataDetailList.push({
				"detail": 'ISLOOKING',
				"value": entries['isLooking'],
				"permission": 1
			});
			if (entries.phone)
				submitCV.cvDataDetailList.push(entries['phone']);
			if (entries.address)
				submitCV.cvDataDetailList.push(entries['address']);
			if (entries.email)
				submitCV.cvDataDetailList.push(entries['email']);
			if (entries.jobtitle)
				submitCV.cvDataDetailList.push(entries['jobtitle']);

			if (entries.history1)
				submitCV.jobHistory.push(entries['history1']);
			if (entries.history2)
				submitCV.jobHistory.push(entries['history2']);
			if (entries.history3)
				submitCV.jobHistory.push(entries['history3']);
			if (entries.history4)
				submitCV.jobHistory.push(entries['history4']);

			$.ajax({
				method: 'POST',
				url: "/savecv",
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify(submitCV),
				dataType: 'json',
				processData: false
			})
			.done(function (msg){
				$.toast('Thanks, we saved your CV', 4000, 'rounded');
				submitCV = { cvDataDetailList: [], jobHistory: [] };
				entries.phone = null;
				entries.address = null;
				entries.email = null;
				entries.jobtitle = null;
				entries.summary = null;
				entries.history1 = null;
				entries.history2 = null;
				entries.history3 = null;
				entries.history4 = null;
				var newUserId = msg.id;
				$('.modal.share').modal({
					onApprove: function (){
						var groupId = $('.groupId').dropdown('get value') || 2;
						$.ajax({
							method: 'POST',
							url: "/share/" + newUserId + '?groupId=' + groupId,
							contentType: 'application/json;charset=utf-8',
							dataType: 'json'
						})
						.done(function (msg){
							$('.very.padded.basic.container')
								.before('<div class="ui basic container segment">' +
									'<div class="ui icon large info message">' +
									'<i class="share icon"></i>' +
									'<div class="content">' +
									'<div class="header">Here is your unique sharing link</div>' +
									'<p>' + msg.url + '</p>' +
									'</div>' +
									'</div>' +
									'</div>')

						}).fail(function (jqXHR, textStatus, errorThrown){
							console.dir(textStatus);
							console.dir(errorThrown);
						});
					}
				})
				.modal('show');
			}).fail(function (jqXHR, textStatus, errorThrown){
				console.dir(textStatus);
				console.dir(errorThrown);
			});

		});
});
