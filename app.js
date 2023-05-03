class Producto {
    constructor(codigo, articulo, material, peso, precio) {
        this.codigo = codigo;
        this.articulo = articulo;
        this.material = material;
        this.peso = peso;
        this.precio = precio;
    }
}

// **** No se como integrar esta calculadora del precio ****
// let valor;
// const ganancia = 1.6;

//     switch (producto.material){
//         case "plata 925":
//             valor = 1.5;
//             break;

//         case "enchapado en oro":
//             valor = 0.4;
//             break;

//         case "laminado en plata":
//             valor = 0.35;
//             break;
//     }


//     precio = (producto.peso * valor * ganancia).toFixed(2);

const productos = [];

const productosCarrito = [];

productos.push(new Producto("capl001", "cadena", "plata 925", 2.2, 5));
productos.push(new Producto("anpl001", "anillo", "plata 925", 1.5, 5));
productos.push(new Producto("pupl001", "pulsera", "plata 925", 3.7, 5));
productos.push(new Producto("arpl001", "aros", "plata 925", 3.2, 5));
productos.push(new Producto("dipl001", "dije", "plata 925", 2.7, 5));
productos.push(new Producto("cador001", "cadena", "enchapado en oro", 3.2, 5));
productos.push(new Producto("andor001", "anillo", "enchapado en oro", 1, 5));
productos.push(new Producto("pudor001", "pulsera", "enchapado en oro", 2.8, 5));
productos.push(new Producto("ardor001", "aros", "enchapado en oro", 6.2, 5));
productos.push(new Producto("didor001", "dije", "enchapado en oro", 0.9, 5));
productos.push(new Producto("calp001", "cadena", "laminado en plata", 1.8, 5));
productos.push(new Producto("anlp001", "anillo", "laminado en plata", 2.4, 5));
productos.push(new Producto("pulp001", "pulsera", "laminado en plata", 3.5, 5));
productos.push(new Producto("arlp001", "aros", "laminado en plata", 5.1, 5));
productos.push(new Producto("dilp001", "dije", "laminado en plata", 1.7, 5));


mostrarMenu()


function mostrarMenu() {
    const menu = prompt(
        "Bienvenidx al carrito de compras\n" +
        "Menú\n" +
        "1 - Mostrar todos los productos\n" +
        "2 - Filtrar productos por material\n" +
        "3 - Buscar producto por nombre\n" +
        "4 - Buscar producto por código\n" +
        "5 - Agregar un producto al carrito\n" +
        "6 - Eliminar un producto del carrito\n" +
        "7 - Ver carrito de compras\n" +
        "8 - Salir\n"
    );


    switch (menu) {
        case "1":
            mostrarProductos();
            break;
        case "2":
            filtrarMaterial();
            break;
        case "3":
            buscarPorNombre();
            break;
        case "4":
            buscarPorCodigo();
        case "5":
            agregarAlCarrito();
            break;
        case "6":
            eliminarDelCarrito();
            break;
        case "7":
            verCarrito();
            break;
        case "8":
            alert("Gracias por su compra!");
            break;
        default:
            alert("Opción inválida, por favor ingrese una opción del 1 al 8");
            mostrarMenu();
    }
}


//1 - Mostrar todos los productos
function mostrarProductos() {
    productos.forEach((producto) => {
        console.log(
            "Código del producto: " + producto.codigo +
            "\nNombre: " + producto.articulo +
            "\nMaterial: " + producto.material +
            "\nPeso: " + producto.peso +
            "gr.\nPrecio: $" + producto.precio);
    });
    mostrarMenu();
}


//2 - Filtrar productos por material
function filtrarMaterial() {
    const inputFiltroMaterial = prompt(
        "Ingrese el material que desea buscar, pueden ser:\n" +
        "Plata 925\n" +
        "Enchapado en oro\n" +
        "Laminado en plata\n")
    const productosFiltrados = productos.filter((producto) => producto.material.toLowerCase() === inputFiltroMaterial.toLowerCase());

    if (productosFiltrados.length === 0) {
        console.log("No se encontraron productos con ese material")
    } else {
        console.log("Productos encontrados:")
        productosFiltrados.forEach((producto) => {
            console.log(
                "Código del producto: " + producto.codigo +
                "\nNombre: " + producto.articulo +
                "\nMaterial: " + producto.material +
                "\nPeso: " + producto.peso +
                "gr.\nPrecio: $" + producto.precio);
        });
    }

    mostrarMenu();
}


//3 - Buscar producto por nombre"
function buscarPorNombre() {
    const inputBusqueda = prompt("Ingrese el producto que desea buscar");
    const productosEncontrados = productos.filter((producto) => producto.articulo.toLowerCase() === inputBusqueda.toLowerCase());

    if (productosEncontrados.length === 0) {
        console.log("No se encontraron productos con ese nombre")
    } else {
        productosEncontrados.forEach((producto) => {
            console.log("Productos encontrados:\n" +
                "Nombre: " + producto.articulo +
                "\nMaterial: " + producto.material +
                "\nPeso: " + producto.peso +
                "gr.\nPrecio: $" + producto.precio);
        });
    }

    mostrarMenu();
}


//4 - Buscar por codigo

function buscarPorCodigo() {
    const inputCodigo = prompt("Ingrese el codigo del producto que desea buscar");
    const productoEncontrado = productos.find((producto) => producto.codigo.toLowerCase() === inputCodigo.toLowerCase());

    if (productoEncontrado) {
        console.log("Producto encontrado:\n" +
            "Codigo: " + productoEncontrado.codigo +
            "\nArticulo: " + productoEncontrado.articulo +
            "\nMaterial: " + productoEncontrado.material +
            "\nPeso: " + productoEncontrado.peso +
            "\nPrecio: " + productoEncontrado.precio);

    } else {
        console.log("Producto no encontrado.")
    };

    mostrarMenu();
}


//5 - Agregar un producto al carrito

function agregarAlCarrito() {
    const codigoAgregar = prompt("Ingrese el código del producto que desea agregar al carrito");
    const productoAgregado = productos.find(producto => producto.codigo.toLowerCase() === codigoAgregar.toLowerCase());

    if (productoAgregado) {
        productosCarrito.push(productoAgregado);
        console.log("El producto " + productoAgregado.codigo + " se agregó al carrito.");
    } else {
        console.log("El código: " + codigoAgregar + " no fue encontrado.");
    }

    agregarOtro = prompt("Desea agregar otro producto al carrito?\n Si / No").toLowerCase();
    if (agregarOtro == "si") {
        agregarAlCarrito()
    } else {
        mostrarMenu();
    }
}


    //5 - Eliminar un producto del carrito

    function eliminarDelCarrito() {
        const codigoEliminar = prompt("Ingrese el codigo del producto que desea eliminar del carrito");

        const productoEliminado = productosCarrito.find(producto => producto.codigo.toLowerCase() === codigoEliminar.toLowerCase());

        if (productoEliminado) {
            const index = productosCarrito.indexOf(productoEliminado);
            productosCarrito.splice(index, 1);
            console.log("El producto " + productoEliminado.codigo + " se eliminó del carrito.");
        } else {
            console.log("No se encontró ningún producto con ese codigo en el carrito.");
        }

        eliminarOtro = prompt("Desea eliminar otro producto al carrito?\n Si / No").toLowerCase();
        if (eliminarOtro == "si") {
            eliminarDelCarrito()
        } else {
            mostrarMenu();
        }
    }


    //Mostrar ticket total

    function verCarrito() {
        let total = 0;
        console.log("Productos en el carrito:");
        productosCarrito.forEach((producto) => {
            console.log(producto.codigo + producto.articulo + "\n" + producto.material + "\n" + producto.peso + "gr." + "\n$" + producto.precio);
            total = total + producto.precio;
        });
        console.log("Total: $" + total);

        seguirComprando = prompt("Desea seguir comprando?\n Si / No").toLowerCase();
        if (seguirComprando == "si") {
            mostrarMenu()
        } else {
            alert("Gracias por su compra!");
        }
    }
