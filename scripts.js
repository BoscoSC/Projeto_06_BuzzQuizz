function recebeQuizz(){
    let promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(processarResposta);
}

recebeQuizz();

let dadosDoQuizz;

function processarResposta(resposta){
    console.log(resposta.data);
    dadosDoQuizz = resposta.data;
}

function aleatorizador() { 
	return Math.random() - 0.5; 
}

function tela2(){
    let i = 9; // valor pra teste, o certo é pegar o index do clicado, PROVAVEL de ser com THIS

    let elemento = document.querySelector('.conteudo');
    elemento.innerHTML = `
    <div class="nomeQuizz">
        <img src="${dadosDoQuizz[i].image}"/>
        <h2>${dadosDoQuizz[i].title}</h2>
    </div>
    
    <div class="conteudoTela2">
        
    </div>`

    let elemento1 = document.querySelector('.conteudoTela2');
    
    let perguntasDoQuizz = dadosDoQuizz[i].questions;
    // console.log(perguntasDoQuizz);

    for(let aux = 0; aux < perguntasDoQuizz.length; aux++){
        elemento1.innerHTML = elemento1.innerHTML + `
        <div class="pergunta">
            <div class="tituloPergunta" style="background-color: ${perguntasDoQuizz[aux].color}">
                <p>${perguntasDoQuizz[aux].title}</p>
            </div>

            <div class="opcoesPergunta">

            </div>


        </div>`

        let elemento2 = document.querySelectorAll('.opcoesPergunta');
        console.log(elemento2);
        let elemento3 = elemento2[elemento2.length-1];
        console.log(elemento3);

        let respostasDoQuizz = dadosDoQuizz[i].questions[aux].answers;
        respostasDoQuizz.sort(aleatorizador);

        for(let aux1 = 0; aux1 < respostasDoQuizz.length; aux1++){
            elemento3.innerHTML += `
                <div class="opcao">
                    <img src="${respostasDoQuizz[aux1].image}" />
                    <p>${respostasDoQuizz[aux1].text}</p>
                </div>
            `
        }
    }

    elemento1.innerHTML = elemento1.innerHTML + `
        <div class="nivelResultado">
            <div class="nivelDoQuizz">
                <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
            </div>

            <div class="nivelDescricao">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtJGCO6tTsDqCiz3wygan4VRUGeSh4TFDQWg&usqp=CAU" />
                <p>
                    Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop
                    infinito de comida e clique no botão abaixo para usar o vira-tempo
                    e reiniciar este teste.
                </p>
            </div>
        </div>

        <div class="botoes">
            <button class="botaoReiniciar">Reiniciar Quizz</button>
            <button class="voltarHome">Voltar pra home</button>
        </div>
    `
}

function tela3pt1() {
  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="comecePeloComeco">
    Comece pelo começo
</div>
<div class="informacoesBasicas">
    <div class="tituloCriarQuizz caixaDeInputTela3">
        <input class="input1" id=”placeholder-text” type="text" placeholder="Título do seu quizz">
    </div>
    <div class="urlCriarQuizz caixaDeInputTela3">
        <input class="input2" type="url" placeholder="URL da imagem do seu quizz">
    </div>
    <div class="qtdePerguntasCriarQuizz caixaDeInputTela3">
        <input class="input3" type="text" placeholder="Quantidade de perguntas do quizz">
    </div>
    <div class="qtdeNiveisCriarQuizz caixaDeInputTela3">
        <input class="input4" type="text" placeholder="Quantidade de níveis do quiz">
    </div>
</div>
<div class="botao">
<button class="botaoProsseguir" onclick="verificarInformacoes()">
    Prosseguir para criar perguntas
</button>'
</div>`;

}

function tela3pt2() {
  const qtdePerguntasInput = document.querySelector(".input3").value;
  console.log(qtdePerguntasInput);

  const qtdeNiveisInput = document.querySelector(".input4").value;
  console.log(qtdeNiveisInput);

  const limparDiv = document.querySelector(".informacoesBasicas");
  limparDiv.innerHTML = "";
  const limparBotao = document.querySelector(".botao");
  limparBotao.innerHTML = "";
  const elemento = document.querySelector(".comecePeloComeco");
  elemento.innerHTML = `
    <div class ="conteudo">
    <div class="comecePeloComeco">
        Crie suas perguntas
    </div>
    <div class="perguntas">`
    
    const elemento2 = document.querySelector(".perguntas");

    for(i=0; i<qtdePerguntasInput; i++){
    elemento2.innerHTML += `
    <div class="perguntas">
        <div class="containerPerguntasAberto">
            <div class="pergunta1 titulos">
                Pergunta ${i + 1}
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input id=”placeholder-text” type="text" placeholder="Texto da pergunta">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </div>


            <div class="respostaCorreta titulos">
                Resposta correta
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input id=”placeholder-text” type="url" placeholder="Resposta correta">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem">
            </div>


            <div class="respostaIncorreta titulos">
                Respostas incorretas
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input id=”placeholder-text” type="text" placeholder="Resposta incorreta 1">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 1">
            </div>
        
            <div class="tituloCriarRespostas caixaDeInputTela3">
                <input id=”placeholder-text” type="text" placeholder="Resposta incorreta 2">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 2">
            </div>
            
            <div class="tituloCriarRespostas caixaDeInputTela3">
                <input id=”placeholder-text” type="text" placeholder="Resposta incorreta 3">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>`
    }
    elemento2.innerHTML +=
       `
        <div class="containerPerguntasFechado">
            <div class="pergunta2 titulos">
                Pergunta 2
            </div>
            <img src="Vector (1).png" class ="iconeEditar"/>
        </div>
        <div class="containerPerguntasFechado">
            <div class="pergunta3 titulos">
                Pergunta 3
            </div>
            <img src="Vector (1).png" class ="iconeEditar"/>
        </div>
            
            
    </div>
    <br/>

    <div class ="divOculta">
    ${qtdeNiveisInput}
    </div>

<div class="botao">
    <button class="botaoProsseguir"  onclick="tela3pt3(this)">
        Prosseguir para criar níveis
    </button>
    </div>
    
</div>
<br/><br/><br/><br/>`;
}

function tela3pt3() {
  const qtdeNiveisInput = document.querySelector(".divOculta").innerHTML;

  console.log(qtdeNiveisInput);
  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="conteudo">
    <div class="comecePeloComeco">
        Agora, decida os níveis!
    </div>
    <div class="niveis">`
    
    const elemento2 = document.querySelector(".niveis");

    for(i=0; i<qtdeNiveisInput; i++){
    elemento2.innerHTML +=
    `<div class="niveis">
        <div class="containerNiveisAberto">
            <div class="nível1 titulos">
                Nível ${i+1}
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input id=”placeholder-text” type="text" placeholder="Título do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="% de acerto mínima">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputDescricao">
                <input type="text" placeholder="Descrição do nível">
            </div>
        </div>`
    }
        elemento2.innerHTML +=
        `
        <div class="containerNiveisFechado">
            <div class="pergunta2 titulos">
                Nivel 2
            </div>
            <img src="Vector (1).png" class ="iconeEditar"/>
        </div>
        <div class="containerNiveisFechado">
            <div class="pergunta2 titulos">
                Nivel 3
            </div>
            <img src="Vector (1).png" class ="iconeEditar"/>
        </div>
    </div>
    <br/>

    <div class="botao">
    <button class="botaoProsseguir" onclick="tela3pt4(this)">
        Finalizar Quizz
    </button>
    
    
    <br/><br/><br/><br/>
</div>`;
}

function tela3pt4() {
  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="conteudo">
  <div class ="centralizar">
    <div class="seuQuizzEstaPronto">
        Seu quizz está pronto!
    </div>
    

    <a href="">
    <div class="botaoAcessar">
        Acessar Quizz
    </div>
    </a>

        <div on click="">
            Voltar home
        </div>
       
    <br/><br/><br/><br/>
    </div>
</div>`;
}
let urlInput;
function verificarInformacoes() {
  const inputTitulo = document.querySelector(".input1").value;
  const qtdePerguntasInput = document.querySelector(".input3").value;
  urlInput = document.querySelector(".input2").value;
  const qtdeNiveisInput = document.querySelector(".input4").value;
  const botao = document.querySelector(".botaoProsseguir");
  if (
    inputTitulo.length < 20 ||
    inputTitulo.length > 65 ||
    !checkURL(urlInput) ||
    qtdePerguntasInput < 3 ||
    qtdeNiveisInput < 2
  ) {
    alert("Insira as informações corretas");
  } else {
    tela3pt2();
  }
}
//Daniel ta fazendo essa de verificar nivel
/*function verificarNiveis() {
    const inputTitulo = document.querySelector(".input1").value;
    const qtdePerguntasInput = document.querySelector(".input3").value;
    urlInput = document.querySelector(".input2").value;
    const qtdeNiveisInput = document.querySelector(".input4").value;
    const botao = document.querySelector(".botaoProsseguir");
    if (
      inputTitulo.length < 20 ||
      inputTitulo.length > 65 ||
      !checkURL(urlInput) ||
      qtdePerguntasInput < 3 ||
      qtdeNiveisInput < 2
    ) {
      alert("Insira as informações corretas");
    } else {
      tela3pt2();
    }
  }*/

function checkURL(urlInput) {
  const rule =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return rule.test(urlInput);
}
