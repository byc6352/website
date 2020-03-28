/*
********************************************************************
*Name 			:  Lee Yen Chew
*Description 		:  Validation Library
*Date of Creation	:  28/7/2000
*Version		:  1.0
********************************************************************
*/

function CheckLength(formelement,elementlength) {

	if (formelement.value.length>elementlength){
		alert ("Exceed maximum allowed characters.");
		return false;
	} else return true;
}

function CheckMinLength(formelement,minlength) {
	if (formelement.value.length<minlength){
		alert ("Field requires at least " + minlength + " characters." );
		return false;
	} else return true;
}

function FormatDec(inputval){
	oneDecimal=false;
	var k=0;
	var result="";
	inputStr=inputval.toString();
	for(var i=0;i<inputStr.length;i++) {
		var oneChar=inputStr.charAt(i);
		result=result + inputStr.charAt(i);
		if (oneChar=="." && !oneDecimal) {
			for(var k=1;k<5;k++) {
				result=result + inputStr.charAt(i+k);
			}
			break;
		}
	}
	return result;
}

/****** function : check dates for the month and reset to 1st of the month ***  
 *					if e.g. 31st Feb doesn't exist
 *******************************************************************/
function formatdatedd(datedd, datemm, dateyyyy) {
	var i, j, str, newlength, idate, blank;
	//alert("see : here" + datemm.options[datemm.selectedIndex].value)
	idate=datedd.selectedIndex;
	newlength=getMonthLength(datemm.options[datemm.selectedIndex].value, dateyyyy.options[dateyyyy.selectedIndex].value);
	if (datedd.options[0].text=="") {
		blank=true;
		j=1;
	}
	else {
		j=0;
	}
	if (newlength!=datedd.options.length-j) {
		datedd.options.length=0;
		if (blank)	datedd.options[0]=new Option("","");
		for(i=1;i<=newlength;i++)
		{
			if (i<10)
				str="0" + i;
			else
				str=i;
			datedd.options[i-1+j]=new Option(str,str);

		}	
		if (idate>=(datedd.options.length-j)) {
			datedd.selectedIndex=0;
			alert ("The selected month has only " + newlength + " days.\n Please note that the day has been reset to 01.");
			datedd.focus();
		}
		else
			datedd.selectedIndex=idate;
	}
	
}

function getMonthLength(mm, yyyy) {
	if (mm==2) {
		if (yyyy%4>0)
			return 28;
		else
			return 29;
	}
	else if ((mm==4||mm==6||mm==9||mm==11))
		return 30;
	else
		return 31;
}

function isEmpty(inputval) {
	if (inputval==""||inputval==''||inputval=="Null"||inputval=="null"||inputval=="undefined"){
		return true;
	}
	return false;
}

function isEmail(strEmail) {
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
		return true;
	else{
		alert ("Please fill in a valid email address.");
		return false;
	}
}

function isPosInteger(inputval) {
	oneComma=false;
	j=0;

	inputStr=inputval.toString();
	for(var i=0;i<inputStr.length;i++) {
		var oneChar=inputStr.charAt(i);
		if (oneChar==",") {
			oneComma=true;
			j=0;
			continue;
		}
		j=j+1;
		if (oneChar< "0" || oneChar>"9") {
			alert ("Numerics only.");
			return false;
		}
	}
	if (oneComma && j!=3) {
		alert("Invalid value.");
		return false;
	}
	return true;
}

function isCurrency(inputval){
	oneComma=false;
	oneDecimal=false;
	j=0;
	k=3;
	inputStr=inputval.toString();
	for(var i=0;i<inputStr.length;i++) {
		var oneChar=inputStr.charAt(i);
		if (oneChar=="." && !oneDecimal) {
			oneDecimal=true;
			k=j;
			j=1;
			continue; 
		}
		if (oneChar==",") {
			oneComma=true;
			j=0;
			continue;
		}
		j=j+1;
		if (oneChar< "0" || oneChar>"9") {
			alert("The value you entered is not correct. The correct format is 9,999,999.99 ");
			return false;
		}
	}

	if (oneComma && (k!=3 || j!=3)) {
		alert("The value you entered is not correct. The correct format is 9,999,999.99 ");
		return false;
	}
	if (oneComma && j!=3) {
		alert("The value you entered is not correct. The correct format is 9,999,999.99 ");
		return false;
	}
	return true;
}


function isFloat(inputval){
	oneDecimal=false;
	inputStr=inputval.toString();
	for(var i=0;i<inputStr.length;i++) {
		var oneChar=inputStr.charAt(i);
		if (oneChar=="." && !oneDecimal) {
			oneDecimal=true;
			continue;
		}
		if (oneChar==",") {
			continue;
		}
		if (oneChar< "0" || oneChar>"9") {
			alert("The value you entered must be in the following format: 999.9999");
			return false;
		}
	}
	return true;
}

function nt(Fls) {
        window.open(Fls,"mt","");
}

function CompareDate(inputless, inputmore) {
//date format must be in mm/dd/yyyy

	var delim1 = inputless.indexOf("/");
	var delim2 = inputless.lastIndexOf("/");
	if (delim1==0) var delim1 = inputless.indexOf("-");
	if (delim2==0) var delim2 = inputless.lastIndexOf("-");
	
	if (delim1!=-1){
		var mmless = parseFloat(inputless.substring(0,delim1));
		var ddless = parseFloat(inputless.substring(delim1+1,delim2));
		var yyyyless = parseFloat(inputless.substring(delim2+1,inputless.length));
	}
	
	var delim3 = inputmore.indexOf("/");
	var delim4 = inputmore.lastIndexOf("/");
	if (delim3==0) var delim3 = inputmore.indexOf("-");
	if (delim4==0) var delim4 = inputmore.lastIndexOf("-");
	
	if (delim3!=-1){
		var mmmore = parseFloat(inputmore.substring(0,delim3));
		var ddmore = parseFloat(inputmore.substring(delim3+1,delim4));
		var yyyymore = parseFloat(inputmore.substring(delim4+1,inputmore.length));
	}
	
	if (yyyymore>yyyyless){
		return true;
	}
	if (yyyymore<yyyyless){
		return false;
	}

	if (yyyymore==yyyyless){
		if (mmmore>mmless){
			return true;
		}
		if (mmmore<mmless){
			return false;
		}
		if (mmmore==mmless){
			if(ddmore>ddless){
				return true;
			} else {
				return false;
			}	
		}
	}
}
