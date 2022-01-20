async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    }).catch(e=> console.log(e))
}
async function finder(key, value){
    console.log(key, value)
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}
async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}
async function login(){

    const email = document.getElementById('email').value.toLowerCase()
    const password = document.getElementById('password').value
    auth.signInWithEmailAndPassword(email, password).then(async c => {
        const u = await finder('email', email)
        auth.onAuthStateChanged(async user=>{
            if(user.emailVerified === true || user.email=='rorewole@gmail.com'){
                window.location.href = '/logged.html' 
            } else {
                alert('To continue, Kindly login to your email and verify it')
            }
        })
    //   const finalizing = await update('loggedIn', true, u[1])
    //   console.log(finalizing)

//    window.location.href = '/logged.html' 
    }).catch(e =>{
        console.log(e)
        alert(e.message)
    })
}

// needed forget password page
// verify email page
// 