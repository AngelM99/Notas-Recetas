// VARIABLES GLOBALES

    let formularioUI = document.querySelector('#formulario');
    let listaRecetasUI = document.querySelector('#listaRecetas');
    let documentoUI = document.querySelector('#documentoUI');

    let arrayRecetas = [];

    // const url = 'https://api.apis.net.pe/v1/dni?numero=70931806';


// FUNCIONES

const crearItem = (camposReceta) => {
    let item = {
        tipoDoc: camposReceta.tipodocumentoUI,
        numDoc: camposReceta.numdocumentoUI,
        paciente: camposReceta.pacienteUI,
        producto: camposReceta.productoUI,
        hora: camposReceta.hourUI,
        fecha: camposReceta.dateUI,
        observacion: camposReceta.observacionUI,
        estado: false
    }

    arrayRecetas.push(item);
    
    return item;
}

const guardarLocalStorage = () => {
    localStorage.setItem('recetas', JSON.stringify(arrayRecetas));
    pintarData();
}

const pintarData = () => {
    listaRecetasUI.innerHTML = '';

    arrayRecetas = JSON.parse(localStorage.getItem('recetas'));
    
    if (arrayRecetas == null) {
        arrayRecetas = [];
    }else{
        arrayRecetas.forEach(e => {
            if (e.estado) {
                listaRecetasUI.innerHTML += `<div class="container-card sombra">
                <div class="card-image">
                    <img src="img/avatar3021.png" alt="">
                </div>
                <div class="card-detail centrar-texto">
                    <p class="no-margin bolt-weight texto-Mayuscula">${e.paciente}</p>
                    <p class="no-margin">${e.numDoc}</p>
                    <p class="no-margin">${e.producto}</p>
                    <div class="detail-horafech">
                        <p class="content-fechas no-margin">${e.fecha}</p>
                        <p class="content-fechas no-margin">${e.hora}</p>
                    </div>
                    <p class="no-margin detail-observaciones">${e.observacion}</p>
    
                </div>
                <div class="card-buttons centrar-texto">
                    <button class="button">Activo</button>
                    <button class="button">Eliminar</button>
                </div>
            </div>`;
        }else {
                listaRecetasUI.innerHTML += `<div class="container-card2 sombra">
                <div class="card-image">
                    <img src="img/avatar3021.png" alt="">
                </div>
                <div class="card-detail centrar-texto">
                    <p class="no-margin bolt-weight texto-Mayuscula">${e.paciente}</p>
                    <p class="no-margin">${e.numDoc}</p>
                    <p class="no-margin">${e.producto}</p>
                    <div class="detail-horafech">
                        <p class="content-fechas no-margin">${e.fecha}</p>
                        <p class="content-fechas no-margin">${e.hora}</p>
                    </div>
                    <p class="no-margin detail-observaciones">${e.observacion}</p>
    
                </div>
                <div class="card-buttons centrar-texto">
                    <button class="button">Activo</button>
                    <button class="button">Eliminar</button>
                </div>
            </div>`;

            }
        });
    }

}

const eliminarLocalStorage = (paciente) => {
    let indexArray = arrayRecetas.findIndex((e) => e.paciente == paciente);  //es un método de los arrays en JavaScript que devuelve el índice del primer elemento
    arrayRecetas.splice(indexArray, 1);
    guardarLocalStorage();
}

const editarColorLocalStorage = (paciente) => {
    let indexArray = arrayRecetas.findIndex((e) => e.paciente == paciente);  //es un método de los arrays en JavaScript que devuelve el índice del primer elemento
    arrayRecetas[indexArray].estado = true;
    guardarLocalStorage();

}





const horaFormat = (parant) => {
    // Obtener el elemento HTML con el tipo de entrada datetime-local
    const datetimeLocalInput = parant;

    // Obtener la fecha y hora seleccionadas por el usuario
    const selectedDate = new Date(datetimeLocalInput.value);

    // Obtener la fecha y hora en formato 12 horas
    const formattedDate = selectedDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return formattedDate;
}

const dateFormat = (parant) => {
    // Obtener el elemento HTML con el tipo de entrada datetime-local
    const datetimeLocalInput = parant;

    // Obtener la fecha seleccionada por el usuario
    const selectedDate = new Date(datetimeLocalInput.value);

    // Obtener la fecha en formato DD-MM-AAAA
    const formattedDate = selectedDate.getDate().toString().padStart(2, '0') + '-' + (selectedDate.getMonth() + 1).toString().padStart(2, '0') + '-' + selectedDate.getFullYear();

    return formattedDate;
}

const desabilitarInputs = (valueDocument) => {
    let documentoInput = document.querySelector('#numeroDocument');
    if (valueDocument == 'Ran') {
        documentoInput.disabled = true;
        documentoInput.placeholder = '';
        documentoInput.value = "";
    }else{
        documentoInput.disabled = false;
        documentoInput.placeholder = 'Ingrese su N° DNI';
        documentoInput.addEventListener('dblclick', () => {
            let numeroDocumento = (documentoInput.value == '') ? console.error('Ingrese Documento') : documentoInput.value;
            consultaDocumento(numeroDocumento);
        })
    }
}

const consultaDocumento = (parant) => {
    if (parant == undefined) {
        return;
    }else{
        console.log(object);
    }

}

const guardarAlert = () => {
    Swal.fire({
        icon: 'success',
        title: 'Se ha registrado con éxito',
    })
}

const errorValidar = () => {
    Swal.fire({
        icon: 'error',
        title: 'Completar los campos...',
    })
}

const confirmarEliminar = (parant) => {
    Swal.fire({
        title: '¿Está seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminado!',
            'Su archivo ha sido eliminado.',
            'success'
          )
          eliminarLocalStorage(parant);
        }
      })
}

const confirmarActivo = (parant) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ha sido activado con éxito',
        showConfirmButton: false,
        timer: 1500
    })
    editarColorLocalStorage(parant);
}

// EVENTOS

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();

    let datetimeLocalInput = document.getElementById("dateHour");
    let validardatetimeLocalInput = document.getElementById("dateHour").value;
    let numdocumento = document.querySelector('#numeroDocument').value;
    let observacionValue = document.querySelector('#observacion').value;
    
    let tipodocumentoUI = document.querySelector('#documentoUI').value;
    let numdocumentoUI =  (numdocumento == "" ) ? Math.random().toString().substring(2, 10) : numdocumento;
    let pacienteUI = document.querySelector('#paciente').value;
    let productoUI = document.querySelector('#producto').value;
    let hourUI = horaFormat(datetimeLocalInput);
    let dateUI = dateFormat(datetimeLocalInput);
    let observacionUI = (observacionValue == '') ? 'No hay observaciones' : observacionValue;

    if ([pacienteUI, productoUI, datetimeLocalInput, validardatetimeLocalInput].includes('')) {
        errorValidar();
        return;
    }

    if (tipodocumentoUI == 'Dni' && numdocumento == '') {
        errorValidar(); 
        return;
    }
    

    let camposReceta = {
        tipodocumentoUI,
        numdocumentoUI,
        pacienteUI,
        productoUI,
        hourUI,
        dateUI,
        observacionUI
    }
    
    crearItem(camposReceta);

    guardarLocalStorage();
    guardarAlert();

    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    pintarData();
})

documentoUI.addEventListener('change', () => {
    let valueDocument = documentoUI.value;
    desabilitarInputs(valueDocument);
})


listaRecetasUI.addEventListener('click', (e) => {
    e.preventDefault();
    
    const accion = e.target.innerHTML;
    if (['Editar','Activo','Eliminar'].includes(accion)) {
        let pacienteTexto = e.target.offsetParent.childNodes[3].childNodes[1].innerHTML;
        
        if (accion == 'Eliminar') {
            confirmarEliminar(pacienteTexto);
        }
        
        if (accion == 'Activo') {
            confirmarActivo(pacienteTexto);
        }
        
        
    }

})