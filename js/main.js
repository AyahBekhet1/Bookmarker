var siteNameLabel = document.querySelector('.nameLabel')
var siteUrlLabel = document.querySelector('.url')
var siteNameInput =document.querySelector('#name')
var siteUrlInput =document.querySelector('#url')
var cartona1 =``
var cartona2 =``
var toggle =document.querySelector('.toggle')
var closeBook = document.querySelector('.book-close')
var openBook = document.querySelector('.book-open')
var urls=[]
var submitBtn =document.querySelector('.submit-btn')
var tableBody=document.getElementById('tableBody')
var btnIcon = document.querySelector('.btn-icon')
var errorBox=document.querySelector('.sec-modale')
var closeBtn=document.querySelector('.close-div')



siteNameInput.addEventListener('input' , ()=>{
    if(siteNameInput.value !==''){
        siteNameLabel.style.transform="translateY(-20px)";
    }
})
siteUrlInput.addEventListener('input' , ()=>{
    if( siteUrlInput.value !==''){
        siteUrlLabel.style.transform="translateY(-20px)";
    }
    
})


   
var nameArr= siteNameLabel.innerText.split('');
for(var i=0;i<nameArr.length;i++){
    cartona1+=`
    <span style='transition-delay:${i*50}ms'>${nameArr[i]}</span>
    `
}
siteNameLabel.innerHTML=cartona1;


var urlArr= siteUrlLabel.innerText.split('');
for(var i=0;i<urlArr.length;i++){
    cartona2+=`
    <span style='transition-delay:${i*50}ms'>${urlArr[i]}</span>
    `
}
siteUrlLabel.innerHTML=cartona2;


toggle.addEventListener('click' , function () {
    openBook.classList.toggle('d-none');
    closeBook.classList.toggle('d-none');
    toggle.classList.toggle('active');
    
})

if(localStorage.getItem('urls')){
    urls=JSON.parse(localStorage.getItem('urls'))
    displaySite(urls);
    toggle.classList.add('active');
    openBook.classList.remove('d-none');
    closeBook.classList.add('d-none');
}else{
    openBook.classList.add('d-none');
    closeBook.classList.remove('d-none');
}

function addSite (){
    if(siteNameValidation()== true && siteUrlValidation()==true ){

    var site={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    urls.push(site);
    saveToLocalStorage()
    displaySite (urls);
    clearInputs ();
    if(urls != []){
        toggle.classList.add('active');
        openBook.classList.remove('d-none');
    closeBook.classList.add('d-none');
   


    }
    
   }else{

    errorBox.classList.add('animated')
   }

  
}

submitBtn.addEventListener('click' , addSite)

function displaySite (urlList){
    var box=``
    for (var i=0 ; i<urlList.length ; i++){
        box+=`<tr>
        <td >${[i+1]}</td>
        <td>${urlList[i].name}</td>
        <td><button class="btn visit-btn"><a href="${urlList[i].url}" target="_blank">Visit</a></button></td>
        <td><button class="btn delete-btn" onclick='deleteUrls(${i})'>Delete</button></td>
    </tr>
        
        `
    }

    tableBody.innerHTML=box;
}

function clearInputs (){
    siteNameInput.value=''
    siteUrlInput.value=''
}

function saveToLocalStorage (){
    localStorage.setItem('urls' , JSON.stringify(urls))
}

function deleteUrls (ind){
urls.splice(ind,1);
displaySite(urls);
saveToLocalStorage();
}

function siteNameValidation(){
    var regex =/^[a-z]{3,7}$/gm;
    if(regex.test(siteNameInput.value)){
        return true;
    }
    else{
        return false;
    }
}
function siteUrlValidation(){
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/

    if(regex.test(siteUrlInput.value)){
        return true;
    }else{
        return false;
    }
  
}


siteUrlInput.addEventListener('input',function (){
    if(siteUrlValidation() || siteUrlInput.value==''){
        siteUrlInput.style.borderBottomColor='#ffb7b1'
    }else if(!siteUrlValidation()){
        siteUrlInput.style.borderBottomColor='darkred'
    }
    
})
siteNameInput.addEventListener('input',function (){
     if(siteNameValidation() || siteNameInput.value==''){
        siteNameInput.style.borderBottomColor='#ffb7b1'
    }
    
    else if(!siteNameValidation()){
        siteNameInput.style.borderBottomColor='darkred'
    }
    
})

siteNameInput.addEventListener('blur' ,function (){
    if(siteNameValidation()){
        btnIcon.classList.add('nameValid')
    }else{
        btnIcon.classList.remove('nameValid')
    }
    
} )
siteUrlInput.addEventListener('blur' ,function (){
    if(siteUrlValidation()){
        btnIcon.classList.add('urlValid')
    }else{
        btnIcon.classList.remove('urlValid')
    }
} )


closeBtn.addEventListener('click' , function (){
    errorBox.classList.remove('animated')
})