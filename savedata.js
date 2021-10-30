var btn=document.getElementById('btn');
var newUser =[];
window.onload=function(){

//localStorage.removeItem('usernames');
newUser =  JSON.parse(localStorage.getItem('usernames'));
 //console.log(typeof(newUser));
 //console.log(typeof([]));
 if(newUser===null){
 	newUser=[];
 }else{
for(var i=0;i<newUser.length;i++){
updateTable(newUser[i]);
 }

 }

}
console.log(newUser);
   var f = document.getElementById("oname").value;
	   var l = document.getElementById("vname").value;
	   var e = document.getElementById("vnum").value;
	   
	   var loc = document.getElementById("endate").value;
	   var ex = document.getElementById("exdate").value;



btn.addEventListener('click',function(){


		  f = document.getElementById("oname").value;
		
	    l = document.getElementById("vname").value;
	    e = document.getElementById("vnum").value;
	   
	    loc = document.getElementById("endate").value;

	    ex= document.getElementById("exdate").value;



	





var users={
	fn:f,
	l:l,
	e :e,
	loc :loc,
	ex : ex 
};

console.log(newUser);


 newUser.push(users);
 updateTable(users);

//newUser.push(users);	
 localStorage.setItem('usernames', JSON.stringify(newUser));



});



function updateTable(users) {
    var myString = "<tr>";
    for (const key in users) {
        console.log(key);
        if (users.hasOwnProperty(key)) {
            myString += "<td>" + users[key] + "</td>";
        }
    }
    myString += "</tr>";
    document.getElementById("t1").insertAdjacentHTML("beforeend", myString);
}
