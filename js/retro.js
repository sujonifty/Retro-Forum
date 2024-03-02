
const getAllPosts = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    const response = await fetch(url);
    const data = await response.json();
    const allPosts = data.posts;

    allPosts.forEach(post => {        
        const postContainer = document.getElementById('post-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full  bg-[#F3F3F5] shadow-xl">
                    <div class="gap-x-10 p-4 lg:p-10 flex flex-col lg:flex-row ">
                        <div class="indicator ">
                            <span id="active-icon" class="indicator-item badge bg-green-500"></span>
                            <div class="grid w-32 h-32 bg-white mb-3  place-items-center">
                                <img src="${post.image}" alt="author-image">
                            </div>
                        </div>

                        <div class="space-y-5">
                            <div class="flex gap-5">
                                <p>#${post.category}</p>
                                <p>Author:${post.author.name}</p>
                            </div>
                            <div class="border-b-gray-400 border-dashed border-b-2 pb-2">
                                <p class="text-[20px] text-[#12132D] font-bold text-left">${post.title}</p>
                                <p class="text-justify lg:text-left">${post.description}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex justify-start  items-center space-x-10">
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-envelope"></i>
                                        <span> ${post.comment_count}</span>
                                    </div>
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-eye"></i>
                                        <span> ${post.view_count}</span>
                                    </div>
                                    <div class="space-x-3">
                                        <i class="fa-regular fa-clock"></i>
                                        <span> ${post.posted_time}</span>
                                    </div>
                                </div>

                                <div class="flex justify-center items-center">
                                    <button id="mark-btn" class=" bg-green-500 rounded-full hover:bg-green-200 w-[28px] h-[28px]"><i class="fa-regular fa-envelope-open"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
        postContainer.appendChild(div);

        // checked active status 
        if (!post.isActive) {
            const activeIcon = document.getElementById('active-icon');
            activeIcon.classList.remove('bg-green-500');
            activeIcon.classList.add('bg-red-500');
        }

        
        const getMarkBtn = document.getElementById('mark-btn');
        getMarkBtn.addEventListener('click', () => {
            const getMarkAsReadContainer = document.getElementById('mark-container');
            const divContainer = document.createElement('div');
            divContainer.classList = 'flex justify-between items-center p-4 lg:p-5'
            divContainer.innerHTML = `
            <div>
                <p class="text-[20px] text-[#12132D] font-bold">${post.title}</p>
            </div>
            <div class=" flex justify-center items-center space-x-4 p-5">
                <i class="fa-regular fa-eye"></i>
                <p> ${post.view_count}</p>
            </div>
            `
            getMarkAsReadContainer.appendChild(divContainer);
        })
    });
}

const getLatestPosts = async () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const response = await fetch(url);
    const data = await response.json();
    const latestPosts = data;
    
    latestPosts.forEach(newPost =>{
        console.log(newPost);
    })
}

getAllPosts()
getLatestPosts()