var mes = 0;
var ano = 0;
var dia = 0;

var hora = 0;
var min = 0;
var seg = 0;
var dt;

function buttonCalendarComponent(idComponente) {
    $(`div[id^='calendar-']`).css('display', 'none');
    $(`#calendar-${idComponente}`).css('display', 'block');
}

function Hoje(idComponente) {
    setaDataHoraAtual(idComponente);
    SetInput(idComponente);
}

function Ok(idComponente) {
    setaDataHoraSelecionada(idComponente);
}


$(document).ready(function(){

    var idComponente = 'DataTeste';

    $('#DataTeste').inputmask("datetime", {
        inputFormat: "dd/mm/yyyy HH:MM:ss",
        outputFormat: "dd/mm/yyyy HH:MM:ss",
        placeholder: '__/__/____ __:__:__',
        inputEventOnly: true
    });

    setaDataHoraAtual(idComponente);

    //Click fora pra fechar o dropdown
    $(document).click(function (e) {


        if ($(e.target).find("#DateTimePicker").length > 0) {
          e.preventDefault();
          $(`div[id^='calendar-']`).css('display', 'none');
        }
  
    });

    $('.dias span').on('click',function(o){       
        $('.dias span').css('background-color', 'white');

        dia = $(this).text();
        $(this).css('background-color', 'orange');        
    });

    $(`#next-${idComponente}`).on('click',function(){
        Next(idComponente);
    });

    $(`#prev-${idComponente}`).on('click',function(){
        Prev(idComponente);
    })

    $(`#next-hour-${idComponente}`).on('click',function(){
        NextHours(idComponente);
    });

    $(`#prev-hour-${idComponente}`).on('click',function(){
        PrevHours(idComponente);
    })

    $(`#next-min-${idComponente}`).on('click',function(){
        NextMinutes(idComponente);
    });

    $(`#prev-min-${idComponente}`).on('click',function(){
        PrevMinutes(idComponente);
    })

    $(`#hora-${idComponente}`).on('blur',function(){
        hora = parseInt($(this).val());
    })

    $(`#min-${idComponente}`).on('blur',function(){
        min = parseInt($(this).val());
    })
})


function setaDataHoraSelecionada(idComponente) {
    if (dia != "") {
      SetInput(idComponente);
    }

}

function SetInput(idComponente) {

    function Algarismos(input) {
      var _inputStr = input.toString();

      if (_inputStr.length < 2) {
        _inputStr = "0" + _inputStr;
      }

      return _inputStr;
    }

    if (idComponente)
      $(`#${idComponente}`).val(`${Algarismos(dia)}/${Algarismos(mes + 1)}/${ano} ${Algarismos(hora)}:${Algarismos(min)}:${Algarismos(seg)}`);

    $(`div[id^='calendar-']`).css('display', 'none');
  }

function NextHours(idComponente){

    if(hora == 23){
        hora = 0;
    }
    else{
        hora = hora + 1;
    }

    preencheHrMin(idComponente);
}

function NextMinutes(idComponente){
    if(min == 59){
        min = 0;
        hora = hora + 1;
    }
    else{
        min = min + 1;
    }
    
    preencheHora(idComponente);
}

function PrevHours(idComponente){

    if(hora == 0){
        hora = 23;
        min = 0;
    }
    else{
        hora = hora - 1;
    }

    preencheHora(idComponente);
}

function PrevMinutes(idComponente){
    if(min == 0){
        min = 59;
        hora = hora - 1;
    }
    else{
        min = min - 1;
    }    

    preencheHora(idComponente);
}

function Atualiza(idComponente){
    console.log('idComponente ', idComponente)
    preencheCabecalho(mes, idComponente);
    preencheDias(ano, mes, idComponente);
}

function Next(idComponente){

    if(mes == 11)
    {
        ano = ano + 1;
        mes = 0;
    }else{
        mes = mes + 1;
    }
   
    Atualiza(idComponente);
}

function Prev(idComponente){
    
    if(mes == 0)
    {
        ano = ano - 1;
        mes = 11;
    }
    else{
        mes = mes - 1;
    }
    
    
    Atualiza(idComponente);
}

function diaDaSemana(num){
    switch(num){
        case 0 :
            return "DOM";       
        case 1 :
            return "SEG"; 
        case 2 :
            return "TER"; 
        case 3 :
            return "QUA"; 
        case 4 :
            return "QUI"; 
        case 5 :
            return "SEX";         
        case 6 :
            return "SAB";  
    }
}

function mesDoAno(num){
    switch(num){    
        case 0 :
            return "Janeiro"; 
        case 1 :
            return "Fevereiro"; 
        case 2 :
            return "Março"; 
        case 3 :
            return "Abril"; 
        case 4 :
            return "Maio";         
        case 5 :
            return "Junho";  
        case 6 :
            return "Julho";  
        case 7 :
            return "Agosto";  
        case 8 :
            return "Setembro";  
        case 9 :
            return "Outubro";  
        case 10 :
            return "Novembro";  
        case 11 :
            return "Dezembro";  
    }
}

function preencheCabecalho(mes,idComponente){
    document.getElementById(`nome-mes-${idComponente}`).textContent = mesDoAno(mes);
    document.getElementById(`nome-ano-${idComponente}`).textContent = ano;
}

function preencheDias(ano, mes, idComponente) {

    $(`div[id^='calendar-${idComponente}'] .semana span`).text("");

    var first = new Date(ano, mes, 1);
    var last = new Date(ano, mes + 1, 0);

    var atual = first;

    for (let semana = 0; semana <= 5; semana++) {

      for (let diaSemana = atual.getDay(); diaSemana <= 6; diaSemana++) {
        $(`div[id^='calendar-${idComponente}'] .dias > div:nth-child(${semana + 1}) > span.${diaDaSemana(atual.getDay())}`).text(`${atual.getDate()}`);

        if (atual.getDate() == last.getDate())
          return;

        atual = new Date(ano, mes, atual.getDate() + 1);
      }

    }

}

function preencheHora(idComponente, agora) {

if (agora) {
    hora = dt.getHours();
    min = dt.getMinutes();
}

$(`div[id^='calendar-${idComponente}'] .hora input`).val(hora);
$(`div[id^='calendar-${idComponente}'] .min input`).val(min);
}

function setaDataHoraAtual(idComponente) {
    dt = new Date();

    dia = dt.getDate();
    mes = dt.getMonth();
    ano = dt.getFullYear();
    hora = dt.getHours();
    min = dt.getMinutes();
    seg = dt.getSeconds();

    preencheCabecalho(mes, idComponente);
    preencheDias(ano, mes, idComponente);


    $('.dias span').css('background-color', 'white');

    $(`div[id^='calendar-${idComponente}'] .hora input`).val(dt.getHours());
    $(`div[id^='calendar-${idComponente}'] .min input`).val(dt.getMinutes());

    $(`.dias span:contains('${dt.getDate()}')`).css('background-color', 'orange');
    
  }
