class Producto {
    constructor(id, titulo, material, peso, precio, categoria, imagen) {
        this.id = id;
        this.titulo = titulo;
        this.material = material;
        this.peso = peso;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

const productos = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
let botonAgregar = document.querySelectorAll(".agregar-producto");
const cantidadCarrito = document.querySelector("#cantidad-carrito");
let productosCarrito = [];
let productosCarritoLS = JSON.parse(localStorage.getItem('productosCarrito')) || [];

productos.push(new Producto("ardor1", "Glow Up", "enchapado en oro", 2.2, 1900, "Aros", "../elements/ardor-glow-up.jpeg"));
productos.push(new Producto("ardor2", "Essentials", "enchapado en oro", 2.2, 2200, "Aros", "../elements/ardor-essentials.jpeg"));
productos.push(new Producto("ardor3", "Doubler", "enchapado en oro", 2.2, 1800, "Aros", "../elements/ardor-doubler.jpeg"));
productos.push(new Producto("ardor4", "Pangea", "enchapado en oro", 2.2, 2500, "Aros", "../elements/ardor-pangea.jpeg"));
productos.push(new Producto("ardor5", "Climax", "enchapado en oro", 2.2, 2350, "Aros", "../elements/ardor-climax.jpeg"));
productos.push(new Producto("ardor6", "Square", "enchapado en oro", 2.2, 1900, "Aros", "../elements/ardor-square.jpeg"));
productos.push(new Producto("ardor7", "Encore", "enchapado en oro", 2.2, 2100, "Aros", "../elements/ardor-encore.jpeg"));

document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
    traerCarritoDeLS();

    const botonVaciarCarrito = document.querySelector("#vaciarCarrito");
    botonVaciarCarrito.addEventListener("click", vaciarCarrito);

    const botonComprar = document.querySelector("#comprar");
    botonComprar.addEventListener("click", comprar);
});

function cargarProductos() {
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <div class="cardInfo">
                <div class="info-producto">
                    <div class="img">
                        <img class="img-producto" src="${producto.imagen}">
                    </div>
                    <h4 id="NombreProducto">${producto.categoria} ${producto.titulo}</h4>
                    <h5 id="precio">$${producto.precio}</h5>
                    <button class="agregar-producto btn" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarAgregar();
    actualizarCantidad();
    actualizarTotal();
}

function actualizarAgregar() {
    botonAgregar = document.querySelectorAll(".agregar-producto");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function traerCarritoDeLS() {
    if (productosCarritoLS && productosCarritoLS.length > 0) {
        productosCarritoLS.forEach((productoCarrito) => {
            const producto = productos.find((p) => p.id === productoCarrito.id);
            if (producto) {
                producto.cantidad = productoCarrito.cantidad;
                productosCarrito.push(producto);
            }
        });
    } else {
        productosCarrito = [];
    }
    actualizarCantidad();
    actualizarTotal();
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
    actualizarTotal();

    guardarProductosLS();
}

function actualizarCantidad() {
    let cantidad = productosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantidadCarrito.innerText = `Productos en carrito: ${cantidad}`;
}

function actualizarTotal() {
    let sumaTotal = productosCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    const totalCarrito = document.querySelector("#total-carrito");
    totalCarrito.innerText = `Total: ${sumaTotal}`;
}

const botonVaciarCarrito = document.querySelector("#vaciarCarrito");
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

const botonComprar = document.querySelector("#comprar");
botonComprar.addEventListener("click", comprar);

function vaciarCarrito() {
    productosCarrito = [];
    actualizarCantidad();
    actualizarTotal();
    guardarProductosLS();
}

function comprar() {
    console.log("Botón Comprar clickeado");
    alert("Compra exitosa");
    
    vaciarCarrito()
}

function guardarProductosLS() {
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}
