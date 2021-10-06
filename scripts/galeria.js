"use strict"

const limparElemento = (elemento) => 
{
    while (elemento.firstChild)
    {
        elemento.removeChild(elemento.lastChild)
    }
}

const pegarImagens = (raca) => fetch(`https://dog.ceo/api/breed/${raca}/images`) //taz uma promessa, que será efetivada em pesquisar imagens

const pesquisarImagens = async (evento) => 
{
    if (evento.key == "Enter")
    {
        const raca = evento.target.value
         //target é onde o evento acontece
        const imagensResponse = await pegarImagens(raca) //pega tudinho que retorna da solicitação do servidor, só passando para a próxima linha depois da função der executada
        const imagens = await imagensResponse.json() //trasnforma o que veio em json, esperando até que a função seja completamente executada

        limparElemento(document.querySelector(".galeria-container"))
        limparElemento(document.querySelector(".slide-conteiner"))
        carregarGaleria(imagens.message)
        carregarSlide(imagens.message)
    }
}

pesquisarImagens();
const limparId = (url) => 
{
    const ultimaBarra = url.lastIndexOf("/")
    const ultimoPontoFinal = url.lastIndexOf(".")
    return url.substring(ultimaBarra+1,ultimoPontoFinal).replace(" ", "-")
        //somamos com 1 porque não queremos a barra, então comoçamos a partir do próximo
}

const criarItemGaleria = (urlImagem) =>
{
    const conteinerItens = document.querySelector(".galeria-container")

    const novoLinkItem = document.createElement("a") /*Cria o elemento A na memória, mas não está no HTML */
    novoLinkItem.href = `#${limparId(urlImagem)}` /*Adiciona a href */
    novoLinkItem.classList.add("galeria-itens") /*Adiciona a classe */
    novoLinkItem.innerHTML = `<img src="${urlImagem}" alt="Personagem de Grey's Anatomy">` /* Escreve no objeto da memória, mas não no html que já existe */

    conteinerItens.appendChild(novoLinkItem) /* Coloca o item criado no objeto que realmente existe no html (conteiner) */
}

const carregarGaleria = (imgs) => imgs.forEach(criarItemGaleria)

const criarSlide = (urlImagem, indice, array) =>
{
    const conteinerSlides = document.querySelector(".slide-conteiner")

    const novoDiv = document.createElement("div")
    novoDiv.classList.add("slide")
    novoDiv.id = limparId(urlImagem)

    const indiceAnterior = indice <= 0 ? array.length -1 : indice -1
        //se o indice for zero, pega o tamanho e subtrai 1 (ultimo item do array), senão, subtrai um diretamente do indice
    const idAnterior = limparId(array[indiceAnterior])

    const indicePosterior = indice >= array.length -1 ? 0: indice +1
        //se for o ultimo indice, vai para o primeiro. se não, soma 1 e vai pro próximo
    const idPosterior = limparId(array[indicePosterior])

    //podemos usar innerHTML porque ele ainda não está no html, mas sim na memoria
    novoDiv.innerHTML = 
    `
        <div class="imagem-conteiner">
            <a href="" class="icones fechar">&#10006;</a>
            <a href="#${idAnterior}" class="icones anterior">&#171;</a>
            <a href="#${idPosterior}" class="icones proximo">&#187;</a>

            <img src="${urlImagem}" alt="">
        </div>
    `

    conteinerSlides.appendChild(novoDiv)
}


const carregarSlide = (imgs) => imgs.forEach(criarSlide)

document.querySelector(".pesquisa-conteiner input").addEventListener("keypress", pesquisarImagens)