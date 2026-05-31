const ADMIN_EMAIL = "admin@gmail.com";  
const ADMIN_PIN = "123456";  
  
let editIndex = null;  
  
let profile =  
JSON.parse(localStorage.getItem("profile")) || {  
  
image:"https://i.imgur.com/6VBx3io.png",  
name:"Ray",  
bio:"Welcome to my modern split LinkTree ✨"  
  
};  
  
let links =  
JSON.parse(localStorage.getItem("links")) || [];  
  
function saveData(){  
  
localStorage.setItem(  
"profile",  
JSON.stringify(profile)  
);  
  
localStorage.setItem(  
"links",  
JSON.stringify(links)  
);  
  
}  
  
function render(){  
  
document.getElementById("profileImage").src =  
profile.image;  
  
document.getElementById("profileName").innerText =  
profile.name;  
  
document.getElementById("profileBio").innerText =  
profile.bio;  
  
const container =  
document.getElementById("linksContainer");  
  
container.innerHTML = "";  
  
const categories = [...new Set(  
links.map(link => link.category)  
)];  
  
categories.forEach(category=>{  
  
container.innerHTML += `  
<div class="category-title">  
${category}  
</div>  
`;  
  
links  
.filter(link => link.category === category)  
.forEach(link=>{  
  
container.innerHTML += `  
  
<a  
class="link-card"  
href="${link.url}"  
target="_blank">  
  
${  
link.image  
?  
`<img class="link-image" src="${link.image}">`  
:  
`<div class="link-emoji">${link.emoji}</div>`  
}  
  
<div>  
  
<div class="link-title">  
${link.title}  
</div>  
  
${  
link.bio  
?  
`<div class="link-bio">${link.bio}</div>`  
:  
""  
}  
  
</div>  
  
</a>  
  
`;  
  
});  
  
});  
  
document.getElementById("statLinks").innerText =  
links.length;  
  
renderAdminLinks();  
  
}  
  
render();  
  
function openLogin(){  
document.getElementById("loginModal")  
.style.display = "flex";  
}  
  
function closeLogin(){  
document.getElementById("loginModal")  
.style.display = "none";  
}  
  
function loginAdmin(){  
  
const email =  
document.getElementById("loginEmail").value;  
  
const pin =  
document.getElementById("loginPin").value;  
  
if(  
email === ADMIN_EMAIL &&  
pin === ADMIN_PIN  
){  
  
closeLogin();  
openAdmin();  
  
}else{  
  
alert("Email atau PIN salah!");  
  
}  
  
}  
  
function toggleInput(id){  
  
const input =  
document.getElementById(id);  
  
if(input.type === "password"){  
input.type = "text";  
}else{  
input.type = "password";  
}  
  
}  
  
function openAdmin(){  
  
document.getElementById("adminModal")  
.style.display = "flex";  
  
document.getElementById("adminProfileImage").value =  
profile.image;  
  
document.getElementById("adminProfileName").value =  
profile.name;  
  
document.getElementById("adminProfileBio").value =  
profile.bio;  
  
}  
  
function closeAdmin(){  
document.getElementById("adminModal")  
.style.display = "none";  
}  
  
function saveProfile(){  
  
profile.image =  
document.getElementById("adminProfileImage").value;  
  
profile.name =  
document.getElementById("adminProfileName").value;  
  
profile.bio =  
document.getElementById("adminProfileBio").value;  
  
saveData();  
render();  
  
alert("Profil berhasil disimpan!");  
  
}  
  
function saveLink(){  
  
const category =  
document.getElementById("linkCategory").value || "Other";  
  
const emoji =  
document.getElementById("linkEmoji").value || "🔗";  
  
const title =  
document.getElementById("linkTitle").value || "Untitled Link";  
  
const bio =  
document.getElementById("linkBio").value;  
  
const image =  
document.getElementById("linkImage").value || "";  
  
let url =  
document.getElementById("linkURL").value || "#";  
  
if(  
url !== "#" &&  
!url.startsWith("http://") &&  
!url.startsWith("https://")  
){  
url = "https://" + url;  
}  
  
if(editIndex === null){  
  
links.push({  
category,  
emoji,  
title,  
bio,  
url,  
image  
});  
  
}else{  
  
links[editIndex] = {  
category,  
emoji,  
title,  
bio,  
url,  
image  
};  
  
editIndex = null;  
  
}  
  
document.getElementById("linkCategory").value = "";  
document.getElementById("linkEmoji").value = "";  
document.getElementById("linkTitle").value = "";  
document.getElementById("linkBio").value = "";  
document.getElementById("linkURL").value = "";  
document.getElementById("linkImage").value = "";  
  
saveData();  
render();  
  
}  
  
function renderAdminLinks(){  
  
const admin =  
document.getElementById("adminLinks");  
  
admin.innerHTML = "";  
  
links.forEach((link,index)=>{  
  
admin.innerHTML += `  
  
<div class="admin-item">  
  
<div class="admin-top">  
  
<div>  
${link.title}  
</div>  
  
<div class="admin-actions">  
  
<button  
class="small-btn"  
onclick="moveUp(${index})">  
⬆️  
</button>  
  
<button  
class="small-btn"  
onclick="moveDown(${index})">  
⬇️  
</button>  
  
<button  
class="small-btn"  
onclick="editLink(${index})">  
Edit  
</button>  
  
<button  
class="small-btn"  
onclick="deleteLink(${index})">  
❌  
</button>  
  
</div>  
  
</div>  
  
</div>  
  
`;  
  
});  
  
}  
  
function moveUp(index){  
  
if(index <= 0) return;  
  
[links[index], links[index - 1]] =  
[links[index - 1], links[index]];  
  
saveData();  
render();  
  
}  
  
function moveDown(index){  
  
if(index >= links.length - 1) return;  
  
[links[index], links[index + 1]] =  
[links[index + 1], links[index]];  
  
saveData();  
render();  
  
}  
  
function editLink(index){  
  
editIndex = index;  
  
document.getElementById("linkCategory").value =  
links[index].category;  
  
document.getElementById("linkEmoji").value =  
links[index].emoji;  
  
document.getElementById("linkTitle").value =  
links[index].title;  
  
document.getElementById("linkBio").value =  
links[index].bio || "";  
  
document.getElementById("linkURL").value =  
links[index].url;  
  
document.getElementById("linkImage").value =  
links[index].image || "";  
  
}  
  
function deleteLink(index){  
  
if(confirm("Hapus link ini?")){  
  
links.splice(index,1);  
  
saveData();  
render();  
  
}  
  
}  
  
const galleryInput =  
document.getElementById("galleryInput");  
  
galleryInput.addEventListener("change", function(){  
  
const file = this.files[0];  
  
if(!file) return;  
  
const reader = new FileReader();  
  
reader.onload = function(e){  
  
document.getElementById("linkImage").value =  
e.target.result;  
  
};  
  
reader.readAsDataURL(file);  
  
});  
  
const profileGalleryInput =  
document.getElementById("profileGalleryInput");  
  
profileGalleryInput.addEventListener("change", function(){  
  
const file = this.files[0];  
  
if(!file) return;  
  
const reader = new FileReader();  
  
reader.onload = function(e){  
  
document.getElementById("adminProfileImage").value =  
e.target.result;  
  
};  
  
reader.readAsDataURL(file);  
  
});