function useStage(stage){
    return stage+1
}

async function storeDocs(btntype){
    
    const productType = document.getElementById('productName').value
    const productGrade = document.getElementById('PV').value
    const purity = document.getElementById("purity").value // tinymce.activeEditor.getContent() // document.getElementById('content').value
    const acidity = document.getElementById('acidity').value
    const taste = document.getElementById("taste").value
    const smell = document.getElementById("smell").value
    const use = document.getElementById("use").value
    const additionalComments = document.getElementById("additionalComments").value
    const stage = 2
 
    return auth.onAuthStateChanged(async user => {
        if(user){
            const owner = user.email
            const newDoc =  {
            productType: productType, 
            productGrade: productGrade,
            purity : purity,
            acidity: acidity,
            taste: taste,
            smell: smell,
            use:use,
            additionalComments: additionalComments,
            stage: stage 
            }
            let userId = await finder("email", owner)
            const productUpdate = await update(newDoc, userId[0].currentproduct).then(res=> "updated").catch(e=> e)

            if(btntype === "next"){
                window.location.href = "/Dashboard/upload3.html"
            } else {
                alert("Product Details saved")
            }
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

async function update(obj, id){
    return await db.collection('products').doc(id).update(obj).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

async function finder(key, value){
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}