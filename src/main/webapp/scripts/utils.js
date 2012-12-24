
function formatDate(value) {
	return value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8);
}


/*
	var properties = data['ns1.DataObject']['ns1.property'];
	
	for(var i=0;i<properties.length;i++){
     var obj = properties[i];
    
     for(var key in obj){
         var value = obj[key];
         
		if (value == "DateTo") {
			obj['ns1.value'] = endDate;
		} else if (value == "DateFrom") {
			obj['ns1.value'] = startDate;
		} else if (value == "Type") {
			obj['ns1.value'] = leaveType;
		} 
     }
 }
*/