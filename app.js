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
let botonEliminar = document.querySelectorAll(".eliminar-producto")
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
                
                <div class="imagen">
                    <img class="img-producto" src="${producto.imagen}">
                </div>

                <div class="info-producto">
                    <h4 id="NombreProducto">${producto.categoria} ${producto.titulo}</h4>
                    <h5 id="precio">$${producto.precio}</h5>
                </div>    
                    <div class="botones">
                        <button class="agregar-producto btn" id="${producto.id}">Agregar</button>
                        <button class="eliminar-producto btn" id="eliminar-${producto.id}">Eliminar</button>
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
        boton.addEventListener("click", agregarAlCarrito)
    });

    const botonEliminar = document.querySelectorAll(".eliminar-producto");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
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
        const copiaProductoAgregado = Object.assign({}, productoAgregado); // Otra opción: const copiaProductoAgregado = { ...productoAgregado };
        copiaProductoAgregado.cantidad = 1;
        productosCarrito.push(copiaProductoAgregado);
    }

    actualizarCantidad();
    actualizarTotal();

    guardarProductosLS();

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "#01a40196",
        }
        
        }).showToast();
    };

function actualizarEliminar() {
    botonEliminar = document.querySelectorAll(".eliminar-producto");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const botonEliminar = e.currentTarget;
    const idProducto = botonEliminar.id.split("-")[1]; // Extraer el ID del producto del ID del botón

    const index = productosCarrito.findIndex(producto => producto.id === idProducto);

    if (index !== -1) {
        productosCarrito[index].cantidad--;
        if (productosCarrito[index].cantidad === 0) {
            productosCarrito.splice(index, 1);
        }
    }

    actualizarCantidad();
    actualizarTotal();
    guardarProductosLS();

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "#ae000097",
        }
        }).showToast();
}



function actualizarCantidad() {
    let cantidad = productosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantidadCarrito.innerText = `Productos en carrito: ${cantidad}`;
}

let totalCarrito = 0;

function actualizarTotal() {
    totalCarrito = productosCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    const sumaTotal = document.querySelector("#total-carrito");
    sumaTotal.innerText = `Total: ${totalCarrito}`;
}

const botonVaciarCarrito = document.querySelector("#vaciarCarrito");


const botonComprar = document.querySelector("#comprar");
botonComprar.addEventListener("click", comprar);

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se vaciará el carrito de compras",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito = [];
            actualizarCantidad();
            actualizarTotal();
            actualizarEliminar();
            guardarProductosLS();
            Swal.fire(
                'Carrito vacio',
                'Tus productos se han eliminado del carrito.',
                'success'
            );
        }
    });
}

function comprar() {
    Swal.fire({
        title: 'Esta seguro que desea finalizar la compra?',
        text: `El total es de: ${totalCarrito}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra exitosa!',
            );
            productosCarrito = [];
            actualizarCantidad();
            actualizarTotal();
            actualizarEliminar();
            guardarProductosLS();
        }
    });

}

function guardarProductosLS() {
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}


