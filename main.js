const elUserList = document.querySelector(".user-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");
const tempUser = document.querySelector(".temp-user").content;
const tempComment = document.querySelector(".comment-temp").content;
const tempPost = document.querySelector(".post-temp").content;
const frag = new DocumentFragment();

function renderItems(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const template = tempUser.cloneNode(true);
    template.querySelector(".item-id").textContent = item.id;
    template.querySelector(".item-name").textContent = item.username;
    template.querySelector(".item-fullname").textContent = item.name;
    template.querySelector(".item-email").textContent = item.email;
    template.querySelector(".item-email").href = `mailto:${item.email}`;
    template.querySelector(".location-link").href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
    template.querySelector(".phone-link").href = `tel:${item.phone}`;
    template.querySelector(".site-link").href = `mailto:${item.website}`;
    template.querySelector(".company-name").textContent = item.company.name;
    template.querySelector(".company-catch").textContent = item.company.catchPhrase;
    template.querySelector(".company-bs").textContent = item.company.bs;
    template.querySelector(".btn").dataset.id = item.id;
    frag.appendChild(template);
  });
  node.appendChild(frag)
}

function renderPost(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const template = tempPost.cloneNode(true);
    template.querySelector(".post-id").textContent = item.id;
    template.querySelector(".post-title").textContent = item.title;
    template.querySelector(".post-bs").textContent = item.body;
    template.querySelector(".btn").dataset.id = item.id;
    frag.appendChild(template);
  });
  node.appendChild(frag)
}

function renderComment(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const template = tempComment.cloneNode(true);
    template.querySelector(".item-id").textContent = item.id;
    template.querySelector(".item-name").textContent = item.name;
    template.querySelector(".company-bs").textContent = item.body;
    frag.appendChild(template);
  });
  node.appendChild(frag)
}

async function userGet(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderItems(data, elUserList)
  } catch (error) {
    console.log(error);
  }
}

async function postGet(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    renderPost(data, elPostList)
  } catch (error) {
    console.log(error);
  }
}

async function commentGet(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    renderComment(data, elCommentList);
  } catch (error) {
    console.log(error);
  }
}
userGet("https://jsonplaceholder.typicode.com/users");

elUserList.addEventListener("click", evt => {
  if(evt.target.matches(".btn")){
    const userId = Number(evt.target.dataset.id);
    console.log(userId);
    postGet(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    elCommentList.innerHTML = "";
  }
});

elPostList.addEventListener("click", evt => {
  if(evt.target.matches(".btn")){
    const userId = Number(evt.target.dataset.id);
    console.log(userId);
    commentGet(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`);
  }
});
