/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */


$(function(){

    var Student = {
	init: function(){
	    if(!localStorage.attendance){
		localStorage.students = JSON.stringify([]);
	    }
	},
	add: function(obj){
	    var data = JSON.parse(localStorage.students);
	    data.push(obj);
	    localStorage.students = JSON.stringify(data);
	},
	list: function(){
	    return Json.parse(localStorage.students);
	}
    };


    var Attendance = {
	init: function(){
	    if(!localStorage.attendance){
		localStorage.attendance = JSON.stringify({});
	    }
	},
	add: function(student, value){
	    var data = JSON.parse(localStorage.attendance);
	    if (!data[student])
		data[student] = [];
	    data[student].push(value);
	    localStorage.attendance = JSON.stringify(data);
	},
	get: function(student){
	    var data = JSON.parse(localStorage.attendance);
	    return data[student];
	},
	list: function(){
	    return JSON.parse(localStorage.attendance);
	}
    };


    var Octopus = {
	students: [
	    'Student A',
	    'Student B',
	    'Student C',
	    'Student D',
	],
	n_days: 12, 
	init: function(){
	    this.initAttendance();
	    this.renderAttendance();
	},
	initAttendance: function(){
	    for(var k=0; k < this.students.length; k++){
		for(var i=0; i<this.n_days; i++){
		    Attendance.add(this.students[k], this.getRandom());
		}
	    }
	},
	getRandom: function(){
	    return Math.random() >= 0.5;
	},
	countMissing: function(student){
	    var missing = 0;
	    var data = Attendance.get(student);
	    for(var i=0; i<data.length; i++){
		if(data[i] == 0)
		    missing++;
	    }
	    return missing;
	},
	renderAttendance: function(){
	    view.render(Attendance.list());
	}

    };

    var view = {
	render: function(students){
	    $('#attendance-table').html('');
	    var table = $('<table></table>');
	    var thead = $('<thead></thead>');
	    var tbody = $('<tbody></tbody>')
	    thead.append($('<th>Student</th>'));

	    $.each(students, function(key, val){
		var row = $('<tr></tr>');
		for(var i=0; i<val.length; i++){
		    var checkbox = $('<input type=\"checkbox\" checked=\"'+val[i]+'\">');
		    row.append($('<td></td>')
			       .append(checkbox));
		}
		row.append('<td>'+key+'</td>');
		tbody.append(row);
	    });
	    table.append(thead);
	    table.append(tbody);
	    $('#attendance-table').append(table);
	    
	}
    }

    Octopus.init();
});
// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());


// /* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
//}());
