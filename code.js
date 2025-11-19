document.getElementById("add-btn").addEventListener("click", showform)
document.getElementById("submit-btn").addEventListener("click", add_employe)


function showform() {
    document.getElementById("modalcontainer").classList.remove("hidden")
}
function hideform(){
    document.getElementById("modalcontainer").classList.add("hidden")
}

function add_employe(event) {
    event.preventDefault()
    let list = []
    list.push(JSON.parse(localStorage.getItem(("employes"))))
    let data =
    {
        name: document.getElementById("form-name").value,
        number: document.getElementById("form-email").value,
        email: document.getElementById("form-number").value,
        role: document.getElementById("roles").value
    }
    list.push(data)
    localStorage.setItem("employes", JSON.stringify(list))
    show_employes()
    hideform()
}

function show_employes() {
    const list = JSON.parse(localStorage.getItem("employes"))
    let card = ""
    console.log(list)
    list.forEach((employe, index) => {
        card += `     
        <div class="shadow-xl/20 flex flex-col rounded-md w-9/10 bg-gray-200 h-[100px]" id="${index}">
            <p class="text-lg" id="name${index}">Name:  ${employe.name}</p>
            <p class="text-lg" id="email${index}">Email:  ${employe.email}</p>
            <p class="text-lg" id="number${index}">telephone:  ${employe.number}</p>
            <p class="text-lg" id="role${index}">Role: ${employe.number}</</p>
            <div class="flex-col flex justify-evenly items-center h-full w-3/10 ">
                <button class=" modifybtn bg-blue-500 w-2/3 h-1/4 rounded-md hand">Modify</button>
                <button class=" deletebtn bg-red-500 w-2/3 h-1/4 rounded-md hand">delete</button>
            </div>
        </div>
        
    </div >
             `
    });
    document.getElementById("add-form").innerHTML = card
    localStorage.setItem("employes", JSON.stringify(list))

}
