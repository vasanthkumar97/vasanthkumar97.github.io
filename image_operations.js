
//var image = { "pic1":"pic1.jpg", "pic2":"pic2.jpg", "pic3":"pic3.jpg","pic4":"pic4.jpeg"};
var text="";

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName=="GALLERY")
    {getJson();
    }
    if (tabName=="admin")
    {console.log("in js");
window.location.href = "gallery_admin.html";

    }

}

function validateForm() {
    var name =document.forms["myForm"]["name"].value;
    var email=document.forms["myForm"]["email"].value;
    if (name == "") {
        alert("Name must be filled out");
        return false;
    }
    if (email=="")
    {alert("email must be filled out");
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {alert("You have entered an invalid email address!")


  }

}
function getJson(){

//console.log(localStorage.getItem("arrayOfImages"))

//readTextFile("images.json");
//var image = JSON.parse(text);
//the above two lines of code was to read from json doc as for question 2 , the functionality is changed to implement
//further questions

var stringJson=localStorage.getItem("someVarName");
console.log(stringJson);
var image=JSON.parse(stringJson);
//var image_arr=[];
//var index=0;
//image[json["name"]]=json["url"];
for(var key=0;key<image.length;key++)
{if(image[key]==null){continue;}
img=new Image();
img.src=image[key]["url"];
  img.setAttribute("class", "banner-img");
  document.getElementById("img-container").appendChild(img);

}
var str=JSON.stringify(image);
localStorage.setItem("someVarName", str);


}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                text = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}



function addImage()

{
var name=document.getElementById("img_name").value;
 var url=document.getElementById("img_url").value;
  var date=document.getElementById("img_date").value;
    var info=document.getElementById("img_info").value;
if (validateImage(name,url,date))
{

var json={
"name":name,
"url":url,
"info":info,
"date":date};
var flag=0;
console.log(localStorage.getItem("someVarName"))
temp_json=JSON.parse(localStorage.getItem("someVarName"));
console.log(temp_json);
var temp_json=JSON.parse(localStorage.getItem("someVarName"));
for(var key=0;key<temp_json.length;key++)
 {
  if (json[key]==null){continue;}
  if(temp_json[key]["name"]==json["name"])
 {
 temp_json[key]=json;
  flag=1;
 }
}
//adding new ones
if (flag==0)
{console.log(temp_json);

console.log(temp_json)
temp_json.push(json);}

console.log(temp_json);
temp_json=JSON.stringify(temp_json);
localStorage.setItem("someVarName",temp_json)

window.location.href = "index.html";

}
else
{
alert("please enter valid details");
}

}




function validateImage(name,url,date)
{
var inputDate=new Date(date);
if(name!=""&&inputDate!="Invalid Date"&&url!="")
{
if (inputDate<=new Date())
    return true;
}
return false;
}

function getImagesList()
{
var myDiv = document.getElementById("select_container");
console.log(localStorage.getItem("someVarName"));
var json=JSON.parse(localStorage.getItem("someVarName"));

console.log(json);
var selectList = document.createElement("select");
selectList.id = "mySelect";
myDiv.appendChild(selectList);

//Create and append the options
for(var key=0;key<json.length;key++)
 { if(json[key]==null)
 {continue;
 }

 var option = document.createElement("option");
    option.value = json[key]["name"];
    option.text = json[key]["name"];
    selectList.appendChild(option);
}
}

function deleteImage()
{
var input = document.getElementById('mySelect');
console.log(input.value);
var json=JSON.parse(localStorage.getItem("someVarName"))
console.log(json);
for(var key=0;key<json.length;key++)
 {if(json[key]==null)
 {continue;
 }
 if (json[key]["name"]==input.value)
 {delete json[key];

 }
}
console.log(json)
localStorage.setItem("someVarName",JSON.stringify(json));
console.log(localStorage.getItem("someVarName"))

}