$(document).ready(function(){
    var currentUser = firebase.auth().currentUser
    auth.onAuthStateChanged(async user => {
    if(user){
        const mail = user.email
        const id = localStorage.getItem("id")
        const u = await findProduct(id)
        console.log(u)
        const arr = [
            {id:"image", value: u.url},
            {id:"description", value: u.productDescription},
            {id:"constituents", value: ""},
            {id:"place", value:u.locationOfProduct},
            {id:"location", value:u.countryOfOrigin},
            {id:"cultivationtype", value:u.isgmo},
            {id:"cert", value:u.cert},
            {id:"storage", value:u.specialStorage}
            
        ]
        populate(arr)
    } else {
        const id = localStorage.getItem("id")
        const u = await findProduct(id)
        console.log(u)
        const arr = [
            {id:"image", value: u.url[0]},
            {id:"description", value: u.productDescription},
            {id:"constituents", value: ""},
            {id:"place", value:u.locationOfProduct},
            {id:"location", value:""},
            {id:"cultivationtype", value:u.isgmo},
            {id:"cert", value:u.cert},
            {id:"storage", value:u.specialStorage}
         

        ]
        populate(arr)
    }
})
 
}) 

async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    })
}

async function findId(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].id
    })
}

async function findProduct(id){
    return await db.collection('products').doc(id).get().then(data=>{
        return data.data()
    })
}

function populate(arr){
    return arr.map(element=>{
        if(element.id == 'image'){
        return document.getElementById(element.id).src = element.value
        }
        else
        return document.getElementById(element.id).innerHTML = element.value
    })
}

function changePw(){
    const pw = document.getElementById('newpassword').value
    return auth.onAuthStateChanged(user =>{
        user.updatePassword(pw).then(function() {
            alert('done')
          }).catch(function(error) {
            alert(error)
          });
    })
}

async function setDetails(){
    const accountnumber = document.getElementById('accountnumber').value
    const bankname = document.getElementById('bankname').value
    await auth.onAuthStateChanged(async user =>{
        const id = await findId(user.email)
        console.log(id)
        await db.collection('users').doc(id).update({bankname: bankname, accountnumber: accountnumber}).then(()=> {
            swal('Your account details has been updated')
            document.getElementById('bankname').value = bankname
            document.getElementById('accountnumber').value = accountnumber
        }).catch(e=> swal(e.message))
    })
    // window.location.reload()
}

async function isLoggedIn(id){
    console.log(id)
    auth.onAuthStateChanged(async user => {
        if(user){
            console.log(user)
            window.location = "/dashboard/quote1.html"
            
        } else {
            document.getElementById(id).classList.add("modal-trigger")
            document.getElementById(id).href = "#modal1"
        }
    })

    
}

// var circle = document.querySelector('circle');
// var radius = circle.r.baseVal.value;
// var circumference = radius * 2 * Math.PI;

// circle.style.strokeDasharray = `${circumference} ${circumference}`;
// circle.style.strokeDashoffset = `${circumference}`;

// function setProgress(percent) {
//   const offset = circumference - percent / 100 * circumference;
//   circle.style.strokeDashoffset = offset;
// }

// const input = document.querySelector('#inp');
// setProgress(10);