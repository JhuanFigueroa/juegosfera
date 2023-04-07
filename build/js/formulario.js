//Variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnvar = document.querySelector('#enviar')
const btnReset=document.querySelector('#resetBtn')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formulario = document.querySelector('#enviar-mail');
eventsListeners();

function eventsListeners() {
	document.addEventListener('DOMContentLoaded', iniciarApp);

	//validar campos del formulario
	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);

	btnEnvar.addEventListener('click',enviarEmail);

	btnReset.addEventListener('click',resetForm);
}


function iniciarApp() {
	btnEnvar.disabled = true;
	btnEnvar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
	if (e.target.value.length > 0) {
		const error = document.querySelector('p.error')
		if (error) {
			error.remove()
		}
		e.target.classList.remove( 'border-red-500');
		e.target.classList.add( 'border-green-500');
	} else {
		e.target.classList.remove( 'border-green-500');
		e.target.classList.add( 'border-red-500');
		mostrarError('Todos los campos son obligatorios');
	}

	if (e.target.type == 'email') {

		if (er.test(e.target.value)) {
			const error = document.querySelector('p.error')
			if (error) {
				error.remove()
			}
			e.target.classList.remove('border', 'border-red-500');
			e.target.classList.add('border', 'border-green-500');
		} else {
			e.target.classList.remove('border', 'border-green-500');
			e.target.classList.add('border', 'border-red-500');
			mostrarError('Email no valido');
		}

	}

	//Activamos el boton de enviar cuando todos los campos esten validados
	if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
		btnEnvar.disabled = false;
		btnEnvar.classList.remove('cursor-not-allowed', 'opacity-50');
	} else {
		btnEnvar.disabled = true;
		btnEnvar.classList.add('cursor-not-allowed', 'opacity-50');
	}
}

function mostrarError(mensaje) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add('error');

	const errores = document.querySelectorAll('.error');

	if (errores.length === 0) {
		formulario.appendChild(mensajeError);
	}

}

function enviarEmail(e) {
	e.preventDefault();

	const spiner=document.querySelector('#spinner');
	spiner.style.display='flex';

	setTimeout(() => {
		spiner.style.display='none';
		//mensaje de que el mensaje se envio correctamente

		const mensaje=document.createElement('p');
		mensaje.textContent='Mensaje enviado correctamente';
		mensaje.classList.add('text-center','my-10','p-2','bg-green-500','uppercase','text-white','font-bold');

		formulario.insertBefore(mensaje,spiner);
		setTimeout(() => {
			mensaje.remove();
			resetForm();
		}, 5000);
	}, 3000);


	
}

function resetForm() {
	formulario.reset();
	iniciarApp();
}