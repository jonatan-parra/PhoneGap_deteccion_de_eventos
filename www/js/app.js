var app={
  inicio: function(){
    this.iniciaBotones();
    this.iniciaFastClick();
    this.iniciaHammer();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBotones: function(){
    var botonClaro = document.querySelector('#claro');
    var botonOscuro = document.querySelector('#oscuro');

    botonClaro.addEventListener('click',this.ponloClaro,false);
    botonOscuro.addEventListener('click',app.ponloOscuro,false);
  },

  iniciaHammer: function() {
    var zona = document.getElementById('zona-gestos');
    var hammertime = new Hammer(zona);

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });

    /*hammertime.on('doubletap pan swipe press pinch rotate tap', function(ev){
      document.querySelector('#info').innerHTML = ev.type + '!';
    });*/

    zona.addEventListener('webkitAnimationEnd',function(e){
      zona.className='';
    });

     hammertime.on('doubletap', function(ev) {
      zona.className='doubletap';
      document.querySelector('#info').innerHTML = "Doble tap!";
    });

    hammertime.on('press', function(ev) {
      zona.className='press';
      document.querySelector('#info').innerHTML = "Press!";
    });

    hammertime.on('swipe', function(ev) {
      var clase=undefined;
      direccion=ev.direction;

      if (direccion==4){
        clase='swipe-derecha';
        document.querySelector('#info').innerHTML = "Swipe a la derecha!";
      }
      if (direccion==2){
        clase='swipe-izquierda';
        document.querySelector('#info').innerHTML = "Swipe a la izquierda!";
      }
      zona.className=clase;
    });


    hammertime.on('rotate', function(ev) {
      var umbral=25;
      if (ev.distance > umbral){
        zona.className='rotate';
        document.querySelector('#info').innerHTML = "Rotate!";
      }
    });
  },

  ponloClaro: function(){
    document.body.className = 'claro';
    document.querySelector('#info').innerHTML = "Boton Claro!";
  },

  ponloOscuro: function(){
    document.body.className = 'oscuro';
    document.querySelector('#info').innerHTML = "Boton Oscuro!";
  },

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}
