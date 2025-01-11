const socket = io()

const contenedorProductos = document.querySelector('.products-container')

socket.on('home', (data)=>{
    contenedorProductos.innerHTML = ''
    data.forEach(product => {
        const div = document.createElement('div')
        div.classList.add(`${product.id}`,'cart')

        const nombre = document.createElement('p')
        nombre.innerText = product.nombre
        const descripcion = document.createElement('p')
        descripcion.innerText = product.descripcion
        const precio = document.createElement('p')
        precio.innerText = '$ ' + product.precio
        
        div.appendChild(nombre)
        div.appendChild(descripcion)
        div.appendChild(precio)
        contenedorProductos.appendChild(div)
    });
} )