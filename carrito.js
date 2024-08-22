
//TRAIGO LOS PRODUCTOS AL CARRITO

pedidoMuestraCarrito = JSON.parse(localStorage.getItem("clavePedido")) || [];

//CREO ELEMENTO DIV DENTRO DEL BODY
const divItemsPedido = document.createElement("div");
divItemsPedido.className = "itemsDelCarrito";
document.body.append(divItemsPedido);


//MUESTRO EL PEDIDO ITEM POR ITEM Y TRAIGO LA SUMA DEL PRECIO TOTAL
let subtotal = 0;
pedidoMuestraCarrito.forEach((elemento) => {
    const pedidoCarrito = document.createElement("div");
    pedidoCarrito.innerHTML = `
    
        <p><img src="${elemento.imagenUrl}"></p><p>${elemento.cantidad}x</p><p>${elemento.nombre}</p><p>$${elemento.precio}</p><p><button onclick="quitarDelCarrito(${elemento.id},${elemento.precio})">-</button><button onclick="agregarAlCarrito(${elemento.id},${elemento.precio},'${elemento.nombre}')" >+</button></p>
        
    `;
    pedidoCarrito.className = "itemsDentroDelCarrito";
    subtotal += Number(elemento.precio) ;
    divItemsPedido.appendChild(pedidoCarrito);
});
console.log(subtotal);

//pedido hace referencia al localStorage de la clave "clavePedido"
let pedido = JSON.parse(localStorage.getItem("clavePedido")) || [];

//RESTAR AL PEDIDO (a traves del Onclick del -  "SI EL ARTICULO NO ESTA EN EL PEDIDO (no se resta)")
const quitarDelCarrito = (idDelProducto) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido.cantidad > 1){
        productoExisteDentroPedido.precio -= (productoExisteDentroPedido.precio/productoExisteDentroPedido.cantidad);
        productoExisteDentroPedido.cantidad -= 1;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
        location.reload();
    }else{
        Swal.fire({
            title: "Desea eliminar el artículo del carrito?",
            showDenyButton:true,
            confirmButtonText: "Eliminar",
            denyButtonText:"Volver atras"
          }).then((result) => {
            //EN BASE A LO QUE DEVUELVE LA PROMESA , ELIMINO EL ARTÍCULO DEL CARRITO
            if (result.isConfirmed) {
                let posicionAEliminar = pedido.findIndex((elemento) => elemento.id === Number(idDelProducto));
                let arrayPostEliminacion = pedido.splice(posicionAEliminar,posicionAEliminar+1);
                localStorage.setItem("clavePedido", JSON.stringify(pedido));
                location.reload();
            }
        });
    }
}

//SUMAR AL PEDIDO (a traves del Onclick del +)
const agregarAlCarrito = (idDelProducto) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido){
        productoExisteDentroPedido.precio += (productoExisteDentroPedido.precio/productoExisteDentroPedido.cantidad);
        productoExisteDentroPedido.cantidad +=1;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));        
        location.reload();
    }
}

//DESCUENTO PROMOCIONAL (funcion)
let descuentoPromo = ()=> {return subtotal-((subtotal * 10) / 100);};


//RESUMEN DEL PEDIDO QUE REALIZÁ EL CLIENTE
if(pedido.length > 0){
    const pedidoResumen = document.createElement("div");
    let textoResumen;
    //APLICAR DESCUENTO SI PASA EL VALOR
    subtotal > 10000 ? textoResumen = `<p>El precio de su pedido es : $${valorConPromo = descuentoPromo (subtotal)} (con valor promocional aplicado "-10%")</p>` : textoResumen = `<p>El precio de su pedido es : $${subtotal}</p>`;
    //SUGERIR GUSTO MÁS PEDIDO SI NO ESTA DENTRO DEL PEDIDO
    function gustoMaspedido(gusto){
        return gusto.nombre === "Jamón y Queso";
    }
    pedido.find(gustoMaspedido) === undefined ? textoResumen += `<p>Le recomendamos incluir el gusto más pedido del mes -Jamón y Queso- dentro de su pedido </p>`: textoResumen += `<p>Su pedido incluye el gusto más pedido del mes - Jamón y Queso</p>`;
    pedidoResumen.innerHTML = textoResumen;
    pedidoResumen.className = "resumenCarrito";
    divItemsPedido.appendChild(pedidoResumen);
    
}else{
    const pedidoResumen = document.createElement("div");
    let textoResumen = `<p>Su carrito se encuentra vacío , agregue articulos para visualizarlos aqui </p>`;
    pedidoResumen.innerHTML = textoResumen;
    pedidoResumen.className = "resumenCarrito";
    divItemsPedido.appendChild(pedidoResumen);
}
