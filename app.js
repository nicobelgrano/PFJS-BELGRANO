class Producto {
    constructor(codigo, titulo, material, peso, precio, categoria, imagen) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.material = material;
        this.peso = peso;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

const productos = [];
const productosCarrito = [];

productos.push(new Producto("ardor1", "Glow Up", "enchapado en oro", 2.2, 1900, "Aros"));
productos.push(new Producto("ardor2", "Essentials", "enchapado en oro", 2.2, 2200, "Aros"));
productos.push(new Producto("ardor3", "Doubler", "enchapado en oro", 2.2, 1800, "Aros"));
productos.push(new Producto("ardor4", "Pangea", "enchapado en oro", 2.2, 2500, "Aros"));

const contenedorProductos = document.getElementById("contenedor-productos");

function cargarProductos() {
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="card">
        <div class="img">
            <img class="img-producto" src="${producto.imagen}">
        </div>
        <div>
            <h4 id="NombreProducto">${producto.categoria} ${producto.titulo}</h4>
            <h5 id="precio">${producto.precio}</h5>
            <button class="agregar-producto" id="${producto.codigo}">Agregar</button>
        </div>
        </div>
    `;

        contenedorProductos.append(div);
    });
    
    productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

    actualizarAgregar();
}

cargarProductos();

function actualizarAgregar() {
    const botonAgregar = document.querySelectorAll(".agregar-producto");
    botonAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find((producto) => producto.codigo === idBoton);
    productosCarrito.push(productoAgregado);

    GuardarProductosLS()
}

function GuardarProductosLS() {
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
}



// 1 - Mostrar todos los productos
// function mostrarProductos() {
//     productos.forEach((producto) => {
//         console.log(
//             "Código del producto: " + producto.codigo +
//             "\nNombre: " + producto.articulo +
//             "\nMaterial: " + producto.material +
//             "\nPeso: " + producto.peso +
//             "gr.\nPrecio: $" + producto.precio);
//     });
//     mostrarMenu();
// }


// 2 - Filtrar productos por material
// function filtrarMaterial() {
//     const inputFiltroMaterial = prompt(
//         "Ingrese el material que desea buscar, pueden ser:\n" +
//         "Plata 925\n" +
//         "Enchapado en oro\n" +
//         "Laminado en plata\n")
//     const productosFiltrados = productos.filter((producto) => producto.material.toLowerCase() === inputFiltroMaterial.toLowerCase());

//     if (productosFiltrados.length === 0) {
//         console.log("No se encontraron productos con ese material")
//     } else {
//         console.log("Productos encontrados:")
//         productosFiltrados.forEach((producto) => {
//             console.log(
//                 "Código del producto: " + producto.codigo +
//                 "\nNombre: " + producto.articulo +
//                 "\nMaterial: " + producto.material +
//                 "\nPeso: " + producto.peso +
//                 "gr.\nPrecio: $" + producto.precio);
//         });
//     }

//     mostrarMenu();
// }


// 3 - Buscar producto por nombre"
// function buscarPorNombre() {
//     const inputBusqueda = prompt("Ingrese el producto que desea buscar");
//     const productosEncontrados = productos.filter((producto) => producto.articulo.toLowerCase() === inputBusqueda.toLowerCase());

//     if (productosEncontrados.length === 0) {
//         console.log("No se encontraron productos con ese nombre")
//     } else {
//         productosEncontrados.forEach((producto) => {
//             console.log("Productos encontrados:\n" +
//                 "Nombre: " + producto.articulo +
//                 "\nMaterial: " + producto.material +
//                 "\nPeso: " + producto.peso +
//                 "gr.\nPrecio: $" + producto.precio);
//         });
//     }

//     mostrarMenu();
// }


// 4 - Buscar por codigo

// function buscarPorCodigo() {
//     const inputCodigo = prompt("Ingrese el codigo del producto que desea buscar");
//     const productoEncontrado = productos.find((producto) => producto.codigo.toLowerCase() === inputCodigo.toLowerCase());

//     if (productoEncontrado) {
//         console.log("Producto encontrado:\n" +
//             "Codigo: " + productoEncontrado.codigo +
//             "\nArticulo: " + productoEncontrado.articulo +
//             "\nMaterial: " + productoEncontrado.material +
//             "\nPeso: " + productoEncontrado.peso +
//             "\nPrecio: " + productoEncontrado.precio);

//     } else {
//         console.log("Producto no encontrado.")
//     };

//     mostrarMenu();
// }


// 5 - Agregar un producto al carrito

// function agregarAlCarrito() {
//     const codigoAgregar = prompt("Ingrese el código del producto que desea agregar al carrito");
//     const productoAgregado = productos.find(producto => producto.codigo.toLowerCase() === codigoAgregar.toLowerCase());

//     if (productoAgregado) {
//         productosCarrito.push(productoAgregado);
//         console.log("El producto " + productoAgregado.codigo + " se agregó al carrito.");
//     } else {
//         console.log("El código: " + codigoAgregar + " no fue encontrado.");
//     }

//     agregarOtro = prompt("Desea agregar otro producto al carrito?\n Si / No").toLowerCase();
//     if (agregarOtro == "si") {
//         agregarAlCarrito()
//     } else {
//         mostrarMenu();
//     }
// }


// 5 - Eliminar un producto del carrito

// function eliminarDelCarrito() {
//     const codigoEliminar = prompt("Ingrese el codigo del producto que desea eliminar del carrito");

//     const productoEliminado = productosCarrito.find(producto => producto.codigo.toLowerCase() === codigoEliminar.toLowerCase());

//     if (productoEliminado) {
//         const index = productosCarrito.indexOf(productoEliminado);
//         productosCarrito.splice(index, 1);
//         console.log("El producto " + productoEliminado.codigo + " se eliminó del carrito.");
//     } else {
//         console.log("No se encontró ningún producto con ese codigo en el carrito.");
//     }

//     eliminarOtro = prompt("Desea eliminar otro producto al carrito?\n Si / No").toLowerCase();
//     if (eliminarOtro == "si") {
//         eliminarDelCarrito()
//     } else {
//         mostrarMenu();
//     }
// }


// Mostrar ticket total

// function verCarrito() {
//     let total = 0;
//     console.log("Productos en el carrito:");
//     productosCarrito.forEach((producto) => {
//         console.log(producto.codigo + producto.articulo + "\n" + producto.material + "\n" + producto.peso + "gr." + "\n$" + producto.precio);
//         total = total + producto.precio;
//     });
//     console.log("Total: $" + total);

//     seguirComprando = prompt("Desea seguir comprando?\n Si / No").toLowerCase();
//     if (seguirComprando == "si") {
//         mostrarMenu()
//     } else {
//         alert("Gracias por su compra!");
//     }
// }
