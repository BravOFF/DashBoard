$(function () {

    // $('body').css('background', 'url(img/bg.jpg) no-repeat');
    // $('body').css('background-size', 'cover');
    // $('body').css('background-attachment', 'fixed');
    // $('body').css('background-position', '50% 0%');
    //
    // $('#tree_l').css('background', 'url(img/tree_l.png) no-repeat');
    // $('#tree_l').css('background-size', '50% auto');
    // $('#tree_l').css('background-attachment', 'fixed');
    // $('#tree_l').css('background-position', '0% 0%');
    //
    // $('#tree_r').css('background', 'url(img/tree_r.png) no-repeat');
    // $('#tree_r').css('background-size', '50% auto');
    // $('#tree_r').css('background-attachment', 'fixed');
    // $('#tree_r').css('background-position', '100% 0%');
    //
    //
    //
    //
    // window.onscroll = function() {
    //     document.body.style.backgroundPosition = "50% "+document.documentElement.scrollTop/((document.documentElement.scrollHeight-document.documentElement.clientHeight)/100)+"%";
    //
    //     document.getElementById("tree_l").style.backgroundPosition = "0% "+document.documentElement.scrollTop/((document.documentElement.scrollHeight-document.documentElement.clientHeight)/100)+"%";
    //
    //     document.getElementById("tree_r").style.backgroundPosition = "100% "+document.documentElement.scrollTop/((document.documentElement.scrollHeight-document.documentElement.clientHeight)/100)+"%";
    // }



    $('#paginator').datepaginator();


    $('#demo').ganttChart({
        startDate: new Date(new Date().getTime() - 30 * 86400000),
        endDate: new Date(new Date().getTime() + 55 * 86400000),
        lang: {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        },
        events: [
            {
                startDate: new Date(new Date().getTime() - 15 * 86400000),
                endDate: new Date(new Date().getTime() - 2 * 86400000),
                title: 'event 1',
                href: '#',
                style: 'your-css bg-primary'
            },{
                startDate: new Date(new Date().getTime() - 2 * 86400000),
                endDate: new Date(new Date().getTime() + 4 * 86400000),
                title: 'event 1',
                href: '#',
                style: 'your-css bg-danger'
            },
            {
                startDate: new Date(new Date().getTime() - 4 * 86400000),
                endDate: new Date(new Date().getTime() + 2 * 86400000),
                title: 'event 2',
                href: '#',
                style: 'your-css'
            },
            {
                startDate: new Date(new Date().getTime() + 2 * 86400000),
                endDate: new Date(new Date().getTime() + 20 * 86400000),
                title: 'event 3',
                href: '#',
                style: 'your-css bg-success'
            },
            {
                startDate: new Date(new Date().getTime() + 10 * 86400000),
                endDate: new Date(new Date().getTime() + 45 * 86400000),
                title: 'event 3',
                href: '#',
                style: 'your-css'
            },{
                startDate: new Date(new Date().getTime() - 25 * 86400000),
                endDate: new Date(new Date().getTime() - 7 * 86400000),
                title: 'event 1',
                href: '#',
                style: 'your-css bg-primary'
            },{
                startDate: new Date(new Date().getTime() - 9 * 86400000),
                endDate: new Date(new Date().getTime() + 9 * 86400000),
                title: 'event 1',
                href: '#',
                style: 'your-css bg-danger'
            },
            {
                startDate: new Date(new Date().getTime() - 1 * 86400000),
                endDate: new Date(new Date().getTime() + 12 * 86400000),
                title: 'event 2',
                href: '#',
                style: 'your-css'
            },
            {
                startDate: new Date(new Date().getTime() + 4 * 86400000),
                endDate: new Date(new Date().getTime() + 15 * 86400000),
                title: 'event 3',
                href: '#',
                style: 'your-css bg-success'
            },
            {
                startDate: new Date(new Date().getTime() - 10 * 86400000),
                endDate: new Date(new Date().getTime() + 45 * 86400000),
                title: 'event 3',
                href: '#',
                style: 'your-css'
            },
            // more events here
        ],
        tmpl: {
            month: '<div class="example-month"></div>',
            week: '<div class="example-week">W</div>',
            date: '<div class="example-date"></div>',
            day: '<div class="example-day"></div>',
            col: '<div class="example-col"></div>',
            row: '<div class="example-row"></div>',
            event: '<div class="example-event"></div>'
        }
    });

	$.ajax({
		type: "GET",
		crossDomain: true,
		url: "p112.php",
		dataType: "xml",
		success: xmlParser
	});

});

function xmlParser(xml) {
	// $('#load').fadeOut();

	$(xml).find("item").each(function () {
	    title = $(this).find("title").text();
		description = $(this).find("description").text();
		pubDate = $(this).find("pubDate").text().split(' ');
		link = $(this).find("link").text();
		pic = $(this).find("enclosure").attr('url');
		console.log('====');
		console.log(title);
		console.log(description);
		console.log($(this).find("pubDate").text());
		console.log(pubDate);
		console.log(link);
		console.log(pic);

		pDate = pubDate[1]+'.'+pubDate[2]+'.'+pubDate[3];
		pTime = pubDate[4];

		$("#pro112").append('<div class="media" style="margin-bottom: 7px;"> ' +
            '<img class="align-self-start mr-3" style="width: 90px; height: auto;" src="'+pic+'" alt="Generic placeholder image"> ' +
            '<div class="media-body"> ' +
            '<h5 class="mt-0 mb-0" style="font-size: 0.9rem; line-height: 1;">'+title+'</h5> ' +
            '<p class="m-0" style="font-size: 0.8rem"> ' +
            '<i class="icon ion-md-calendar text-danger" style="font-size: 1rem;"></i> ' + pDate +
            ' <i class="icon ion-md-time text-danger ml-3" style="font-size: 1rem;"></i> ' + pTime +
            ' </p> ' +
            '<p style="font-weight: 200; font-size: 0.9rem; line-height: 1;">'+description+'</p> ' +
            '</div> ' +
            '</div>')



		// $("#pro112").append('<div class="book"><div class="title">' + $(this).find("title").text() + '</div><div class="description">' + $(this).find("description").text() + '</div><div class="date">Опубликовано ' + $(this).find("pubDate").text() + '</div></div>');
		// $(".book").fadeIn(1000);
	});

	// $('img').attr({ width: 200 });
}
function formatDate(date) {
	var diff = new Date() - date; // разница в миллисекундах

	if (diff < 1000) { // прошло менее 1 секунды
		return 'только что';
	}

	var sec = Math.floor(diff / 1000); // округлить diff до секунд

	if (sec < 60) {
		return sec + ' сек. назад';
	}

	var min = Math.floor(diff / 60000); // округлить diff до минут
	if (min < 60) {
		return min + ' мин. назад';
	}

	// форматировать дату, с учетом того, что месяцы начинаются с 0
	var d = date;
	d = [
		'0' + d.getDate(),
		'0' + (d.getMonth() + 1),
		'' + d.getFullYear(),
		'0' + d.getHours(),
		'0' + d.getMinutes()
	];

	for (var i = 0; i < d.length; i++) {
		d[i] = d[i].slice(-2);
	}

	return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}