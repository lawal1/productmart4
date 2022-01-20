var _generatedUIDs = {};
function generateUIDWithCollisionChecking() {
    while (true) {
        var uid = ("000000" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)).slice(-6);
        if (!_generatedUIDs.hasOwnProperty(uid)) {
            _generatedUIDs[uid] = true;
            return uid;
        }
    }
}
async function register(){
    const box = document.getElementById("cbox").checked
    const firstname = document.getElementById('firstname').value
    const lastname= document.getElementById('lastname').value
    const email = document.getElementById('email').value.toLowerCase()
    const password = document.getElementById('password').value
    const cpassword = document.getElementById('cpassword').value
    if(box !== true ){
        return 
    }
    if(password != cpassword){
        alert("Passwords must be the same")
        return
    } else {
        let signedup = await auth.createUserWithEmailAndPassword(email, password).then(c => "signedup").catch(e=> {
            alert(e.message)
            return
        })
        var user = auth.currentUser;

        await user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
            return error
        });
        let writeToDB = signedup === "signedup"? await db.collection('users').add({
            firstname: firstname,
            lastname: lastname,
            email: email,
            loggedIn:false,
            agreed:"yes", 
            buyer:"yes",
            seller:"no"
        }).then((u)=>{
            console.log('user added')
            // window.location.href = '/logged.html'
            alert('A mail has been sent to the mail you submitted. Login to your mail to verify')
            window.location.href = '/'
        }).catch(e=> {
            console.log(e)
            alert(e.message)
        }) : ""

    }

       // $("#signupmodal").click()
        //signupForm.reset()
            // redirect to user index page
            //window.location = 'file:///C:/Users/user/Downloads/bleseed/sindex.html'
            //  window.location.href = '/loggedin.html' //gsl === 'true' ? window.location.href ='/signedin' :
    }

function findN(Sn){
    let n = 2
    while(Math.pow(3, n) - 1 < (Sn+1) * 2){
        n=n+1
    }
    n == 1? Sn_1 = Math.ceil((0.5)*(Math.pow(3, n) - 1)) : Sn_1 = Math.ceil((0.5)*(Math.pow(3, n-1) - 1))
    return [n, Sn_1, Sn-Sn_1 +1]  
}

async function finder(key, value){
    console.log(key, value)
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> alert('User not found '))
}