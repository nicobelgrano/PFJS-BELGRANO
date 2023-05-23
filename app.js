class Producto {
    constructor(id, titulo, material, peso, precio, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.material = material;
        this.peso = peso;
        this.precio = precio;
        this.categoria = categoria;
        // this.imagen = imagen;
    }
}

const productos = [];
// let productosCarrito = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
let botonAgregar = document.querySelectorAll(".agregar-producto");
const cantidadCarrito = document.querySelector("#cantidad-carrito")
// let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

productos.push(new Producto("ardor1", "Glow Up", "enchapado en oro", 2.2, 1900, "Aros"));
productos.push(new Producto("ardor2", "Essentials", "enchapado en oro", 2.2, 2200, "Aros"));
productos.push(new Producto("ardor3", "Doubler", "enchapado en oro", 2.2, 1800, "Aros"));
productos.push(new Producto("ardor4", "Pangea", "enchapado en oro", 2.2, 2500, "Aros"));


function cargarProductos() {

        console.log(contenedorProductos); // Agregado para verificar si se encuentra el contenedor de productos
        console.log(botonAgregar); // Agregado para verificar si se seleccionan los botones correctamente

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="card">
        <div class="img">
            <img class="img-producto" src="${producto.imagen}">
        </div>
        <div class="info-producto">
            <h4 id="NombreProducto">${producto.categoria} ${producto.titulo}</h4>
            <h5 id="precio">$${producto.precio}</h5>
            <button class="agregar-producto" id="${producto.id}">Agregar</button>
        </div>
        </div>
    `;

        contenedorProductos.append(div);
    });

    actualizarAgregar();
}

cargarProductos()

function actualizarAgregar() {
    botonAgregar = document.querySelectorAll(".agregar-producto");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosCarrito = [];
let productosCarritoLS = JSON.parse(localStorage.getItem('productosCarrito')) || [];

if (productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarCantidad();
} else {
    productosCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {

        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }

    actualizarCantidad();

    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));

    GuardarProductosLS();

}


function actualizarCantidad(){
    let cantidad = productosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    const cantidadCarrito = document.querySelector("#cantidad-carrito");
    cantidadCarrito.innerText = `Productos en carrito: ${cantidad}`;
    
    GuardarProductosLS()
}



//Guardar en Local Storage
function GuardarProductosLS() {
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}
