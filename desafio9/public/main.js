// const { normalize, schema, denormalize } = require("normalizr");


const socket = io.connect();
const render1 =(data) => {
  const html = data.map((element, index) => {
    return `<div>
    <strong style="color:blue">${element.author.id} </strong> [
    <em style="color:red">${element.fecha}</em> ]:
    <em style="color:green">${element.text}</em>
    <em><img src="${element.url}"></em>
    </div>`;
  });
  document.getElementById("messages").innerHTML = html;
};

const render2 = (data) => {
  const html = data.map((element, index) => {
    return `<tr>
    <td>${element.nombre} </td> 
    <td>${element.precio}</td> 
    <td><img src="${element.thumbnail}"></td>
    </tr>
    `;
  });
  document.getElementById("productos").innerHTML = html;
};

var formattedDate = new Date();
var d = formattedDate.getDate();
var m =  formattedDate.getMonth();
m += 1;  // JavaScript months are 0-11
var y = formattedDate.getFullYear();
var h = formattedDate.getHours();
var min = formattedDate.getMinutes();
var s = formattedDate.getSeconds();


var fecha = d + "/" + m + "/" + y+ " " + h + ":" + min + ":" + s;

function addMessage(e) {
    const mensaje = {
      
        author: {
        id:document.getElementById('username').value,
        name:document.getElementById('name').value,
        lastname:document.getElementById('lastname').value,
        age:document.getElementById('age').value,
        nickname:document.getElementById('nickname').value,
        url:document.getElementById('url').value
      },
      text: document.getElementById('texto').value,
        fecha: fecha
    };
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = ''
    return false;
}
function addProduct(e) {
    const producto = {
      nombre: document.getElementById('nombre').value,
      precio: document.getElementById('precio').value,
      thumbnail: document.getElementById('url').value
    };
    socket.emit('new-product', producto);
    document.getElementById('nombre').value = ''
    document.getElementById('precio').value = ''
    document.getElementById('url').value = ''
    return false;
  }

socket.on('messages', function (data) {
    render1(data);
});

socket.on('productos', function (data) {
    render2(data);
});

