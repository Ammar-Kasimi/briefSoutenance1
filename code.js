let valid = [0, 0, 0]


document.getElementById("add-btn").addEventListener("click", showform)
document.getElementById("submit-btn").addEventListener("click", add_employe)
document.getElementById("form-name").addEventListener("blur", checkvalid)
document.getElementById("form-number").addEventListener("blur", checkvalid)
document.getElementById("form-email").addEventListener("blur", checkvalid)
document.getElementById("addexpbtn").addEventListener("click", add_experience)

show_employes()

function showform() {
    document.getElementById("modalcontainer").classList.remove("hidden")
}
function hideform() {
    document.getElementById("modalcontainer").classList.add("hidden")
}

function add_employe(event) {
    event.preventDefault()
    console.log(valid);

    if (are_equal(valid, [1, 1, 1]) == true) {
        valid = [0, 0, 0]
        console.log(valid)
        document.getElementById("form-name").classList.remove("bg-green-600")
        document.getElementById("form-number").classList.remove("bg-green-600")
        document.getElementById("form-email").classList.remove("bg-green-600")
        document.getElementById("reg1").classList.add("hidden")
        document.getElementById("reg2").classList.add("hidden")
        document.getElementById("reg3").classList.add("hidden")
        let companies = document.querySelectorAll(".company")
        let start = document.querySelectorAll(".from")
        let finish = document.querySelectorAll(".to")

        let list = []
        let count = JSON.parse(localStorage.getItem("counter"))
        if (count == null) {
            count = 0
        }
        let exps = []
        let obj
        for (let i = 0; i < companies.length; i++) {
            obj = {
                comp: companies[i].value,
                from: start[i].value,
                to: finish[i].value
            }
            console.log(obj);

            exps.push(obj)
        }
        console.log(exps);

        if (JSON.parse(localStorage.getItem("employes")) != null) {
            list = JSON.parse(localStorage.getItem("employes"))
        }
        let data =
        {
            name: document.getElementById("form-name").value,
            number: document.getElementById("form-number").value,
            email: document.getElementById("form-email").value,
            role: document.getElementById("roles").value,
            id: count,
            experiences: exps
        }
        count++
        list.push(data)
        localStorage.setItem("counter", JSON.stringify(count))
        localStorage.setItem("employes", JSON.stringify(list))
        show_employes()
        hideform()
        fillmodal()
    }
}

function show_employes() {
    let list = JSON.parse(localStorage.getItem("employes"))
    if (list != null) {
        let card = ""

        list.forEach((employe, index) => {

            card += `          
        <div class="card shadow-xl/20 flex sm:max-md:flex-col rounded-md w-19/20 bg-gray-200 h-full" id="${index}">
    <div class="flex flex-col  w-7/10">
        <p class="" id="name${index}">Name: ${employe.name}</p>
        <p class="" id="email${index}">Email: ${employe.email}</p>
        <p class="" id="number${index}">telephone: ${employe.number}</p>
        <p class="" id="role${index}">Role: ${employe.role}</p>
    </div>
    <div class="md:flex-col flex sm:max-md:gap-[10px] sm:max-md:justify-center sm:max-md:w-full md:justify-evenly md:items-center  h-full md:w-3/10 ">
        <button class=" modifybtn bg-blue-500 w-full md:w-2/3 h-[30px] md:h-1/4 rounded-md hand">Modify</button>
        <button class=" deletebtn bg-red-500 w-full md:w-2/3 h-[30px] md:h-1/4 rounded-md hand">delete</button>
    </div>
</div>
             `

        });
        document.getElementById("cards").innerHTML = card
        localStorage.setItem("employes", JSON.stringify(list))
    }
}
function checkvalid(e) {
    console.log("check");

    let nom = document.getElementById("form-name")
    let nombre = document.getElementById("form-number")
    let mail = document.getElementById("form-email")
    let reg1 = document.getElementById("reg1")
    let reg2 = document.getElementById("reg2")
    let reg3 = document.getElementById("reg3")

    let num = e.target.getAttribute('id')

    if (num == nom.getAttribute("id")) {

        let regex1 = /^[a-zA-Z ]+$/
        if (regex1.test(nom.value) == false) {
            reg1.classList.remove("hidden")

            nom.classList.add("border-red-500")
            valid[0] = 0
        }
        if (regex1.test(nom.value) == true) {
            nom.classList.add("border-green-600")
            reg1.classList.add("hidden")
            nom.classList.remove("border-red-500")
            valid[0] = 1
        }

    }

    if (num == mail.getAttribute("id")) {


        let regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (regex2.test(mail.value) == false) {
            reg2.classList.remove("hidden")

            mail.classList.add("border-red-500")
            valid[1] = 0
        }
        if (regex2.test(mail.value) == true) {
            mail.classList.add("border-green-600")
            reg2.classList.add("hidden")
            mail.classList.remove("border-red-500")
            valid[1] = 1
        }
    }
    if (num == nombre.getAttribute("id")) {


        let regex3 = /^[0-9]{10}$/
        if (regex3.test(nombre.value) == false) {
            reg3.classList.remove("hidden")

            nombre.classList.add("border-red-500")
            valid[2] = 0
        }
        if (regex3.test(nombre.value) == true) {
            nombre.classList.add("border-green-600")
            reg3.classList.add("hidden")
            nombre.classList.remove("border-red-500")
            valid[2] = 1
        }
    }
}
function are_equal(arr1, arr2) {
    let equal = true
    for (let i = 0; i < 3; i++) {
        if ((arr1[i] == arr2[i]) == false) {
            equal = false
        }
    }
    return equal
}

function add_experience() {
    document.getElementById("expfield").innerHTML += `
    <label for="">Company name</label>
    <input id="" type="text" class="company bg-white rounded-md"> 
    <div class="flex mt-[10px] gap-[10px]">
    <label for="">From:</label>
    <input id="" type="date" class="from bg-white rounded-md">
    <label for="">To:</label>
    <input id="" type="date" class="to bg-white rounded-md">
    </div>
    `
}
function fillmodal() {
    const cards = document.querySelectorAll(".card");
    console.log("works1");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            console.log("works");
            let list = JSON.parse(localStorage.getItem("employes"))
            const card_id = e.currentTarget.getAttribute("id");
            const data = list.find(card => card.id == card_id)
            console.log(data);
            document.getElementById("modal2container").classList.remove("hidden")
            let profile = document.getElementById("profilecard")
            let expdata = ""
            expdata += `<div class="flex flex-col justify-evenly items-center h-full w-full ">
        <p class="text-lg font-bold" id="name${card_id}"><span class="text-blue-500">Name:</span> ${data.name}</p>
        <p class="text-lg font-bold" id="email${card_id}"><span class="text-blue-500">Email:</span> ${data.email}</p>
        <p class="text-lg font-bold" id="number${card_id}"><span class="text-blue-500">telephone:</span> ${data.number}</p>
        <p class="text-lg font-bold" id="role${card_id}"><span class="text-blue-500">Role:</span> ${data.role}</p>
        <p class="text-2xl font-bold" >Experience proffessionels</p>

        `;

            list[card_id].experiences.forEach(ele => {
                expdata += `
                <p class="text-lg font-bold" ><span class="text-blue-500">company:</span> ${ele.comp}</p>
                <div class="flex gap-[10px] h-full w-full>
                <p class="text-lg font-bold" >from : ${ele.from}</p>
                <p class="text-lg font-bold" >to: ${ele.to}</p>
                </div>
                `
            });

            expdata += ` <button id="back-btn" class=" bg-blue-500 w-full text-white md:w-1/2 h-[30px] rounded-md hand">go back</button>
            </div>`
            profile.innerHTML = expdata
            localStorage.setItem("employes", JSON.stringify(list))
        })
    })

}

fillmodal()
// list.forEach(e => {
//         addeddata+=
//         `<div class="flex flex-col  w-7/10">
//         <p class="" id="name${index}">Name: ${e.name}</p>
//         <p class="" id="email${index}">Email: ${e.email}</p>
//         <p class="" id="number${index}">telephone: ${e.number}</p>
//         <p class="" id="role${index}">Role: ${e.role}< /p>
//     </div>
//         `
//        });