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
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target.id);
        console.log(id);

    console.log("dragged");
}

function drop(ev,id) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("dropped");
    console.log(data);
}
function allowDrop(ev,id) {
    ev.preventDefault();
}
/*
var modal = document.getElementById('tables');

// Get the button that opens the modal
var listElement = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/

function tableClicked(id)
{
    console.log(id);
}
function popup(mylink, windowname) {
 if (! window.focus)return true;
  var href; if (typeof(mylink) == 'string') href=mylink;
   else href=mylink.href;
  window.open(href, windowname, 'width=400,height=200,scrollbars=yes');
  return false; }


