//TIENDA VIRTUAL DE SANDWICHES DE MIGA

let cantidadPedido = 0;
let valorTotal;
let listaDePrecios = [];

document.addEventListener("DOMContentLoaded",() => {
    const obtenerProductos = fetch("./productosTienda.json");
    obtenerProductos
        .then((res)=>res.json())
        .then((res) => {
            //ACCEDO AL STRING PRODUCTOS DENTRO DE productosTienda.json
            const listaDePrecios = res.productos ;
            //PARA CADA PRODUCTO , CREO UNA TARJETA DE PRODUCTO DENTRO DEL DIV PREVIO
            listaDePrecios.forEach((elemento) => {
                const tarjetaProducto = document.createElement("div");
                tarjetaProducto.innerHTML = ` 
                <ul>
                    <li><img src="${elemento.imagenUrl}"></li>
                    <li><h2>${elemento.nombre}</h2></li>
                    <li><h2>$${elemento.precio}</h2></li>
                    <li><button onclick="quitarDelCarrito(${elemento.id},${elemento.precio},'${elemento.nombre}')">-</button><button onclick="agregarAlCarrito(${elemento.id},${elemento.precio},'${elemento.nombre}','${elemento.imagenUrl}')" >+</button></li>
                </ul>`;
                tarjetaProducto.className = "tarjetaDelProducto";
                divTarjetas.appendChild(tarjetaProducto);
            });
        });
});


//CREO ELEMENTO DIV DENTRO DEL BODY
const divTarjetas = document.createElement("div");
divTarjetas.className = "seccionTarjetas";
document.body.append(divTarjetas);

//pedido hace referencia al localStorage de la clave "clavePedido"
let pedido = JSON.parse(localStorage.getItem("clavePedido")) || [];


//SUMAR AL PEDIDO (a traves del Onclick del +  "SI EL ARTICULO NO ESTA EN EL PEDIDO se da de ALTA")
const agregarAlCarrito = (idDelProducto,precioDelProducto,nombreDelProducto,urlDeImagen) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido){
        productoExisteDentroPedido.cantidad +=1;
        productoExisteDentroPedido.precio += precioDelProducto;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
        Swal.fire({
            icon: "success",
            title: `Se agregó 1x ${nombreDelProducto} a la orden`,
            showConfirmButton: false,
            timer: 1000
        });
    }else{
        pedidoCompleto = {
            id:idDelProducto, 
            nombre:nombreDelProducto,
            cantidad:1,
            precio:precioDelProducto,
            imagenUrl:urlDeImagen
        };
        pedido.push(pedidoCompleto); 
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
        Swal.fire({
            icon: "success",
            title: `Se agregó 1x ${nombreDelProducto} a la orden`,
            showConfirmButton: false,
            timer: 1000
        });
    }
}

//RESTAR AL PEDIDO (a traves del Onclick del -  "SI EL ARTICULO NO ESTA EN EL PEDIDO (no se resta)")
const quitarDelCarrito = (idDelProducto,precioDelProducto,nombreDelProducto) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido.cantidad > 1){
        productoExisteDentroPedido.cantidad -= 1;
        productoExisteDentroPedido.precio -= precioDelProducto;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
        Swal.fire({
            icon: "success",
            title: `Se quitó 1x ${nombreDelProducto} de la orden`,
            showConfirmButton: false,
            timer: 1000
        });
    }else{
        let posicionAEliminar = pedido.findIndex((elemento) => elemento.id === Number(idDelProducto));
        let arrayPostEliminacion = pedido.splice(posicionAEliminar,posicionAEliminar+1);
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
        Swal.fire({
            icon: "success",
            title: `Se quitó 1x ${nombreDelProducto} de la orden`,
            showConfirmButton: false,
            timer: 1000
        });
    }
}
