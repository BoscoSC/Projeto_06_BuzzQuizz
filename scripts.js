let quizzes;
let k = 0;

const isLoading = (state) => {
  console.log(document.querySelector(".spinner"));
  if (state) document.querySelector(".spinner").classList.remove("hidden");
  else document.querySelector(".spinner").classList.add("hidden");
};

function recebeQuizz() {
  isLoading(true);
  let promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(carregarTodosQuizzes);
}
recebeQuizz();

let dadosDoQuizz;
function aleatorizador() {
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
  isLoading(false);
}

carregarTodosQuizzes();

function tela2(quizzClicado) {
  let i = quizzClicado.id;

  let elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `
    <div class="nomeQuizz">
        <img src="${dadosDoQuizz[i].image}"/>
        <h2>${dadosDoQuizz[i].title}</h2>
    </div>
    
    <div class="conteudoTela2" id="${i}">
        
    </div>
  `;

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


        </div>
      `;

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
        <div class="nivelResultado">
            
        </div>

        <div class="botoes">
            <button onclick="scrollar()" class="botaoReiniciar">Reiniciar Quizz</button>
            <button class="voltarHome"><a class="voltarHome" href="index.html">Voltar pra home</a></button>
        </div>
    `;
}

function scrollar() {
  const nomeDoQuizz = document.querySelector(".nomeQuizz");
  nomeDoQuizz.scrollIntoView({ behavior: "smooth", block: "end" });
  resetarRespostas();
}

function resetarRespostas() {
  const opcao = document.querySelectorAll(".opcao");
  opcao.forEach(function (element) {
    element.classList.remove(
      "opcaoNaoSelecionada",
      "opcaoCerta",
      "opcaoErrada"
    );
    element.setAttribute("onclick", "respostaSelecionada(this)");
    element.parentNode.parentNode.classList.remove("done");
  });
  let nivel = document.querySelector(".nivelResultado");
  nivel.innerHTML = "";
}

function respostaSelecionada(respostaSelecionada) {
  let scrollaProxPergunta =
    respostaSelecionada.parentNode.parentNode.nextElementSibling;
  let pai = respostaSelecionada.parentNode;
  respostaSelecionada.parentNode.parentNode.classList.add("done");
  function scroll() {
    scrollaProxPergunta.scrollIntoView(true);
  }
  setTimeout(scroll, 2000);

  for (let index = 1; index < pai.childNodes.length; index = index + 2) {
    let filho = pai.childNodes[index];
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
  let perguntasTotal = document.getElementsByClassName("pergunta");
  let perguntasRespondidas = document.getElementsByClassName("done");
  if(perguntasRespondidas.length === perguntasTotal.length){
    setTimeout(revelaNivel,1999);
  }
}

function revelaNivel(){
  let perguntasTotal = document.getElementsByClassName("pergunta");
  let perguntasRespondidas = document.getElementsByClassName("done");
  let porcentagemNivel;
  let auxiliar;

  if(perguntasRespondidas.length === perguntasTotal.length){
    let OpcaoCerta = document.getElementsByClassName("opcaoCerta");
    auxiliar = 0;

    for(let i = 0; i < OpcaoCerta.length; i++){
      let listaClasses = OpcaoCerta[i].classList;

      if(listaClasses.length === 2){
        auxiliar++;
      }
    }

    porcentagemNivel = Math.round((auxiliar/OpcaoCerta.length)*100);
  }

  let elemento1 = document.querySelector(".nivelResultado");
  let idDoQuizz = document.querySelector(".conteudoTela2");
  idDoQuizz = idDoQuizz.id;

  let elemento;
  let levels = dadosDoQuizz[idDoQuizz].levels.length;
  let w = 0;

  for (let variavel = 0; variavel < levels; variavel++){
    if(porcentagemNivel >= dadosDoQuizz[idDoQuizz].levels[variavel].minValue){
      w = variavel;
    }
  }

  elemento = `
    <div class="nivelDoQuizz">
      <p>${porcentagemNivel}% de acerto: ${dadosDoQuizz[idDoQuizz].levels[w].title}</p>
    </div>
    <div class="nivelDescricao">
      <img src="${dadosDoQuizz[idDoQuizz].levels[w].image}" />
      <p>${dadosDoQuizz[idDoQuizz].levels[w].text}</p>
    </div>
  `
  elemento1.innerHTML = elemento;
}

function tela3pt1() {
  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="comecePeloComeco">
    Comece pelo começo
</div>
<div class="informacoesBasicas">
    <div class="tituloCriarQuizz caixaDeInputTela3">
        <input class="input1" id=”placeholder-text” type="text" placeholder="Título do seu quizz" required minlength="20" maxlength="65">
    </div>
    <div class="erro1 hidden">
    <p class="erro-input1">Insira entre 20 e 65 caracateres!</p>
    </div>
    <div class="urlCriarQuizz caixaDeInputTela3">
        <input class="input2" type="url" placeholder="URL da imagem do seu quizz" required>
    </div>
    <div class="erro2 hidden">
    <p class="erro-input2">Insira uma URL válida!</p>
    </div>
    <div class="qtdePerguntasCriarQuizz caixaDeInputTela3">
        <input class="input3" type="text" placeholder="Quantidade de perguntas do quizz" required>
    </div>
    <div class="erro3 hidden">
    <p class="erro-input3">Insira pelo menos 3 perguntas ao seu quizz!</p>
    </div>
    <div class="qtdeNiveisCriarQuizz caixaDeInputTela3">
        <input class="input4" type="text" placeholder="Quantidade de níveis do quiz" required>
    </div>
    <div class="erro4 hidden">
    <p class="erro-input4">Insira pelo menos 2 níveis ao seu quizz!</p>
    </div>
</div>
<div class="botao">
<button class="botaoProsseguir" onclick="verificarInformacoes()">
    Prosseguir para criar perguntas
</button>'
</div>`;
}

function tela3pt2() {
  const tituloCriarQuizz = document.querySelector(".input1").value;

  const urlCriarQuizz = document.querySelector(".input2").value;

  const qtdePerguntasInput = document.querySelector(".input3").value;

  const qtdeNiveisInput = document.querySelector(".input4").value;

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
}

function tela3pt3() {
  const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
  const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
  const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
  const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;

  const elemento = document.querySelector(".conteudo");
  elemento.innerHTML = `<div class="conteudo">
    <div class="comecePeloComeco">
        Agora, decida os níveis!
    </div>
    <div class="niveis">`;

  const elemento2 = document.querySelector(".niveis");

  for (contaNiveis = 0; contaNiveis < qtdeNiveisInput; contaNiveis++) {
    elemento2.innerHTML += `<div class="niveis">
        <div class="containerNiveisAberto">
            <div class="nível1 titulos">
                Nível ${contaNiveis + 1}
            </div>

            <div class="tituloCriarQuizz caixaDeInputTela3">
                <input class ="input${
                  1 + 4 * contaNiveis
                }" id=”placeholder-text” type="text" placeholder="Título do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input class ="input${
                  2 + 4 * contaNiveis
                }" type="text" placeholder="% de acerto mínima">
            </div>
            <div class="urlCriarQuizz caixaDeInputTela3">
                <input class ="input${
                  3 + 4 * contaNiveis
                }"type="text" placeholder="URL da imagem do nível">
            </div>
            <div class="urlCriarQuizz caixaDeInputDescricao">
                <input class = "input${
                  4 + 4 * contaNiveis
                }" type="text" placeholder="Descrição do nível">
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
}

function verificarInformacoes() {
  const inputTitulo = document.querySelector(".input1").value;
  const qtdePerguntasInput = document.querySelector(".input3").value;
  let urlInput = document.querySelector(".input2").value;
  const qtdeNiveisInput = document.querySelector(".input4").value;
  const botao = document.querySelector(".botaoProsseguir");
  let error1;
  let error2;
  let error3;
  let error4;

  if (inputTitulo.length < 20 || inputTitulo.length > 65) {
    document.querySelector(".erro1").classList.remove("hidden");
    error1 = false;
  } else {
    document.querySelector(".erro1").classList.add("hidden");
    error1 = true;
  }
  if (!checkURL(urlInput)) {
    document.querySelector(".erro2").classList.remove("hidden");
    error2 = false;
  } else {
    document.querySelector(".erro2").classList.add("hidden");
    error2 = true;
  }
  if (qtdePerguntasInput < 3) {
    document.querySelector(".erro3").classList.remove("hidden");
    error3 = false;
  } else {
    document.querySelector(".erro3").classList.add("hidden");
    error3 = true;
  }
  if (qtdeNiveisInput < 2) {
    document.querySelector(".erro4").classList.remove("hidden");
    error4 = false;
  } else {
    document.querySelector(".erro4").classList.add("hidden");
    error4 = true;
  }
  if ((error1 && error2 && error3 && error4) === true) {
    tela3pt2();
  } else {
    alert("Digite os campos válidos!");
  }
}

function verificarNiveis() {
  console.log(
    "Verificando níveis, mas primeiro se as constantes ainda existem:"
  );

  const tituloCriarQuizz = document.querySelector(".divOculta1").innerHTML;
  console.log(tituloCriarQuizz);

  const urlCriarQuizz = document.querySelector(".divOculta2").innerHTML;
  console.log(urlCriarQuizz);

  const qtdePerguntasInput = document.querySelector(".divOculta3").innerHTML;
  console.log(qtdePerguntasInput);

  const qtdeNiveisInput = document.querySelector(".divOculta4").innerHTML;
  console.log(qtdeNiveisInput);

  console.log("Vamos executar o contador.");
  //Variáveis importantes antes de começar o contador
  let contNiveis = 0;
  let contPerguntas = 0;

  saveInputTituloNiveis = [];
  savePorcentagemInputNiveis = [];
  saveUrlInputNiveis = [];
  saveDescricaoInputNiveis = [];

  contadorVerificarNiveis();

  function contadorVerificarNiveis() {
    console.log("contador sendo executado");
    if (contNiveis == qtdeNiveisInput) {
      contNiveis = contNiveis - 1;
    }

    console.log("Agora, se os inputs dos níveis estão em ordem:");

    const inputTituloNiveis = document.querySelector(
      `.input${1 + 4 * contNiveis}`
    ).value;
    console.log(inputTituloNiveis);

    console.log(saveInputTituloNiveis);
    saveInputTituloNiveis.push(inputTituloNiveis);
    console.log(saveInputTituloNiveis);

    const porcentagemInputNiveis = document.querySelector(
      `.input${2 + 4 * contNiveis}`
    ).value;
    console.log(porcentagemInputNiveis);

    console.log(savePorcentagemInputNiveis);
    savePorcentagemInputNiveis.push(porcentagemInputNiveis);
    console.log(savePorcentagemInputNiveis);

    urlInputNiveis = document.querySelector(
      `.input${3 + 4 * contNiveis}`
    ).value;
    console.log(urlInputNiveis);

    console.log(saveUrlInputNiveis);
    saveUrlInputNiveis.push(urlInputNiveis);
    console.log(saveUrlInputNiveis);

    const descricaoInputNiveis = document.querySelector(
      `.input${4 + 4 * contNiveis}`
    ).value;
    console.log(descricaoInputNiveis);

    console.log(saveDescricaoInputNiveis);
    saveDescricaoInputNiveis.push(descricaoInputNiveis);
    console.log(saveDescricaoInputNiveis);

    const botao = document.querySelector(".botaoProsseguir");

    if (contPerguntas !== qtdePerguntasInput) {
      contPerguntas++;
      console.log(`Valor do ContPerguntas: ${contPerguntas}`);
    }
    if (contNiveis !== qtdeNiveisInput) {
      contNiveis++;
      console.log(`Valor do ContNíveis: ${contNiveis}`);
    }

    if (porcentagemInputNiveis == "0") {
      k++;
    }

    if (
      inputTituloNiveis.length < 10 ||
      !checkURL(urlInputNiveis) ||
      porcentagemInputNiveis < 0 ||
      porcentagemInputNiveis > 100 ||
      descricaoInputNiveis.length < 30
    ) {
      alert("Insira as informações corretas");
    } else if (contNiveis == qtdeNiveisInput && k < 1) {
      alert("Insira as informações corretas");
      tela3pt3();
    } else if (
      contNiveis == qtdeNiveisInput &&
      contPerguntas == qtdePerguntasInput &&
      k > 0
    ) {
      console.log("tudo certo, QUIZZ CONCLUÍDO!");
      recepcao();
      tela3pt4();
    } else {
      console.log("ainda não, repetindo a função:");
      contadorVerificarNiveis();
    }
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
}

function checkURL(urlInput) {
  const rule =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return rule.test(urlInput);
}

function checkColor(inputColor) {
  const rule = /^\#([0-9]|[A-F]|[a-f]){6}$/;
  return rule.test(inputColor);
}

// java para postar quizz criado;

function recepcao() {
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
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
    ],
    levels: [
      {
        title: saveInputTituloNiveis[0],
        image: saveUrlInputNiveis[0],
        text: saveDescricaoInputNiveis[0],
        minValue: 0,
      },
      {
        title: saveInputTituloNiveis[1],
        image: saveUrlInputNiveis[1],
        text: saveDescricaoInputNiveis[1],
        minValue: 50,
      },
    ],
  };
  for (dan = 2; dan < qtdeNiveisInput; dan++) {
    dadosDoQuizzCriado.levels.push({
      title: saveInputTituloNiveis[dan],
      image: saveUrlInputNiveis[dan],
      text: saveDescricaoInputNiveis[dan],
      minValue: 50,
    });
  }

  const requisicao = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    dadosDoQuizzCriado
  );
  console.log(dadosDoQuizzCriado);
  requisicao.then(pegarDados);
  requisicao.catch(tratarError);

  function tratarError(erro) {
    console.log(erro.response.status);
    alert("Digite outro nome, esse já está em uso!");
  }
}

function pegarDados() {
  //const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  // promessa.then( dadosChegaram );
}
