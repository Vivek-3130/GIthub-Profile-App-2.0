const url = "https://api.github.com/users/";
const searchInputEl=document.getElementById('searchIt');
const searchButtonEl=document.getElementById('searchBtn');
const profileContainerEl = document.getElementById('profileContainer');
const loadingEl=document.getElementById('loading');

const generateProfile = (profile)=>{
    return(
        `
        <div class="profile-card">
        <div class="top-section">
          
          <div class="left">
            
            <div class="avatar">
              <img
                src="${profile.avatar_url}"
                alt="Github Profile Image"
              />
            </div>
           
            <div class="user">
              <h1>${profile.name}</h1>
              <h1>${profile.login}</h1>
            </div>
          </div>
          <a href="${profile.html_url}" target="_black">
          <button class="primary-btn">View Profile</button>
          </a>
        </div>

       
        <div class="about">
          <h2>About</h2>
          <p>${profile.bio}</p>
        </div>
       
        <div class="status">
          <div class="status-item">
            <h3>Followers</h3>
            <p>${profile.followers}</p>
          </div>

          <div class="status-item">
            <h3>Followings</h3>
            <p>${profile.following}</p>
          </div>

          <div class="status-item">
            <h3>Repositories</h3>
            <p>${profile.public_repos}</p>
          </div>
        </div>
      </div>
    `
    )
}


const fetchProfile = async()=>{

    const userName = searchInputEl.value;
   loadingEl.innerText='loading.........';
    loadingEl.style.color="black";

    try {
        const res = await fetch(`${url}${userName}`);
        const data = await res.json();

        if(data.bio){  //agr user name mil jata hai
            loadingEl.innerText='';
            profileContainerEl.innerHTML=generateProfile(data);
        }
        else{
            loadingEl.innerHTML=data.message;
            loadingEl.style.color="red";
            profileContainerEl.innerText = "";
        }
        console.log("data",data);
    } catch (error) {
        console.log({error});
        loadingEl.innerText='';
    }
};

searchButtonEl.addEventListener("click",fetchProfile);