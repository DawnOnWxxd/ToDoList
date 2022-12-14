function checklen(checkitem){

    return checkitem.length
}


function onlySpaces(str) {

    return /^\s*$/.test(str);
}

const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

let allitems = []
const saved = JSON.parse(localStorage.getItem("Key"))

if (Array.isArray(saved)){

    console.log("Datastore Exisits of length | ",checklen(saved))
    if (checklen(saved) == 0){
        console.log("Saved Datastore is Empty!")
    }else{
        console.log("Datastore content | ", saved)
        console.log("Saved Datastore Assigned to Local Array")
        allitems = saved
        console.log("Local Array | ", allitems)
    }
}else{

    console.log("No Datastore Exists!")
}

allitems.forEach(function(item){
    
    const lensaved = checklen(allitems)
    if(lensaved == 0){
        console.log("Local Array Not Found")
        return
    }else{
        initiate(item)
    }
});


function initiate(item){

    let addordel = "Addition"

    if (document.querySelectorAll(".cb:checked").length == 0){
        console.log("Initiated Addition")
    }else{
        addordel = "Deletion"
        console.log("Initiared Deletion")
        document.getElementById("field").value = ""
        initiatedelete()
    }

    if (item == null){

        const field = document.getElementById("field")
        const id = new Date().getTime()
        const txt = field.value

        if (onlySpaces(txt)){
            field.value = ""
            return
        }

        if (format.test(txt)){
            field.value = ""
            return
        }

        console.log("Initiated Construct with new Title and Id | ", txt , id)
        allitems.push({
            title: txt,
            id: id
        })
        construct(txt, id)

        field.value = ""
    }else{

        console.log("Initiated Construct with saved Title and Id | ", item.title, item.id)
        construct(item.title, item.id)
    }
}

function construct(contxt, conid){

    const frame = document.createElement("div")
    frame.className = "card"

    const rad = document.createElement("input")
    rad.setAttribute("type", "checkbox")
    rad.className = "cb"
    rad.id = conid
    if (document.querySelectorAll(".cb:checked").length == 0){
        rad.checked = false
    }else{
        red.checked = true
    }
    
    const para = document.createElement("p")
    para.innerHTML = contxt

    const dltbtn = document.createElement("button")
    if (document.querySelectorAll(".cb:checked").length == 0){
        dltbtn.className = "deletebtn"
    }else{
        dltbtn.className = "disabledbtn"
    }

    dltbtn.innerHTML = "Delete"
    dltbtn.id = conid

    console.log("Construction Complete for Title and Id | ", contxt, conid)    
    place(frame, rad, para, dltbtn)
        //console.log(allitems)
    save(allitems)
}


function place(c, c1, c2, c3){

    const mainframe = document.getElementById("panel2")
    const constructeditems = [c,c1,c2,c3]
    
    c1.addEventListener("change", toggeled)
    c3.addEventListener("click", initiatedelete)

    c.appendChild(c1)
    c.appendChild(c2)
    c.appendChild(c3)
    mainframe.appendChild(c)

    console.log("Constructed Items successfully Placed | ", constructeditems)
}

function deletebtn(idtd, todframe){
    const field = document.getElementById("field")
    field.value = ""
    field.disabled = false
    console.log("Deletion Successful for Id | ", idtd)
    allitems = allitems.filter(function(item){
        if (item.id == idtd){
            return false
        }else{
            return true
        }
    
    })        
    todframe.remove()
    save(allitems)
}

function save(data){

    console.log("Data Successfully saved | ", data)
    localStorage.setItem("Key", JSON.stringify(data))
}

function initiatedelete(event){

    const cbarr = document.querySelectorAll(".cb:checked")

    if (cbarr.length == 0){

        deletebtn(event.target.id, event.target.parentElement)
        console.log("Singular Deletion | Initiated")
    }
    cbarr.forEach(function(thing){

        deleteid = thing.id
        deletebtn(deleteid, thing.parentElement)
        const mainbtn = document.getElementById("adddelete")             
        const alldbtns = document.querySelectorAll(".disabledbtn")
        let index

        for (index = 0; index < checklen(alldbtns); index++) {

            const element = alldbtns[index];
            element.disabled = false
            element.className = "deletebtn"
            mainbtn.className = "addbtn"
            mainbtn.innerHTML = "Add"
        }
        console.log("Multiple Deletion | Initiated")    
        mainbtn.className = "addbtn"
        mainbtn.innerHTML = "Add"     
    })
    
}

function toggeled(change){

    console.log("Radio Box Toggeled")
    const cbarr = document.querySelectorAll(".cb:checked") 
    const mainbtn = document.getElementById("adddelete")
    const field = document.getElementById("field")
    field.value = ""
    
    if (checklen(cbarr) == 0){
        console.log("All checkboxes are unchecked")
        const alldbtns = document.querySelectorAll(".disabledbtn")
        let index

        for (index = 0; index < checklen(alldbtns); index++) {

            const element = alldbtns[index];
            element.disabled = false
            element.className = "deletebtn"
            mainbtn.className = "addbtn"
            mainbtn.innerHTML = "Add"
        }
        field.disabled = false
    }else{         

        console.log("Total number of checkboxes that are checked | ",checklen(cbarr))
        const alldbtns = document.querySelectorAll(".deletebtn")
        let index

        for (index = 0; index < checklen(alldbtns); index++){

            const element = alldbtns[index];
            element.disabled = true
            element.className = "disabledbtn"
            mainbtn.className = "addbtnd"
            mainbtn.innerHTML = "Delete Selected"
        }
        field.disabled = true
    }
}

