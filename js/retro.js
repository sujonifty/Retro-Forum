
const getAllPosts = async (item) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/${item}`;
    const response = await fetch(url);
    const data = await response.json();
    const allPosts = data.posts;
    // console.log(allPosts)
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    allPosts?.forEach(post => {
        loadingSpinner(true);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full  bg-[#F3F3F5] shadow-xl">
                    <div class="gap-x-10 p-4 lg:p-10 flex flex-col lg:flex-row ">
                        <div class="indicator ">
                            <span id="active-icon" class="indicator-item badge ${post.isActive?'bg-green-500':'bg-red-500'}"></span>
                            <div class="grid w-32 h-32 bg-white mb-3  place-items-center">
                                <img src="${post?.image}" alt="author-image">
                            </div>
                        </div>

                        <div class="space-y-5">
                            <div class="flex gap-5">
                                <p>#${post?.category}</p>
                                <p>Author:${post?.author?.name}</p>
                            </div>
                            <div class="border-b-gray-400 border-dashed border-b-2 pb-2">
                                <p class="text-[20px] text-[#12132D] font-bold text-left">${post?.title}</p>
                                <p class="text-justify inter lg:text-left">${post?.description}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex justify-start  items-center space-x-10">
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-envelope"></i>
                                        <span> ${post?.comment_count}</span>
                                    </div>
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-eye"></i>
                                        <span> ${post?.view_count}</span>
                                    </div>
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-clock"></i>
                                        <span> ${post?.posted_time}</span>
                                    </div>
                                </div>

                                <div class="flex justify-center items-center">
                                    <button onclick="markBtn('${post.title}','${post.view_count}')" class=" markBtn bg-green-500 rounded-full hover:bg-green-200 w-[28px] h-[28px]"><i class="fa-regular fa-envelope-open"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
        postContainer.appendChild(div);

        setTimeout(loadingSpinner(false), 5000);
    });
}

/// Mark as read section
const countArea = document.getElementById('count-field');
let count = 0;
const markBtn = (title, view) => {
    count++;
    countArea.innerText = count;

    const getMarkAsReadContainer = document.getElementById('mark-container');
    const divContainer = document.createElement('div');
    divContainer.classList = 'flex justify-between items-center p-4 lg:p-5'
    divContainer.innerHTML = `
        <div>
            <p class="text-[20px] text-[#12132D] font-bold">${title}</p>
        </div>
        <div class=" flex justify-center items-center space-x-4 p-5">
            <i class="fa-regular fa-eye"></i>
            <p> ${view}</p>
        </div>
`
    getMarkAsReadContainer.appendChild(divContainer);
}


// latest post section 
const getLatestPosts = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const response = await fetch(url);
    const data = await response.json();
    const latestPosts = data;

    latestPosts.forEach(newPost => {
        // console.log(newPost);
        const latestPostContainer = document.getElementById('latest-post');
        const latestDivContainer = document.createElement('div');
        latestDivContainer.classList = 'card lg:w-96 bg-base-100 shadow-xl my-5';
        latestDivContainer.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${newPost.cover_image}" alt="cover-image"
                class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <div class="space-y-5">
                    <div class="space-x-3 text-left">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${newPost.author?.posted_date?newPost.author?.posted_date:"No published date"}</span>
                    </div>
                
                <div class="pb-2">
                    <p class="text-[20px] text-[#12132D] font-bold text-left">${newPost?.title}</p>
                    <p class="text-justify lg:text-left">${newPost?.description}</p>
                </div>
                <div class="flex  justify-start  items-center space-x-10">

                    <div class=" w-[44px] h-[44px] rounded-[100%]">
                        <img class="w-full" src="${newPost?.profile_image}" alt="">
                    </div>
                    <div>
                        <p class=" font-bold">${newPost?.author?.name}</p>
                        <p>${newPost.author?.designation?newPost.author?.designation:"Unknown"}</p>
                    </div>
                </div>
            </div>

        </div>
        `
        latestPostContainer.appendChild(latestDivContainer);
    })
}

// search Posts 
const getSearchPosts = () => {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    inputText = searchField.value;
    searchText = inputText.toLowerCase();
    console.log(searchText)
    if (searchText == 'coding' || searchText == 'music' || searchText == 'comedy') {
        getAllPosts(`posts?category=${searchText}`);
    }
    else {
        alert('Invalid Text');
    }
    searchField.value = '';

    loadingSpinner(false);
}

// loading spinner section 
const loadingSpinner = (isSpinner) => {
    const showSpinner = document.getElementById('loading-spinner');
    if (isSpinner) {
        showSpinner.classList.remove('hidden');
    }
    else {
        showSpinner.classList.add('hidden');
    }
}

getAllPosts('posts');
getLatestPosts();

