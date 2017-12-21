var dragged_element,dropped_on_element;
var text;
var itemMapping;
var activeModal;
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
var current_id
for(var eachTable in tableMapping)
{
for(var eachItem in itemMapping)
{
if(itemMapping[eachItem]["id"]==dragged_element && dropped_on_element==eachTable)
{
//console.log(tableMapping.indexOf(eachTable))
current_id=itemMapping[eachItem]["id"]
console.log(tableMapping[eachTable]["items"])
for(var index=0;index<tableMapping[eachTable]["items"].length;index++)
{var dup=0;
console.log(tableMapping[eachTable]["items"][index])
if(current_id in tableMapping[eachTable]["items"][index])
{
console.log("bug found")
dup=1
break;
}
}
if(tableMapping[eachTable]["items"].length>0&&dup==1)
{
var str=""
str+=current_id
console.log(tableMapping[eachTable]["items"][index][str])
tableMapping[eachTable]["items"][index][str]["count"]++
tableMapping[eachTable]["cost"]=tableMapping[eachTable]["cost"]+itemMapping[eachItem]["cost"];
}
else
{var str=""
str+=current_id
temp={}
temp[str]={"count":1}

tableMapping[eachTable]["items"].push(temp);
tableMapping[eachTable]["cost"]=tableMapping[eachTable]["cost"]+itemMapping[eachItem]["cost"];
}
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

function tableClicked(id)
{   var total=0
    activeModal=id;
    var table=  document.getElementById ('bill');
    table.innerHTML=""
    console.log(id)

            getItemJson()
            for(var each in tableMapping)
            {
            if (each==id)
            {
            console.log(id)
            break;
            }
            }
            document.getElementById("table_no").innerHTML="Table"
        var tbl     = document.createElement("table");
                        var tblBody = document.createElement("tbody");
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode("Sno");

            cell.appendChild(cellText);
            cell.align="center"
                row.appendChild(cell);

                var cell = document.createElement("td");
            var cellText = document.createTextNode("items");
            cell.appendChild(cellText);
                        cell.align="center"

                row.appendChild(cell);
                var cell = document.createElement("td");
                            var cellText = document.createTextNode("Pricing");
                            cell.appendChild(cellText);
                                        cell.align="center"

                                row.appendChild(cell)
                var cell = document.createElement("td");
          var cellText = document.createTextNode("servings");
          cell.appendChild(cellText);
                      cell.align="center"

              row.appendChild(cell);
                        tblBody.appendChild(row);
            for(var j=1;j<=tableMapping[id]["items"].length;j++)
            {
            var row = document.createElement("tr");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(j);
            cell.appendChild(cellText);
                        cell.align="center"

                row.appendChild(cell);
            /////items

                        var cell = document.createElement("td");
                        console.log(tableMapping)
                        console.log(tableMapping[id])

                        console.log(tableMapping[id]["items"])
                        for(var key in tableMapping[id]["items"][j-1])
                        {break;
                        }
                        var item_id=key;
                        console.log(itemMapping)

                        for(i=0;i<itemMapping.length;i++)
                        {
                        if(itemMapping[i]["id"]==item_id)
                        {
                        var name=itemMapping[i]["name"]
                        break;
                        }
                        }
                        var cellText = document.createTextNode(name);
                                    cell.align="center"

                        cell.appendChild(cellText);
                            row.appendChild(cell);
            //Pricing
            var cell = document.createElement("td");
             for(i=0;i<itemMapping.length;i++)
                                    {
                                    if(itemMapping[i]["id"]==item_id)
                                    {
                                    var name=itemMapping[i]["cost"]*tableMapping[id]["items"][j-1][key]["count"]
                                    break;
                                    }
                                    }
            total+=name
            console.log(total)
            var cellText = document.createTextNode(name);
            cell.align="center"


            cell.appendChild(cellText);
                row.appendChild(cell);


            //////servings
            var cell = document.createElement("td");
                                    var servings=document.createElement("input")
                                                cell.align="center"
            var servings_id="s_"+itemMapping[i]["id"]
                                    servings.setAttribute("type","number")
                                    servings.setAttribute("id",servings_id)
                                    servings.setAttribute("onchange","servingsChanged(this.id)")
                                    //var cellText = document.createTextNode();
                                    servings.setAttribute("value",tableMapping[id]["items"][j-1][key]["count"])

                                    cell.appendChild(servings);
                                        row.appendChild(cell);
            ///delete button
            var cell = document.createElement("td");

                                                var servings=document.createElement("button")
//                                                servings.setAttribute("onclick","delete")
//                                                servings.setAttribute("class","delete_btn")
                                                servings.setAttribute("id","d_"+itemMapping[i]["id"])
                                                servings.setAttribute("onclick","onDeleteButton(this.id)")
                                                servings.style.height="30px"
                                                servings.style.width="200px"
//                                                console.log(servings.class)
                                                    //var cellText = document.createTextNode();
                                                var cellText = document.createTextNode("delete");
                                                            cell.align="center"


                                                servings.appendChild(cellText)

                                                cell.appendChild(servings);
                                                    row.appendChild(cell);


            //row added to end of table body
            tblBody.appendChild(row);

            }
            // append the <tbody> inside the <table>
            tbl.appendChild(tblBody);
            // put <table> in the <body>
            table.appendChild(tbl);
            document.getElementById("total").innerHTML="total=<br>"+total
            // tbl border attribute to
var modal = document.getElementById('myModal');
                modal.style.display = "block";

}

function closeModal()
{   var modal = document.getElementById('myModal');

    modal.style.display = "none";

}

function servingsChanged(item_id)
{var split=item_id.split("_")

for (var index=0;index<tableMapping[activeModal]["items"].length;index++)
{console.log(tableMapping[activeModal]["items"][index])
if(split[1] in tableMapping[activeModal]["items"][index])
{
console.log(tableMapping[activeModal]["items"][index])
break;
}
}
console.log(document.getElementById(item_id).value)
console.log(tableMapping[activeModal]["items"])
tableMapping[activeModal]["items"][index][split[1]]["count"]=document.getElementById(item_id).value

var modal = document.getElementById('myModal');

    modal.style.display = "none";
tableClicked(activeModal)

}

function onDeleteButton(item_id)
{
var split=item_id.split("_")
for (var index=0;index<tableMapping[activeModal]["items"].length;index++)
{console.log(tableMapping[activeModal]["items"][index])
if(split[1] in tableMapping[activeModal]["items"][index])
{
console.log(tableMapping[activeModal]["items"][index])
break;
}
}
console.log(document.getElementById(item_id).value)
console.log(tableMapping[activeModal]["items"])
tableMapping[activeModal]["items"][index][split[1]]["count"]=0

var modal = document.getElementById('myModal');

    modal.style.display = "none";
tableClicked(activeModal)

}

function onGenerateBill()
{

tableMapping[activeModal]["items"]=0
tableMapping[activeModal]["cost"]=0
closeModal()
console.log(activeModal)
}