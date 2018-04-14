$(document).ready(function(){
	formInicio = $("#formularioSesion");
	formRegistro = $("#formularioRegistro");

	pos = formInicio.css("position");

	$("#botonIniciarSesion").click(  function () {
		$("#formularioRegistro").remove();
		$("#formularios").append(formInicio);
		$("#botonIniciarSesion").attr("class", "btn btn-info");
		$("#botonRegistro").attr("class", "btn btn-default");



	}  )

	$("#botonRegistro").click(  function () {
		$("#formularioSesion").remove();
		formRegistro.css("visibility","visible")
		$("#formularios").append(formRegistro);
		$("#botonIniciarSesion").attr("class", "btn btn-default");
		$("#botonRegistro").attr("class", "btn btn-info");

		
	}  )
});


