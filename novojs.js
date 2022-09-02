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
  }

  function verificarInputs() {
    let inputTitle = document.querySelector('.titulo-input').value;
    /* let inputCor = document.querySelector('#hex'); */
    let inputPergunta = document.querySelector('.input-text').value;
    let urlInput = document.querySelector('.input-url').value;
    if(inputTitle.length <  20 || inputPergunta === "" || !checkURL(urlInput)) {
        alert('Insira as informações corretas!')
    } else {
        tela3pt3();
    }
}


function checkURL(urlInput) {
    
  const rule =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return rule.test(urlInput);
}
