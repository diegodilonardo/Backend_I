const socket = io()

const contenedorProductosRTP = document.querySelector('.products-container-rtp')

socket.on('realtime', (data)=>{
    contenedorProductosRTP.innerHTML = ''
    data.forEach(product => {
        const div = document.createElement('div')
        div.classList.add(`${product.id}`,'cart')

        const id = document.createElement('p')
        id.innerText = 'ID: ' + product.id
        const nombre = document.createElement('p')
        nombre.innerText = 'Nombre producto:' + product.nombre
        const descripcion = document.createElement('p')
        descripcion.innerText = product.descripcion
        const codigo = document.createElement('p')
        codigo.innerText = 'Codigo: ' + product.codigo
        const colorprod = document.createElement('p')
        colorprod.innerText = 'Color: ' + product.colorprod
        const talle = document.createElement('p')
        talle.innerText = 'Talle: ' + product.talle
        const precio = document.createElement('p')
        precio.innerText = '$ ' + product.precio
        const stock = document.createElement('p')
        stock.innerText = 'Unidades Stk: ' + product.stock
        const categoria = document.createElement('p')
        categoria.innerText = 'Categoria: ' + product.categoria

        div.appendChild(id)
        div.appendChild(nombre)
        div.appendChild(descripcion)
        div.appendChild(codigo)
        div.appendChild(colorprod)
        div.appendChild(talle)
        div.appendChild(precio)
        div.appendChild(stock)
        div.appendChild(categoria)
        contenedorProductosRTP.appendChild(div)
    });
})

const addProduct = ()=>{

    console.log("Alta producto")
    
    const nombre = document.querySelector('#alta-nombre').value
    const descripcion = document.querySelector('#alta-descripcion').value
    const codigo = document.querySelector('#alta-codigo').value
    const colorprod = document.querySelector('#alta-colorprod').value
    const talle = document.querySelector('#alta-talle').value
    const precio = document.querySelector('#alta-precio').value
    const stock = document.querySelector('#alta-stock').value
    const categoria = document.querySelector('#alta-categoria').value

    const info = {nombre,descripcion,codigo,colorprod,talle,precio,stock,categoria}
    socket.emit("nuevo-producto", info)

    document.querySelector('#alta-nombre').value = ""
    document.querySelector('#alta-descripcion').value = ""
    document.querySelector('#alta-codigo').value = ""
    document.querySelector('#alta-colorprod').value = ""
    document.querySelector('#alta-talle').value = ""
    document.querySelector('#alta-precio').value = ""
    document.querySelector('#alta-stock').value = ""
    document.querySelector('#alta-categoria').value = ""
    
    
}
document.querySelector('#button-add').addEventListener('click', ()=> {
    addProduct()
})

document.querySelector('#button-update').addEventListener('click', () => {
    const id = document.querySelector('#modificar-id').value
    updateProduct(id)
})
const updateProduct = ()=>{
    console.log("Modificar Producto")

    const nombre = document.querySelector('#alta-nombre').value
    const descripcion = document.querySelector('#alta-descripcion').value
    const codigo = document.querySelector('#alta-codigo').value
    const colorprod = document.querySelector('#alta-colorprod').value
    const talle = document.querySelector('#alta-talle').value
    const precio = document.querySelector('#alta-precio').value
    const stock = document.querySelector('#alta-stock').value
    const categoria = document.querySelector('#alta-categoria').value

    const info = {nombre,descripcion,codigo,colorprod,talle,precio,stock,categoria}
    socket.emit("modificar-producto", info)
}

document.querySelector('#button-delete').addEventListener('click', () => {
    const id = document.querySelector('#delete-id').value
    deleteProduct(id)
})
const deleteProduct = (id)=>{
    socket.emit('delete-product', id)
}
