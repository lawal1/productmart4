var inspection
var sendingBy
function useInspection(type){
    inspection = type
    return type
}

function sender(type){
    sendingBy = type
    return type
}

async function storeDocs(){
    console.log(1)
    const amount = document.getElementById('amount').value
    const amount1 = document.getElementById('amount1').value
    const productDescription = document.getElementsByName("f")[1].value // tinymce.activeEditor.getContent() // document.getElementById('content').value
    const inspectionType = inspection
    const extraInspection = document.getElementById("extraInspection").value
    const sendBy = sendingBy

    console.log(sendBy, inspectionType)
    auth.onAuthStateChanged(async user => {
        try {
            if(user){
                let owner = user.email
                const newDoc = await db.collection('requestedProducts').add({
                    amount: amount,
                    amount1 : amount1 ,
                    productDescription: productDescription, 
                    inspectionType: inspectionType, 
                    extraInspection: extraInspection,
                    sendBy: sendBy,
                    who: owner,
                    productid: localStorage.getItem("id")
                })
             
                   alert("Product Details saved")
                    window.location = "/dashboard/dashboard.html"
                
            }
        } catch(e){
            console.log(e)
        }
    })

}
async function uploadImageAsPromise (imageFile, location) {
    return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(location+imageFile.name);
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
                     100;
                     console.log(percentage)
            },
            function error(err){
                console.log(err);
                reject(err);
            },
            function complete(){
                var downloadURL = task.snapshot.ref.getDownloadURL().then((url)=> {
                   //console.log(url)
                   resolve(url)
                });
                //console.log(task.snapshot, downloadURL)
                //resolve(downloadURL);
            }
        );
    });
}

async function store(arr, location, files){
    let a = [...files.files]
    // console.log(a)
    a.forEach((element,i) => {
        if(element == undefined || element.name == undefined){
            let j = files.files.indexOf(element)
            files.files.splice(j ,1)
        }
    });
    // console.log(files.files)
    if(files.files.length <1 || files.files[0] === undefined){
        return
    }
    for (var i = 0; i < files.files.length; i++) {
        if(files.files[i] === undefined){
            continue
        }
        console.log(i, files.files.length, i === files.files.length)
        if(i === files.files.length - 1){
            var imageFile = files.files[i];
            await uploadImageAsPromise(imageFile, location).then((res)=>{
                console.log(res)
                arr.push(res)
                console.log(arr);
            })
            return arr
        }
        var imageFile = files.files[i];
        await uploadImageAsPromise(imageFile, location).then((res)=>{
         arr.push(res);
          });
    }
}

async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

async function finder(key, value){
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}

function checkbox(id){
    if(id === "yearroundyes"){
        productAllYearRound = "yes"
    }else if(id === "yearroundno"){
        productAllYearRound = "no"
    } else if(id === "ssno"){
        specialStorage = "no"
    } else if(id === "ssyes"){
        specialStorage = "yes"
    } else if(id === "tempno"){
        temperatureControlledTransportation = "no"
    } else if(id === "tempyes"){
        temperatureControlledTransportation = "yes"
    }else{

    }

    return id
}