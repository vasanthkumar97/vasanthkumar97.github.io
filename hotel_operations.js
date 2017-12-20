var dragged_element,dropped_on_element;
var text;
var itemMapping;
var tableMapping={
"t1":{
"items":[],
"cost":0
},
"t2":{
     "items":[],
     "cost":0
     },
"t3":{
     "items":[],
     "cost":0
     }}


function searchTable() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("tableInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("tables");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function searchItem() {
getItemJson()
    var input, filter, ul, li, a, i;
    input = document.getElementById("itemInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("items");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function drag(ev,id) {
    console.log(id);
    dragged_element=id;
    console.log(ev.dataTransfer.getData("text"));
    console.log("dragged");
}

function drop(ev,id) {
    ev.preventDefault();
    dropped_on_element=id
    var data = ev.dataTransfer.getData("text");
//    console.log("dropped");
    takeAction()
}
function allowDrop(ev,id) {
    ev.preventDefault();
}
function takeAction()
{
var targetItem=dragged_element
var targetTable=dropped_on_element
getItemJson("item_json.json")
//console.log(dropped_on_element)
//console.log(dragged_element)
//console.log(tableMapping)
//console.log(itemMapping)
for(var eachTable in tableMapping)
{
for(var eachItem in itemMapping)
{
if(itemMapping[eachItem]["id"]==dragged_element && dropped_on_element==eachTable)
{
//console.log(tableMapping.indexOf(eachTable))
tableMapping[eachTable]["items"].push(itemMapping[eachItem]["id"]);
tableMapping[eachTable]["cost"]=tableMapping[eachTable]["cost"]+itemMapping[eachItem]["cost"];

}

}

}

console.log(tableMapping);



}
function getItemJson(file)
{
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                itemMapping = JSON.parse(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}


}

