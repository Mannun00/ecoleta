function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())  //tambem pode ser .then( () => {return res.json() })
    .then( states => {
        for (const state of states){
            ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome} </option>`

        }
    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true
    // linha 28 e 29 para não dar bug nas cidades, a 27 está buscando as cidades a cada clique de mudança no estado
    // linho 28 está habilitando para escolher a cidade


    fetch (url)
    .then(res => res.json()) 
    .then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome} </option>`

        }

        citySelect.disabled = false
    } )
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)   



///itens de coleta

//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event){
    const itemLi = event.target

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")


    const itemId = itemLi.id 


    //verificar se existe itens selecionados, se sim
    //pegar os itens selecinados

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId
        return itemFound
    })

    //simplificando a funcao de cima, 
    //selectedItems.findIndex(item => {
    //item == itemId})

    //se ja estiver selecionado, tirar da selecao

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemsDifferent = item != itemId
            return itemsDifferent
        })
        selectedItems = filteredItems
    } else{
    //se nao estiver selecionado, adicionar à selecao
        selectedItems.push(itemId)
    }


    //atualizar o campo escondido com os itens selecionados
    collectItems.value = selectedItems

}
