
class Producto {
    constructor(id, nombre, precio, cantidad) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
    }
  }
  
  const producto1 = new Producto(1, 'IntelCore-I7', 179, 1);
  const producto2 = new Producto(2, 'AmdRyzen-9', 191, 1);
  const producto3 = new Producto(3, 'IntelCore-I5', 153, 1);
  const producto4 = new Producto(4, 'AmdRyzen-5', 127, 1);
  
  const productos = [producto1, producto2, producto3, producto4];
   
  const contenedorProductos = document.getElementById('contenedorProductos');
  
  productos.forEach((producto) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
    divProducto.innerHTML = `
                            <div>
                                <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                                <div class="card-body">
                                    <h3 class="card-title"> ${producto.nombre} </h3>
                                    <p class="card-text"> ${producto.precio} USD </p>
                                    <button id="boton${producto.id}" class="btn btn-success"> Agregar al Carrito </button>
                                </div>
                            </div>`;
    contenedorProductos.appendChild(divProducto);
   
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1000
      })
    });
  });
  
  const carrito = [];
  
  const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      carrito.push(producto);
    }
    actualizarCarrito();
  };
  
  const contenedorCarrito = document.getElementById('contenedorCarrito');
  
  function actualizarCarrito() {
    let aux = '';
    carrito.forEach((producto) => {
      aux += `
        <div class="card col-xl-3 col-md-6 col-sm-12">
          <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
          <div class="card-body">
            <h3 class="card-title">${producto.nombre} <span class="cantidad">(${producto.cantidad})</span></h3>
            <p class="card-text">${producto.precio}</p>
            <button onClick="eliminarDelCarrito(${producto.id})" class="btn btn-warning">Eliminar del Carrito</button>
          </div>
        </div>
      `;
    });
  
    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
  }
  
  const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    actualizarCarrito();
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Producto quitado del carrito',
      showConfirmButton: false,
      timer: 1000
    })
  };
  
  const vaciarCarrito = document.getElementById('vaciarCarrito');
  vaciarCarrito.addEventListener('click', () => {
    Swal.fire({
      title: 'Estas por vaciar el carrito',
        text: "Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, vacialo!',
      cancelButtonText: 'No, cancelalo!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.splice(0, carrito.length);
      actualizarCarrito();  
        Swal.fire(
          'Hecho!',
          'El carrito se vacio.',
          'success'
        ) 
      } 
    }) 
  });
  
  const totalCompra = document.getElementById('totalCompra');
  
  const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    totalCompra.innerHTML = total;
  };

  const criptoYa = "https://criptoya.com/api/dolar";

  let precioDolar = document.getElementById("precioDolar");

  setInterval( () => {
    fetch(criptoYa)
     .then(response => response.json())
     .then(({blue, oficial}) => {
        precioDolar.innerHTML = `
        <h2>Precio del dolar: </h2>
        <p>DOLAR OFICIAL: ${oficial}</p>
        <p>DOLAR BLUE: ${blue}</p>
      `
    })
    .catch(error => console.error(error))
  }, 5000 )