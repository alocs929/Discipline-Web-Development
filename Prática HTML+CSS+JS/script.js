var botao = document.getElementById("adicionar");
botao.onclick = addItem;
var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("adicionar").click();
  }
});




var ul = document.getElementById("list");
var li;
var itemId;
var item;



function addItem(){
  if(document.getElementById("input").value != ""){
    item = document.getElementById("input");
    // console.log(item.value)
    itemId = ul.childElementCount;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", itemId);
    checkBox.setAttribute("hidden", "");
    ul.appendChild(checkBox);
    
    li = createItemLi(item.value, itemId);
    li.appendChild(createRemoveItemButton(itemId));    
    ul.appendChild(li);
    item.value = "";
  }else{
    alert("Digite algo!");
  }
}

function removeItem(itemId){
  for(i=0;i< ul.children.length; i++){
    if(ul.children[i].getAttribute("index") == itemId){
      ul.children[i].remove();
      ul.children[i-1].remove();
    }
  }
}

function createItemLi(itemValue, itemId){
  let li = document.createElement("li");
  

  let label = document.createElement("label");
  label.setAttribute("for", itemId);
  label.setAttribute("class", "inputCheck");

  li.setAttribute("index", itemId);
  label.appendChild(document.createTextNode(itemValue));
  li.appendChild(label);
  return li;
}

// function createItemLi(itemValue, itemId){
//   let li = document.createElement("li");
//   let label = document.createElement("label");
//   li.setAttribute("index", itemId);
//   label.appendChild(document.createTextNode(itemValue));
//   li.appendChild(label);
//   return li;
// }

// function createItemLi(itemValue, itemId){
//   let li = document.createElement("li");
//   li.setAttribute("index", itemId);
//   li.appendChild(document.createTextNode(itemValue));
//   return li;
// }

function createRemoveItemButton(itemId){
  let btn = document.createElement("button");
  btn.setAttribute("onclick", "removeItem("+itemId+")");
  btn.innerHTML = "X";
  return btn;

}