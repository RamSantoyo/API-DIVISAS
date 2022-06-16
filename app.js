  //Funciones
function opciones(divisa, nombre){//Funcion para mostrar las opciones de las divisas
  let divisa_1 = document.getElementById("divisa_1");
  let divisa_2 = document.getElementById("divisa_2");
  const option = document.createElement('OPTION');//Crear opciones    
        option.value = divisa;
        option.innerHTML = divisa +" "+"-"+" "+nombre;
        option.className = "opcion";                 
        divisa_1.appendChild(option);
        divisa_2.appendChild(option.cloneNode(true));
}

function divisa(fecha, money){//Funcion para mostrar la conversion 
  let conversor = document.getElementById("cambio");
  conversor.innerHTML = "Equivale a: $ " + money +'<br>'+ "Fecha de emision: " + fecha + '<br>'+ "Divisa: " + divisa_1 + "-" + divisa_2 + '<br>'+ "Renuncia de responsabilidad";
}

  let id = document.getElementById("send"); //seleccionar el id del boton
  id.addEventListener("click", function(){ //evento click
    
     //recuperar datos de HTML
    divisa_1 = document.getElementById("divisa_1").value;
    divisa_2 = document.getElementById("divisa_2").value
    let cantidad = document.getElementById("monto").value; //seleccionar el id del input
    if(!cantidad || !divisa_1 || !divisa_2){ //validar que el input no este vacio y que las divisas sean diferentes
    console.log("Complete todos los campos");
    }else{
      console.log(divisa_1, divisa_2, cantidad);
    convertidor(cantidad, divisa_1, divisa_2);
    }
  });

  //Funcion para invertir texto
  let mensaje = "Hola mundo";
  const invertirCadena = cadena => cadena.split("").reverse().join("");
  let invertir = "Cadena:" + invertirCadena(mensaje);

  //Llamar API

  //LINK DE API: https://www.frankfurter.app/
function convertidor(cantidad , divisa_1, divisa_2){

  fetch(`https://api.frankfurter.app/latest?amount=${cantidad}&from=${divisa_1}&to=${divisa_2}`)
  //Convertirdor de divisas
  .then(resp => 
    resp.json())
  .then((data) => {
    let fecha = data.date;
    let conversion = data.rates;

    for(let key in conversion){
      let money = conversion[key];
      divisa(fecha, money);
    }
  });

} 

fetch(`https://api.frankfurter.app/currencies`)//Divisas disponibles
.then(resp => 
  resp.json())
.then((data) => {
  for (var i in data) {
    //recorrer el objeto y mostrar las opciones
    let divisa = i;
    let nombre = data[i];

    opciones(divisa, nombre);//llamar a la funcion
  }
});

  fetch(`https://api.frankfurter.app/latest?from=USD`)//Convertirdor a todas las divisas
.then(resp => 
  resp.json())
.then((data) => {
  console.log(data);
});


