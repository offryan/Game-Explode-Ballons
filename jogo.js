var timerId = null; //variável que armazena a chamada da função timeout
var jogoAtivo = false; //impede cliques depois do fim do jogo

function iniciaJogo(){

	var url = window.location.search;

	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1) { //1 fácil -> 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) { //2 normal -> 60segundos
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3) { //3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	// sem nível na URL (jogo.html aberto direto), volta para o menu
	if(tempo_segundos == 0) {
		window.location.href = 'index.html';
		return;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de balões
	var qtde_baloes = 80;

	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	jogoAtivo = true;
	contagem_tempo(tempo_segundos + 1)

}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout(function(){ contagem_tempo(segundos); }, 1000);
}

function game_over(){
	parar_jogo();
	mostrar_resultado('Fim de jogo', 'Você não conseguiu estourar todos os balões a tempo.');
}

function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.alt = 'Balão';
		balao.width = 36;
		balao.height = 36;
		balao.draggable = false;
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	// balão já estourado ou jogo encerrado: o clique não conta
	if(!jogoAtivo || e.classList.contains('estourado')){
		return;
	}

	e.classList.add('estourado');
	e.src = 'imagens/balao_azul_pequeno_estourado.png';
	e.alt = 'Balão estourado';

	pontuacao(-1);

}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados  = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);


}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		parar_jogo();
		mostrar_resultado('Parabéns!', 'Você conseguiu estourar todos os balões a tempo.');
	}
}

function parar_jogo(){
	jogoAtivo = false;
	clearTimeout(timerId);
}

// Mensagem de fim de jogo na própria página (antes era um alert)
function mostrar_resultado(titulo, texto){
	document.getElementById('resultado_titulo').innerHTML = titulo;
	document.getElementById('resultado_texto').innerHTML = texto;
	document.getElementById('jogar_de_novo').href = 'jogo.html' + window.location.search;
	document.getElementById('resultado').classList.add('visivel');
}
