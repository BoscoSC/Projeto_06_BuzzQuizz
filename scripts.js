let quizzes;
const isLoading = (state) => {
  if(state) document.querySelector('.spinner').classList.remove('hidden');
  else document.querySelector('.spinner').classList.add('hidden');
}

function recebeQuizz() {
  isLoading(true)
  let promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(carregarTodosQuizzes);
  
}

recebeQuizz();



/* function processarResposta(resposta) {
  console.log(resposta.data);
  dadosDoQuizz = resposta.data;
} */

function aleatorizador() {
  isLoading(false)
  return Math.random() - 0.5;
}

function carregarTodosQuizzes(resposta) {
  dadosDoQuizz = resposta.data;
  console.log(dadosDoQuizz);

  for (let i = 0; i < dadosDoQuizz.length; i++) {
    const todosQuizzes = document.querySelector(".todosQuizz");
    todosQuizzes.innerHTML += `<div class="quizzesCaixa">
               <div onclick="tela2(this)" id="${i}">
                 <div class="quizzDisplay">
                   <img src="${dadosDoQuizz[i].image}"/>
                   <p>
                     ${dadosDoQuizz[i].title}
                   </p>
                 </div>`;
  }
  isLoading(false)
}

carregarTodosQuizzes();

function tela2(quizzClicado) {
  isLoading(true);
  let i = quizzClicado.id;

  let elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `
    <div class="nomeQuizz">
        <img src="${dadosDoQuizz[i].image}"/>
        <h2>${dadosDoQuizz[i].title}</h2>
    </div>
    
    <div class="conteudoTela2">
        
    </div>`;

  let elemento1 = document.querySelector(".conteudoTela2");

  let perguntasDoQuizz = dadosDoQuizz[i].questions;

  for (let aux = 0; aux < perguntasDoQuizz.length; aux++) {
    elemento1.innerHTML =
      elemento1.innerHTML +
      `
        <div class="pergunta">
            <div class="tituloPergunta" style="background-color: ${perguntasDoQuizz[aux].color}">
                <p>${perguntasDoQuizz[aux].title}</p>
            </div>

            <div class="opcoesPergunta">

            </div>


        </div>`;

    let elemento2 = document.querySelectorAll(".opcoesPergunta");
    let elemento3 = elemento2[elemento2.length - 1];

    let respostasDoQuizz = dadosDoQuizz[i].questions[aux].answers;
    respostasDoQuizz = respostasDoQuizz.sort(aleatorizador);

    for (let aux1 = 0; aux1 < respostasDoQuizz.length; aux1++) {
      if (respostasDoQuizz[aux1].isCorrectAnswer === true) {
        elemento3.innerHTML += `
                <div class="opcao" id="correta" onclick="respostaSelecionada(this)">
                    <img src="${respostasDoQuizz[aux1].image}" />
                    <p>${respostasDoQuizz[aux1].text}</p>
                </div>
            `;
      } else {
        elemento3.innerHTML += `
                <div class="opcao" id="errada" onclick="respostaSelecionada(this)">
                    <img src="${respostasDoQuizz[aux1].image}" />
                    <p>${respostasDoQuizz[aux1].text}</p>
                </div>
            `;
      }
    }
  }

  elemento1.innerHTML =
    elemento1.innerHTML +
    `
        <div class="nivelResultado hidden">
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
            <button onclick="scrollar()" class="botaoReiniciar">Reiniciar Quizz</button>
            <button class="voltarHome"><a href="index.html">Voltar pra home</a></button>
        </div>
    `;
    isLoading(false)
}

function scrollar() {
  const nomeDoQuizz = document.querySelector(".nomeQuizz");
  nomeDoQuizz.scrollIntoView({ behavior: "smooth", block: "end" });
  resetarRespostas();
  isLoading(false)
}

function resetarRespostas() {
  const opcao = document.querySelectorAll(".opcao");
  opcao.forEach(function (element) {
    element.classList.remove("opcaoNaoSelecionada", "opcaoCerta", "opcaoErrada");
  });
  isLoading(false)
}

function respostaSelecionada(respostaSelecionada) {
  let pai = respostaSelecionada.parentNode;
  // let scroll = pai.scrollIntoView();
  function scroll() {
    pai.scrollIntoView(true);
  }
  setTimeout(scroll, 2000);

  for (let i = 1; i < pai.childNodes.length; i = i + 2) {
    console.log(pai.childNodes[i]);
    let filho = pai.childNodes[i];
    if (filho.id === "correta") {
      filho.classList.add("opcaoCerta");
      filho.classList.add("opcaoNaoSelecionada");
      filho.removeAttribute("onclick");
    } else {
      filho.classList.add("opcaoErrada");
      filho.classList.add("opcaoNaoSelecionada");
      filho.removeAttribute("onclick");
    }
  }
  respostaSelecionada.classList.remove("opcaoNaoSelecionada");
  isLoading(false)
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
isLoading(false)
}

function tela3pt2() {

  const tituloCriarQuizz = document.querySelector(".input1").value
  console.log(tituloCriarQuizz);

  const urlCriarQuizz = document.querySelector(".input2").value
  console.log(urlCriarQuizz);

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
    <div class="perguntas">`;

  const elemento2 = document.querySelector(".perguntas");

  for (i = 0; i < qtdePerguntasInput; i++) {
    elemento2.innerHTML += `
    <div class="perguntas">
        <div class="containerPerguntasAberto">
            <div class="pergunta1 titulos">
                Pergunta ${i + 1}
            </div>
            <div  class="tituloCriarQuizz caixaDeInputTela3">
                <input class="titulo-input" type="text" placeholder="Texto da pergunta">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input class="hex" type="text" placeholder="Cor de fundo da pergunta">
            </div>


            <div class="respostaCorreta titulos">
                Resposta correta
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input class="input-text" type="url" placeholder="Resposta correta">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" class="input-url" placeholder="URL da imagem">
            </div>


            <div class="respostaIncorreta titulos">
                Respostas incorretas
            </div>
            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input class="input-incorreta" type="text" placeholder="Resposta incorreta 1">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 1">
            </div>
        
            <div class="tituloCriarRespostas caixaDeInputTela3">
                <input  type="text" placeholder="Resposta incorreta 2">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 2">
            </div>
            
            <div class="tituloCriarRespostas caixaDeInputTela3">
                <input  type="text" placeholder="Resposta incorreta 3">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>`;
  }
  elemento2.innerHTML += `
    <div class ="divOculta1 hidden">
    ${tituloCriarQuizz}
    </div>
    <div class ="divOculta2 hidden">
    ${urlCriarQuizz}
    </div>
    <div class ="divOculta3 hidden">
    ${qtdePerguntasInput}
    </div>
    <div class ="divOculta4 hidden">
    ${qtdeNiveisInput}
    </div>

<div class="botao">
    <button class="botaoProsseguir"  onclick="verificarInputs()">
        Prosseguir para criar níveis
    </button>
    </div>
    
</div>
<br/><br/><br/><br/>`;
isLoading(false)
}

function tela3pt3() {
  const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
  const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
  const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
  const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;

  console.log(tituloCriarQuizz)
  console.log(urlCriarQuizz);

  console.log(qtdeNiveisInput);
  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="conteudo">
    <div class="comecePeloComeco">
        Agora, decida os níveis!
    </div>
    <div class="niveis">`;

  const elemento2 = document.querySelector(".niveis");

  for (i = 0; i < qtdeNiveisInput; i++) {
    elemento2.innerHTML += `<div class="niveis">
        <div class="containerNiveisAberto">
            <div class="nível1 titulos">
                Nível ${i + 1}
            </div>

            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input class ="input1" id=”placeholder-text” type="text" placeholder="Título do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input class ="input${2 + 4*i}" type="text" placeholder="% de acerto mínima">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input class ="input3"type="text" placeholder="URL da imagem do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputDescricao">
                <input class = "input4" type="text" placeholder="Descrição do nível">
            </div>
        </div>`;
  }
  elemento2.innerHTML += `

        <div class ="divOculta1 hidden">
        ${tituloCriarQuizz}
        </div>
        <div class ="divOculta2 hidden">
        ${urlCriarQuizz}
        </div>
        <div class ="divOculta3 hidden">
        ${qtdePerguntasInput}
        </div>
        <div class ="divOculta4 hidden">
        ${qtdeNiveisInput}
        </div>

dos
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
    <button class="botaoProsseguir" onclick="verificarNiveis()">
        Finalizar Quizz
    </button>
    
    
    <br/><br/><br/><br/>
</div>`;
isLoading(false)
}

function tela3pt4() {
    const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
    const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
    const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
    const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;

  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="conteudo">
  <div class ="centralizar">
    <div class="seuQuizzEstaPronto">
        Seu quizz está pronto!
    </div>
    
    <img src="${urlCriarQuizz}"/>

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
isLoading(false)
}

function verificarInformacoes() {
  const inputTitulo = document.querySelector(".input1").value;
  const qtdePerguntasInput = document.querySelector(".input3").value;
  let urlInput = document.querySelector(".input2").value;
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
  isLoading(false)
}

function verificarNiveis() {
  isLoading(true)
    const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
    const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
    const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
    const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;
   
    for (i = 0; i < qtdeNiveisInput; i++){
        const inputTitulo = document.querySelector(".input1").value;
        const porcentagemInput = document.querySelector(`.input${2 + 4*i}`).value;
        console.log(porcentagemInput)
        urlInput = document.querySelector(".input3").value;
  const descricaoInput = document.querySelector(".input4").value;
  const botao = document.querySelector(".botaoProsseguir");
  let k = 0;

  if( porcentagemInput == 0){
    k++;
  }

  if (
    inputTitulo.length < 10 ||
    !checkURL(urlInput) ||
    porcentagemInput < 0 ||
    porcentagemInput > 100 ||
    descricaoInput.length < 30 ||
    k < 1
) {
    alert("Insira as informações corretas");
  } else {
    recepcao();
    tela3pt4();
  }
  isLoading(false)
}

  
  
  
  
}

function verificarInputs() {
  let inputTitle = document.querySelector(".titulo-input").value;
  let inputColor = document.querySelector(".hex");
  let inputPergunta = document.querySelector(".input-text").value;
  let urlInput = document.querySelector(".input-url").value;
  let inputIncorreta = document.querySelector(".input-incorreta");
  if (
    inputTitle.length < 20 ||
    inputPergunta === "" ||
    inputIncorreta === "" ||
    !checkURL(urlInput) ||
    !checkColor(inputColor)
  ) {
    alert("Insira as informações corretas!");
    tela3pt3();
  } else {
    tela3pt3();
  }
  isLoading(false)
}

function checkURL(urlInput) {
  isLoading(false)
  const rule =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return rule.test(urlInput);
}

function checkColor(inputColor) {
  isLoading(false)
  console.log(inputColor);
  const rule = /^\#([0-9]|[A-F]|[a-f]){6}$/;
  return rule.test(inputColor);
}





// java para postar quizz criado;


function recepcao(){
    const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
    const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
    const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
    const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;
    let dadosDoQuizzCriado = {
        title: tituloCriarQuizz,
        image: urlCriarQuizz,
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    }
    
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', dadosDoQuizzCriado);
    console.log(dadosDoQuizzCriado);
    requisicao.then(pegarDados);
    requisicao.catch(tratarError);

    function tratarError(erro){
        console.log(erro.response.status);
        alert('Digite outro nome, esse já está em uso!')
    }
    isLoading(false)
} 




function pegarDados(){ 
  isLoading(false)

    //const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
   // promessa.then( dadosChegaram ); 
    
}

