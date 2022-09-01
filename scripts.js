function tela3pt1(elemento){
    const paiDoElemento = elemento.parentNode
    const voDoElemento = paiDoElemento.parentNode
    const taraVoDoElemento = voDoElemento.parentNode
    taraVoDoElemento.innerHTML = `<div class="comecePeloComeco">
    Comece pelo começo
</div>
<div class="informacoesBasicas">
    <div class="tituloCriarQuizz caixaDeInputTela3">
        <input id=”placeholder-text” type="text" placeholder="Título do seu quizz">
    </div>
    <div class="urlCriarQuizz caixaDeInputTela3">
        <input type="text" placeholder="URL da imagem do seu quizz">
    </div>
    <div class="qtdePerguntasCriarQuizz caixaDeInputTela3">
        <input type="text" placeholder="Quantidade de perguntas do quizz">
    </div>
    <div class="qtdeNiveisCriarQuizz caixaDeInputTela3">
        <input type="text" placeholder="Quantidade de níveis do quiz">
    </div>
</div>
<div class="botaoProsseguir" onclick="tela3pt2(this)">
    Prosseguir para criar perguntas
</div>'`
} 

function tela3pt2(elemento){
    const paiDoElemento = elemento.parentNode
    paiDoElemento.innerHTML = `
    <div class ="conteudoTela3pt2">
    <div class="comecePeloComeco">
        Crie suas perguntas
    </div>
    <div class="perguntas">
        <div class="containerPerguntasAberto">
            <div class="pergunta1 titulos">
                Pergunta 1
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
                <input id=”placeholder-text” type="text" placeholder="Resposta correta">
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
        </div>
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

    <div class="botaoProsseguir" onclick="tela3pt3(this)">
        Prosseguir para criar níveis
    </div>
    
</div>
<br/><br/><br/><br/>`
}

function tela3pt3(elemento){
    const paiDoElemento = elemento.parentNode
    paiDoElemento.innerHTML = `<div class="conteudoTela3pt3">
    <div class="comecePeloComeco">
        Agora, decida os níveis!
    </div>
    <div class="niveis">
        <div class="containerNiveisAberto">
            <div class="nível1 titulos">
                Nível 1
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

    
    <div class="botaoProsseguir" onclick="tela3pt4(this)">
        Finalizar Quizz
    </div>
    
    <br/><br/><br/><br/>
</div>`
}

function tela3pt4(elemento){
    const paiDoElemento = elemento.parentNode
    paiDoElemento.innerHTML = `<div class="conteudoTelapt4">
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
</div>`
}