/*! ImprovedDate 1.0.0
 * ©2018 E SYSTEMES - https://github.com/E-SYSTEMES/improved-date
 * Licensed under MIT (https://github.com/E-SYSTEMES/improved-date/blob/master/LICENSE)
 */

/**
 * @summary			ImprovedDate
 * @description	an improved date object 
 * @author			Lionel Astol
 * @version			1.0.0
 * @file				improvedDate.js
 * @repo				https://github.com/E-SYSTEMES/improved-date
 * @doc					https://e-systemes.github.io/improved-date/
 */

function ImprovedDate( Y, M, D, h, m, s, ms ) {
	
 	//d = typeof d !== 'undefined' ? d : new Date();
	
	if ( typeof Y === 'undefined' ) {
		
		this.date = new Date ();
		
	}
	else {
		
		if ( typeof M === 'undefined' ) {
			
			this.date = new Date ( Y );
			
		}
		else {
			
			D  = typeof D !== 'undefined' ? D : 1;
			h  = typeof h !== 'undefined' ? h : 0;
			m  = typeof m !== 'undefined' ? m : 0;
			s  = typeof s !== 'undefined' ? s : 0;
			ms = typeof ms !== 'undefined' ? ms : 0;
			
			this.date = new Date ( Y, M, D, h, m, s, ms );
			
		}
	}
}

		
/**
 * @summary getYearDay()
 * @description calculate the number of the day for the year ( 1 - 366 ) and the number of remaining days ( 366 - 1 ) for a date
 * @return Array = [ day of the year, remaining days ]
 *
 */

ImprovedDate.prototype.getYearDay = function() { 

	var year		= this.date.getFullYear(),
			month		= this.date.getMonth(),
			date		= this.date.getDate(),
			time		= this.date.getTime();
	
	var lastDate = new Date();
			
			lastDate.setFullYear( year );
			lastDate.setMonth( 11 );
			lastDate.setDate( 31 );
			lastDate = lastDate.getTime();
			
	// number of days since new Year's Day for every month
	var offset	= [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

	// add 1 if leap year	
	var leapYear = ( month < 2 ) ? 0 : ( year % 400 === 0 || ( year % 4 === 0 && year % 100 !== 0 ) );
	
	var doy = parseInt ( date + offset[ month ] + leapYear ); // 1 - 366
	var rdy = parseInt ( ( lastDate - time ) / 86400000 ); // 366 - 1
	
  return [ doy , rdy ];
    
};


/**
 * @summary firstDayOfWeek()
 * @description calculate the Date of the ISO 8601 first day of the week ( monday ) for a date
 * @return Date
 *
 */

ImprovedDate.prototype.firstDayOfWeek = function() {

	var year		= this.date.getFullYear(),
			month		= this.date.getMonth(),
			date		= this.date.getDate(),
			day			= this.date.getDay();
	
	// now sunday = 7
	var offset = ( day + 6 ) % 7;
	
	return new Date( year , month , date - offset );
	
};


/**
 * @summary getWeek()
 * @description calculate the ISO 8601 number (1 - 53) of the week for a date 
 * @uses this.getYearDate(), this.firstDayOfWeek()
 * @return Number
 *
 */

ImprovedDate.prototype.getWeek = function() { 

	var year		= this.date.getFullYear(),
			month		= this.date.getMonth(),
			date		= this.date.getDate();
	var week;
	
	// next monday after the last day of the year
	var nextMonday = new ImprovedDate( year , 11 , 31 ).firstDayOfWeek();
	
	// the Date is in the last week of the year, but this week is in the next year
	if ( this >= nextMonday && nextMonday.getDate() > 28 ) {
		
		week = 1;
		
	}
	
	else {
		
		// previous monday before the first day of the year
		var prevMonday = new ImprovedDate( year , 0 , 1 ).firstDayOfWeek();
		
		// if the first monday is in the previous year
		if ( prevMonday.getFullYear() < year ) {
			
			prevMonday = new ImprovedDate( year , 0 , 8 ).firstDayOfWeek();
			
		}
		
		// get the number of day since the previous monday
		var days = this.getYearDay()[ 0 ] - new ImprovedDate( prevMonday.getFullYear(), prevMonday.getMonth(), prevMonday.getDate() ).getYearDay()[0];
		
		// if the number of days is negative, we take the last week of the previous year
		if( days < 0 ) {
			
			week = new ImprovedDate ( year , month , date + days ).getWeek();
			
		}
		
		else {
			// number of the week
			week = 1 + parseInt ( days / 7 );
			
			// we add 1 if the first week of the year is not in the previous year
			week += ( new ImprovedDate( year - 1 , 11 , 31 ).firstDayOfWeek().getDate() > 28 );
			
		}
		
	}
	
	return parseInt ( week );
	
};


/**
 * @summary getMonthLength()
 * @description calculate the number of days of the month for a date 
 * @return Number
 *
 */

ImprovedDate.prototype.getMonthLength = function() {

	var year		= this.date.getFullYear(),
			month		= this.date.getMonth();
	
	return new Date( year, month + 1 , - 1 ).getDate() + 1;
	
};


/**
 * @summary getNonWorkingDay( weekends )
 * @description return true if the date is a french nonworking day (including week ends)
 * pass false as parameter to exclude week ends 
 * @param Optional - Bool - default = true
 * @return Bool
 *
 */

ImprovedDate.prototype.getNonWorkingDay = function( weekends ) { 

	var year		= this.date.getFullYear(),
			month		= this.date.getMonth(),
			date		= this.date.getDate(),
			day		  = this.date.getDay();

	// param for including week ends
	weekends = typeof weekends !== 'undefined' ? weekends : true;

	// calc for easter
	var easter1 = year % 19,
			easter2 = Math.floor( year / 100 ),
			easter3 = ( easter2 - Math.floor( easter2 / 4 ) - Math.floor( ( 8 * easter2 + 13 ) / 25 ) + 19 * easter1 + 15 ) % 30,
			easter4 = easter3 - Math.floor( easter3 / 28 ) *  (1 - Math.floor( easter3 / 28 ) * Math.floor( 29 / ( easter3 + 1 ) ) * Math.floor( ( 21 - easter1 ) / 11 ) ),
			easter5 = ( 1 * year + Math.floor( year / 4 ) + easter4 + 2 - easter2 + Math.floor( easter2 / 4 ) ) % 7,
			easter6 = easter4 - easter5,
			easter7 = 3 + Math.floor( ( easter6 + 40 ) / 44 ),
			easter8 = easter6 - 3 * Math.floor( easter7 / 4 );
				
	if( month === 0 && date === 1 ) { // new year's day
		return true;
	}
	else if( month === 4 && date === 1 ) { // labour day
		return true;
	}
	else if( month === 4 && date === 8 ) { // victory day
		return true;
	}
	else if( month === 6 && date === 14 ) { // french national holiday 
		return true;
	}
	else if( month === 7 && date === 15 ) { // assumption
		return true;
	}
	else if( month === 10 && date === 1 ) { // all saints day
		return true;
	}
	else if( month === 10 && date === 11 ) { // veterans day
		return true;
	}
	else if( month === 11 && date === 25 ) { // christmas
		return true;
	}
	else if( month === easter7 - 1 && date === easter8 ) { // easter sunday
		return true;
	}
	else if( month === easter7 - 1 && date === easter8 + 1 ) { // easter monday
		return true;
	}
	else if( month === easter7 - 1 && date === easter8 + 39 ) { // ascension day
		return true;
	}
	else if( month === easter7 - 1 && date === easter8 + 49 ) { // whit sunday
		return true;
	}
	else if( month === easter7 - 1 && date === easter8 + 50 ) { // whit monday
		return true;
	}
	else if( weekends === true && ( day === 6 || day === 0 )  ) { // week ends
		return true;
	}
	else {
		return false;
	}
	
};
