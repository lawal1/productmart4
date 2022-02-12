function useStage(stage){
    return stage+1
}
var productAllYearRound = "" // document.getElementById("productAllYearRound").value || 0
var specialStorage = "" //document.getElementById("specialStorage").value || 0
var temperatureControlledTransportation = ""
var saved = undefined
async function storeDocs(btntype){
    const productName = document.getElementById('productName').value
    const productVariety = document.getElementById('PV').value
    const productDescription = document.getElementById("PD").value // tinymce.activeEditor.getContent() // document.getElementById('content').value
    const productCategory = document.getElementById('ProdCat').value
    const farmingMethod = document.getElementById("farMet").value
    const countryOfOrigin = document.getElementById("COO").value
    const locationOfProduct = document.getElementById("LOC").value
    const isgmo = document.getElementById("GMO").value
    const cropYear = document.getElementById("CropYear").value
   // document.getElementById("temperatureControlledTransportation").value || 0
    let from = document.getElementById("from").value || ""
    let to = document.getElementById("to").value || ""
    let storageDesc = document.getElementById("storagereq").value || ""
    let tempDetails = document.getElementById("tempdetails").value || ""
    const stage = 1
    const pressed = btntype
 
    return saved === true && pressed === "next" ? window.location.href = "/Dashboard/upload2.html"  : auth.onAuthStateChanged(async user => {
        if(user){
            let owner = user.email
            const newDoc = await db.collection('products').add({
                productName: productName,
                productVariety: productVariety,
                productDescription: productDescription, 
                productCategory: productCategory, 
                farmingMethod: farmingMethod,
                countryOfOrigin: countryOfOrigin,
                locationOfProduct: locationOfProduct,
                isgmo: isgmo,
                cropYear: cropYear,
                productAllYearRound:productAllYearRound,
                specialStorage: specialStorage,
                temperatureControlledTransportation: temperatureControlledTransportation,
                stage: stage,
                owner: owner,
                from: from,
                to: to,
                storageDesc: storageDesc,
                tempDetails: tempDetails,
                
            })
            let userId = await finder("email", owner)
            let updating = await update("currentproduct", newDoc.id, userId[1])

           if(pressed === "next"){
               window.location.href = "/Dashboard/upload2.html"
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