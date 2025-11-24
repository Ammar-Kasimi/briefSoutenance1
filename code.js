let valid = [0, 0, 0]


zone1 = []
zone2 = []
zone3 = []
zone4 = []
zone5 = []
zone6 = []

area1 = []
area1 = []
area1 = []
area4 = []
area5 = []
area6 = []

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
            icon: document.getElementById("form-icon").value,
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

        list.forEach((employe) => {

            card += `          
        <div class="card shadow-xl/20 flex sm:max-md:flex-col rounded-md w-19/20 bg-gray-200 h-full" id="${employe.id}">
    <div class="flex flex-col  w-7/10">
            <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${employe.icon}" alt="">
        <p class="">Name: ${employe.name}</p>
        <p class="">Email: ${employe.email}</p>
        <p class="">telephone: ${employe.number}</p>
        <p class="">Role: ${employe.role}</p>
    </div>
    <div class="md:flex-col flex self-center sm:max-md:gap-[10px] h-[97px] sm:max-md:justify-center sm:max-md:w-full md:justify-evenly md:items-center   md:w-3/10 ">
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
    let list = JSON.parse(localStorage.getItem("employes"))
    console.log(list);
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            console.log("works");

            const card_id = e.currentTarget.getAttribute("id");
            let data = list.find(card => card.id == card_id)
            console.log(card.id);
            console.log(card_id);
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
            hide_profile()
            document.querySelectorAll(".deletebtn").forEach(el=>
                el.addEventListener("click",(ele)=>{
                    ele.stopPropagation()
                    let deletedcard=list.find(card=>card.id==)
                })
            )
            localStorage.setItem("employes", JSON.stringify(list))
        })
    })

}
function hide_profile() {
    document.getElementById("back-btn").addEventListener("click", () => {
        document.getElementById("modal2container").classList.add("hidden")
    })
}
function choose_room() {
    const zonebuttons = document.querySelectorAll(".staffbtn");
    console.log("works1");
    let zoneselection;
    zonebuttons.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log("WORKS");
            // let list = JSON.parse(l
            // ocalStorage.getItem("employes"))
            const card_id = e.target.closest("div").getAttribute("id");
            // const data = list.find(card => card.id == card_id)
            console.log(card_id);
            if (card_id == "conference-room") {
                zoneselection = document.getElementById("zone1");
                available_staff(1, zoneselection)
                console.log("works2");

            }
            if (card_id == "reception-room") {
                zoneselection = document.getElementById("zone2");
                available_staff(2, zoneselection)
                console.log("works2");

            }
            if (card_id == "archive-room") {
                zoneselection = document.getElementById("zone3");
                available_staff(3, zoneselection)
                console.log("works2");

            }
            if (card_id == "staff-room") {
                zoneselection = document.getElementById("zone4");
                available_staff(4, zoneselection)
                console.log("works2");

            }
            if (card_id == "server-room") {
                zoneselection = document.getElementById("zone5");
                available_staff(5, zoneselection)
                console.log("works2");

            }
            if (card_id == "security-room") {
                zoneselection = document.getElementById("zone6");
                available_staff(6, zoneselection)
                console.log("works2");

            }
        })
    })



}

function available_staff(num, zoneselection) {
    let list = JSON.parse(localStorage.getItem("employes"))
    console.log("works3");

    if (num == 1) {
        zone1 = []
        list.forEach(element => {
            if (element.role == "manager" || element.role == "nettoyage") {
                zone1.push(element)
                show_staff(zone1, zoneselection, list, num)
            }
        });
    }
    if (num == 2) {
        zone2 = []
        list.forEach(element => {
            if (element.role == "réceptionniste" || element.role == "manager" || element.role == "nettoyage") {
                zone2.push(element)
                show_staff(zone2, zoneselection, list, num)
            }
        });
    }
    if (num == 3) {
        zone3 = []
        list.forEach(element => {
            if (element.role == "manager") {
                zone3.push(element)
                show_staff(zone3, zoneselection, list, num)
            }
        });
    }
    if (num == 4) {
        zone4 = []
        list.forEach(element => {
            if (element.role == "manager" || element.role == "nettoyage") {
                zone4.push(element)
                show_staff(zone4, zoneselection, list, num)
            }
        });
    }
    if (num == 5) {
        zone5 = []
        list.forEach(element => {
            if (element.role == "technicien IT" || element.role == "manager" || element.role == "nettoyage") {
                zone5.push(element)
                show_staff(zone5, zoneselection, list, num)
            }
        });
    }
    if (num == 6) {
        zone6 = []
        list.forEach(element => {
            if (element.role == "agent de sécurité" || element.role == "manager" || element.role == "nettoyage") {
                zone6.push(element)
                show_staff(zone6, zoneselection, list, num)
            }
        });
    }
    if (list != null) {
        localStorage.setItem("employes", JSON.stringify(list))
    }
}

const card2 = document.getElementById("available-staff");
function show_staff(arr, zoneselection, list, num) {
    card2.innerHTML = "";
    arr.forEach(e => {
        const containerr = document.createElement("div");
        containerr.innerHTML = `
   <div class=" shadow-xl/40 flex flex-col border-2 w-4/5 rounded-md  bg-gray-200 h-full worker" data-id="${e.id}">
        <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${e.icon}" alt="">

        <p class="">Name: ${e.name}</p>
        <p class="" >Email: ${e.email}</p>
        <p class="" >telephone: ${e.number}</p>
        <p class="">Role: ${e.role}</p>
    </div>
   `
        containerr.classList.add("w-full", "flex", "justify-center")
        card2.appendChild(containerr);

    });
    card2.innerHTML += `     <button class="close-btn bg-blue-500  h-[30px] text-white w-1/3 hand rounded-md p-[5px]">Close</button>`
    document.getElementById("modal3container").classList.remove("hidden")
    document.querySelector(".close-btn").addEventListener("click", close_zone_modal)
    // 
    selection_staff(card2, arr, zoneselection, list, num);
}
function selection_staff(card2, arr, zoneselection, list, num) {


    const workers = card2.querySelectorAll(".worker");
    workers.forEach(Worker => {
        Worker.addEventListener("click", (e) => {
            const workerid = e.currentTarget.dataset.id;
            console.log(zoneselection)
            const currentWorker = arr.find(Worker => Worker.id === parseInt(workerid));
            const currentlistIndex = list.findIndex(list => list.id === parseInt(workerid))
            const currentlist = list.find(list => list.id === parseInt(workerid))
            const currentWorkerid = arr.findIndex(Worker => Worker.id === parseInt(workerid));

            zoneselection.innerHTML += `
            <div class="shadow-xl/40 flex flex-col border-2 w-2/5 rounded-md  bg-gray-200 h-full worker" data-id="${currentWorker.id}">
        <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${currentWorker.icon}" alt="">

        <p class="text-xs">Name: ${currentWorker.name}</p>
        <p class="text-xs" >Email: ${currentWorker.email}</p>
        <p class="text-xs" >telephone: ${currentWorker.number}</p>
        <p class="text-xs">Role: ${currentWorker.role}</p>
    </div>
         `
            let list2 = [[], [], [], [], [], [], []]
            console.log(list2);
            if (JSON.parse(localStorage.getItem("zones")) != null) {
                list2 = JSON.parse(localStorage.getItem("zones"))
            }




            let datazone =
            {
                name: currentlist.name,
                number: currentlist.number,
                email: currentlist.email,
                role: currentlist.role,
                id: Worker.id,
                room: num
            }
            console.log(list2[num]);

            list2[num].push(datazone)
            localStorage.setItem("zones", JSON.stringify(list2))
            arr.splice(currentWorkerid, 1)
            list.splice(currentlistIndex, 1)
            localStorage.setItem("employes", JSON.stringify(list))
            Worker.remove();
            show_employes()
            showzones()
        }
        )
    })

}
function showzones() {
    console.log("begins");

    document.getElementById("zone1").innerHTML = ""
    document.getElementById("zone2").innerHTML = ""
    document.getElementById("zone3").innerHTML = ""
    document.getElementById("zone4").innerHTML = ""
    document.getElementById("zone5").innerHTML = ""
    document.getElementById("zone6").innerHTML = ""
    if (JSON.parse(localStorage.getItem("zones")) != null) {
        let list = JSON.parse(localStorage.getItem("zones"))


        list.forEach(card => {
            card.forEach(element => {
                switch (element.room) {
                    case 1:

                        document.getElementById("zone1").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`
                        break;
                    case 2:

                        document.getElementById("zone2").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`

                        break;
                    case 3:

                        document.getElementById("zone3").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`
                        break;
                    case 4:

                        document.getElementById("zone4").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`
                        break;
                    case 5:

                        document.getElementById("zone5").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`
                        break;
                    case 6:

                        document.getElementById("zone6").innerHTML += `
    <div class="shadow-xl/40 flex flex-col border-2 w-4/9 rounded-md  bg-gray-200  worker">
                <img class="aspect-square rounded-full h-[65px] w-[65px]" src="${element.icon}" alt="">

        <p class="text-xs"><span class="text-blue-700 font-bold">Name:</span> ${element.name}</p>
        
        <p class="text-xs"><span class="text-blue-700 font-bold">Role:</span> ${element.role}</p>
    </div>`
                        break;


                    default:
                        break;
                }
            });
        })
        localStorage.setItem("zones", JSON.stringify(list))
        console.log("suuuuu");
    }
}






// function renderzone() {
//         let zone1 = JSON.parse(localStorage.getItem("conference-room"))
//         let zone2 = JSON.parse(localStorage.getItem("reception-room"))
//         let zone3 = JSON.parse(localStorage.getItem("archive-room"))
//         let zone4 = JSON.parse(localStorage.getItem("staff-room"))
//         let zone5 = JSON.parse(localStorage.getItem("server-room"))
//         let zone6 = JSON.parse(localStorage.getItem("security-room"))

//         if (zone1 == null) {
//             zone1 = []
//             zone2 = []
//             zone3 = []
//             zone4 = []
//             zone5 = []
//             zone6 = []
//         }

//         let zones =document.querySelectorAll(".room-area")
//         zones.forEach(zone=>{
//             zone.addEventListener("click",(event)=>{
//                 console.log(event.target.getAttribute("id"));

//             })

//         })
//     }

function close_zone_modal() {
    document.getElementById("modal3container").classList.add("hidden")
}


fillmodal()
choose_room()
showzones()
