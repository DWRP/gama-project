//https://v2-api.sheety.co/ec5776a58badb5f2363328b590c6fc39/gamaproject/users

const COOCKIES_ACCEPT = window.localStorage.getItem('accept_cookies')
const USER = window.localStorage.getItem('user')

const CARDS = document.querySelector('.cards')
const WARNING = document.querySelector('.warning')
const API = "https://v2-api.sheety.co/ec5776a58badb5f2363328b590c6fc39/gamaproject"
const USER_DATA = {
    user: {
        id: undefined,
        acessId: `${Number.parseInt(Math.random()*100)+Date.now()}`,
        lastAcess: Date(),
        numAcess: "1"
    }
}

function generatePDF(){
    document.querySelector('.main').style.overflowY = ""
    console.log(document.querySelector('.main').style.overflowY)
    window.print()
    document.querySelector('.main').style.overflowY = "scroll"
    console.log(document.querySelector('.main').style.overflowY)
}

async function getAcessNums(id){
    const result = await fetch(API+'/users/'+id).then(async (data)=> {
        return await data.json()
    })

    return result.user.numAcess
}

async function saveAcess(method='POST',options=''){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const result = JSON.parse(this.responseText)
            USER_DATA.user.id = result.user.id
            window.localStorage.setItem('user',USER_DATA.user.id)
        }
    }

    xhttp.open(method, API+"/users"+options, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.send(JSON.stringify(USER_DATA));
}

if(COOCKIES_ACCEPT){
    WARNING.classList.add('hidden')
}

async function setUser(){
    if(!USER){
        await saveAcess()
    }else{
        USER_DATA.user.id =  await window.localStorage.getItem('user')
        
        USER_DATA.user.numAcess = await getAcessNums(window.localStorage.getItem('user'))
        USER_DATA.user.numAcess = `${Number(USER_DATA.user.numAcess)+1}`
        
        await saveAcess("PUT",`/${USER_DATA.user.id}`)
    }
}

setUser()

function accept_coockies(){
    window.localStorage.setItem('accept_cookies',true)
    WARNING.classList.add('hidden')
}

function set_cards(data){
    return data.map(item=>{
        return `
            <div class="card">
                <div class="card_img">
                    <img src="${item.imgSrc}" alt="none">
                </div>
                <div class="card_info">
                    <h2><span>Nome Completo:</span> ${item.fullName}</h2><br />
                    <p><span>Quero Apender:</span> ${item.toLearning}</p><br />
                    <p><span>Quero Ensinar:</span> ${item.toTeacher}</p><br />
                    <p><span>Linkedin:</span> <a href="${item.linkedin.includes('https')?item.linkedin:'https://'+item.linkedin}">${item.linkedin.includes('https')?item.linkedin:'https://'+item.linkedin}</a></p><br />
                </div>
            </div>
        `
    })
}

async function main(){

    const result = await fetch(API+'/members').then(async (data)=> {
        return await data.json()
    })

    CARDS.innerHTML = "<h1 class='card'>Loading...</h1>"

    const cards = await set_cards(result.members)

    CARDS.innerHTML = ""

    cards.forEach(item=>CARDS.innerHTML += item)

}

main()
