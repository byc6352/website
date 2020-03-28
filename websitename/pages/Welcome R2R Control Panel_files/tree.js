function Toggle2(item) {
   obj=document.getElementById(item);
   visible=(obj.style.display!="none")
   key=document.getElementById("x" + item);
   if (visible) {
     obj.style.display="none";
     if (item == "top0") {
        key.innerHTML="<img src='/images/plustop.gif' hspace='0' vspace='0' border='0'>";
     }
     else {
        key.innerHTML="<img src='/images/plus.gif' hspace='0' vspace='0' border='0'>";
     }
   } else {
      obj.style.display="block";
      if (item == "top0"){
        key.innerHTML="<img src='/images/minustop.gif' hspace='0' vspace='0' border='0'>";
      }
      else {
         key.innerHTML="<img src='/images/minus.gif' hspace='0' vspace='0' border='0'>";
      }
   }
}

function Expand() {
   divs=document.getElementsByTagName("DIV");
   for (i=0;i<divs.length;i++) {
     divs[i].style.display="block";
     key=document.getElementById("x" + divs[i].id);
     key.innerHTML="<img src='/images/minustop.gif'  hspace='0' vspace='0' border='0'>";
   }
}

function Collapse() {
   divs=document.getElementsByTagName("DIV");
   for (i=0;i<divs.length;i++) {
     divs[i].style.display="none";
     key=document.getElementById("x" + divs[i].id);
     key.innerHTML="<img src='/images/plustop.gif' hspace='0' vspace='0' border='0'>";
   }
}


