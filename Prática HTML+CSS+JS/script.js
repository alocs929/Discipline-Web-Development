// var arrayItem = [];
var  productList = [];

    function rendList(){
        var ul = document.createElement('ul');
        ul.setAttribute('id','proList');
       
        document.getElementById('renderList').appendChild(ul);
        productList.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);
            
            li.innerHTML=li.innerHTML + element;
        }
  }

// var ul = document.getElementById("ul");
// var li = document.createElement("li");
// ul.appendChild(li);
// li.innerHTML=li.innerHTML + element;

function add(){
  console.log(productList);
  if(item.value != ""){
    // arrayItem.push(item.value);
    productList.push(item.value);
  }  
  item.value="";
  console.log(productList);
  return rendList();

}

var item = document.getElementById("input");
var botao = document.getElementById("adicionar");
botao.onclick = add;
  
