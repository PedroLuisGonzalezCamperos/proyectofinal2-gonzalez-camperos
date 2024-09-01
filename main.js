//Esta parte acontinuación del código sería l aaplicación de fetch

function mostrarLista () {

let url = 'https://jsonplaceholder.typicode.com/users/';
fetch(url)
    .then( response => response.json() )
    .then( data => mostrarData(data) )
    .catch( error => console.log(error) )


    const mostrarData = (data) => {
        console.log(data)
        let body = ""
        for (let i = 0; i < data.length; i++) {      
           body+=`<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`
        }
        document.getElementById('data').innerHTML = body

       
        //console.log(body)
    }

}

function eliminarLista() {

    document.getElementById('data').innerHTML = "";



}




//Este códico a continuación representa un inventario en el cual el usuario podrá armarlo desde cero y crear el inventario que desee, temdrá la opción de agregar productos con sus cantidades y precios y tendrá también la opción de guardar los inventarios creados, buscar inventarios creados previamente en la web y también tendrá la opción de eliminarlos.


//Esta función agregarProducto() es la que va colocando los rpoductos en la tabla de inventario
function agregarProducto() {
    let nombreP = document.getElementById("nombreProducto").value;
    let cantidadP = document.getElementById("cantidadProducto").value;
    let precioP = document.getElementById("precioProducto").value;

    if (nombreP === "" || cantidadP === "" || precioP === "") {

        Swal.fire("Debes llenar todos los espacios!");
     
    } else {
        document.getElementById("alerta1").textContent = "";
        //insertando fila

        let nFilas = document.getElementsByTagName("tr"); //será una coleccion de etiquetas tr
        let ultimaFila = document
            .getElementById("tablaInventario")
            .insertRow(nFilas.length - 1);
        let col1 = ultimaFila.insertCell(0);
        let col2 = ultimaFila.insertCell(1);
        let col3 = ultimaFila.insertCell(2);
        col1.innerHTML = nombreP;
        col2.innerHTML = cantidadP;
        col3.innerHTML = precioP;

        //reiniciar valores en los input

        document.getElementById("nombreProducto").value = "";
        document.getElementById("cantidadProducto").value = "";
        document.getElementById("precioProducto").value = "";
    }
}


//la función extraerDatos() crea un arreglo de objetos, donde cada objeto representa un producto del inventario
function extraerDatos() {
    // Seleccionar la tabla
    const tabla = document.getElementById("tablaInventario");
    const filas = tabla
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

    // Crear un array para guardar los productos
    let productos = [];

    // Recorrer cada fila y extraer los datos
    for (let i = 0; i < filas.length - 1; i++) {
        let celdas = filas[i].getElementsByTagName("td");

        let producto = {
            nombre: celdas[0].textContent,
            precio: celdas[1].textContent,
            disponibilidad: celdas[2].textContent,
        };

        // Agregar el producto al array
        productos.push(producto);
    }

    //EL local storage guarda string no objetos, para guardar objetos se utiliza JSON

    const inventario = document.getElementById("llaves");

    const inventarioF = inventario.value.trim();

    if (inventarioF === "") {
        Swal.fire("Debes ingresar el nombre!");
        return;
    }

    if (localStorage.getItem(inventarioF)) {
        document.getElementById("llaves").value = "";
        Swal.fire({
            icon: "error",
            title: "Ese nombre ya existe debes usar otro",
            
            
          });


       
    } else {
        localStorage.setItem(inventarioF, JSON.stringify(productos));

        Swal.fire({
            position: "center",
            icon: "success",
            title: inventarioF + " Se guardo en el navegador",
            showConfirmButton: false,
            timer: 2500
          });

       
    }

    
}




//La función buscandoInventario() indica según el nombre si el inventario solicitado existe y en este caso lo muestra como un string y en caso contrario indica que no existe.
function buscandoInventario() {
    let buscador = document.getElementById("buscador").value;

    if (localStorage.getItem(buscador)) {

        document.getElementById("alerta3").innerText = buscador + '  contiene los siguientes productos:\n\n ' + localStorage.getItem(buscador);
        
    } else {
        document.getElementById("buscador").value = "";
        Swal.fire({
            icon: "error",
            title: "El nombre no coincide con ningún inventario",
            
            
          });

    
    }

    if (buscador === "") {

        Swal.fire("Debes ingresar el nombre!");

       
    }


    
}

function eliminarInventario() {
    let eliminador = document.getElementById("eliminador").value;

    if (localStorage.getItem(eliminador)) {
        localStorage.removeItem(eliminador);


        Swal.fire({
            position: "center",
            icon: "success",
            title: eliminador + " Se eliminó del navegador",
            showConfirmButton: false,
            timer: 2500
          });

        
    } else {

document.getElementById("eliminador").value = "";

        Swal.fire({
            icon: "error",
            title: "El nombre no coincide con ningún inventario guardado en el navegador",
            
            
          });

    }

    if (eliminador === "") {
        Swal.fire("Debes ingresar el nombre!");
    }
}

function eliminarUltimaFila() {
    let table = document.getElementsByTagName("tbody")[0]; //Importante el [0] indica cual tbody en específico se modificará
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 2);
    }
}


//Aquí se aplicaría fetch

