const LoadData = async () => {
    removeActiveBtn();
    document.getElementById('all-btn').classList.add("btn-active");
    manageSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();

    renderTotalIssueNumber(data.data.length);
    renderIssue(data.data);
  
}

const removeActiveBtn = () => {
const removeActive = document.getElementsByClassName("btn-active");
    for (const btn of removeActive) {
        btn.classList.remove("btn-active");
    }
};

const renderTotalIssueNumber = (length) => {
    // console.log(length);
    const totalIssue = document.getElementById('total-issue');
    totalIssue.innerText = length;
}

const manageSpinner = (status) => {
    if(status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issue-container").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("issue-container").classList.remove("hidden");
    }
}

const renderIssue = (data) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = '';
    issueContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-3');
    let issueCard = ``;
    data.forEach(issue => {
        // console.log( typeof issue.status);
        if(issue.status.toLowerCase() === 'open') {
            issueCard += `
             <div onclick="infoLoad(${issue.id})" class="py-4 rounded-sm border-t-4 border-t-green-600 space-y-3 shadow-xl">
            
            <div class="flex justify-between px-4">
                <div class="h-6 w-6 rounded-full">
                    <img src="./assets/Open-Status.png" alt="">
                </div>`;
        }
        else {
            issueCard += `
         <div onclick="infoLoad(${issue.id})" class="py-4 rounded-sm border-t-4 border-t-purple-500 space-y-3 shadow-xl">
            
            <div class="flex justify-between px-4">
                <div class="h-6 w-6 rounded-full">
                    <img src="./assets/Closed- Status .png" alt="">
                </div>       
            `;
        }

        if(issue.priority.toLowerCase() === 'high') {
            issueCard += `<p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs text-[#EF4444] font-semibold">HIGH</p>
            </div>`;
        }
        else if(issue.priority.toLowerCase() === 'medium') {
                issueCard += ` <p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs bg-[#FFF6D1] text-[#F59E0B] font-semibold">MEDIUM</p>
            </div>`;
        }
        else {
            issueCard += ` <p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs bg-[#EEEFF2] text-[#9CA3AF] font-semibold">LOW</p>
            </div>`;
        }
        issueCard += `
        <h1 class="font-semibold px-4">${issue.title}</h1>
            <p class="text-gray-600 px-4">${issue.description}</p>
             <div class="flex flex-wrap border-b border-gray-300 gap-2 pb-4 px-4">
        `;



        issue.labels.forEach(label => { 
        if(label === 'bug') {
            issueCard += `
             <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-semibold bg-[#FEECEC] text-[#EF4444]"><i class="fa-solid fa-bug"></i> BUG</p>
            `;
        }
        else if(label === 'help wanted') {
            issueCard += `
            <p class="border border-[#FDE68A] rounded-full p-1.5 text-xs font-semibold bg-[#FFF8DB] text-[#D97706]"><i class="fa-regular fa-life-ring"></i> HELP WANTED</p>
            `;
        }
        else if(label === 'enhancement') {
            issueCard += `
             <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-bold bg-[#DEFCE8] text-[#00A96E] flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g clip-path="url(#clip0_29_193)">
    <path d="M9.32813 5.87391L6.99 5.01188L6.1261 2.67188C6.06003 2.49271 5.94063 2.3381 5.78398 2.2289C5.62733 2.1197 5.44096 2.06116 5.25 2.06116C5.05904 2.06116 4.87268 2.1197 4.71603 2.2289C4.55937 2.3381 4.43997 2.49271 4.37391 2.67188L3.51188 5.01188L1.17188 5.87391C0.99271 5.93997 0.838106 6.05937 0.728905 6.21602C0.619704 6.37268 0.561157 6.55904 0.561157 6.75C0.561157 6.94096 0.619704 7.12732 0.728905 7.28398C0.838106 7.44063 0.99271 7.56003 1.17188 7.62609L3.51 8.48812L4.37391 10.8281C4.43997 11.0073 4.55937 11.1619 4.71603 11.2711C4.87268 11.3803 5.05904 11.4388 5.25 11.4388C5.44096 11.4388 5.62733 11.3803 5.78398 11.2711C5.94063 11.1619 6.06003 11.0073 6.1261 10.8281L6.98813 8.49L9.32813 7.62609C9.50729 7.56003 9.6619 7.44063 9.7711 7.28398C9.8803 7.12732 9.93885 6.94096 9.93885 6.75C9.93885 6.55904 9.8803 6.37268 9.7711 6.21602C9.6619 6.05937 9.50729 5.93997 9.32813 5.87391ZM6.35719 7.52203C6.28084 7.55017 6.2115 7.59454 6.15396 7.65208C6.09642 7.70962 6.05205 7.77896 6.02391 7.85531L5.25 9.95062L4.47797 7.85531C4.44983 7.77896 4.40546 7.70962 4.34792 7.65208C4.29038 7.59454 4.22104 7.55017 4.14469 7.52203L2.04938 6.75L4.14469 5.97797C4.22104 5.94983 4.29038 5.90546 4.34792 5.84792C4.40546 5.79038 4.44983 5.72104 4.47797 5.64469L5.25 3.54938L6.02203 5.64469C6.05017 5.72104 6.09454 5.79038 6.15208 5.84792C6.20962 5.90546 6.27896 5.94983 6.35531 5.97797L8.45063 6.75L6.35719 7.52203ZM6.5625 1.875C6.5625 1.72582 6.62177 1.58274 6.72725 1.47725C6.83274 1.37176 6.97582 1.3125 7.125 1.3125H7.6875V0.75C7.6875 0.600816 7.74677 0.457742 7.85225 0.352252C7.95774 0.246763 8.10082 0.1875 8.25 0.1875C8.39919 0.1875 8.54226 0.246763 8.64775 0.352252C8.75324 0.457742 8.8125 0.600816 8.8125 0.75V1.3125H9.375C9.52419 1.3125 9.66726 1.37176 9.77275 1.47725C9.87824 1.58274 9.9375 1.72582 9.9375 1.875C9.9375 2.02418 9.87824 2.16726 9.77275 2.27275C9.66726 2.37824 9.52419 2.4375 9.375 2.4375H8.8125V3C8.8125 3.14918 8.75324 3.29226 8.64775 3.39775C8.54226 3.50324 8.39919 3.5625 8.25 3.5625C8.10082 3.5625 7.95774 3.50324 7.85225 3.39775C7.74677 3.29226 7.6875 3.14918 7.6875 3V2.4375H7.125C6.97582 2.4375 6.83274 2.37824 6.72725 2.27275C6.62177 2.16726 6.5625 2.02418 6.5625 1.875ZM11.8125 4.125C11.8125 4.27418 11.7532 4.41726 11.6477 4.52275C11.5423 4.62824 11.3992 4.6875 11.25 4.6875H11.0625V4.875C11.0625 5.02418 11.0032 5.16726 10.8977 5.27275C10.7923 5.37824 10.6492 5.4375 10.5 5.4375C10.3508 5.4375 10.2077 5.37824 10.1023 5.27275C9.99677 5.16726 9.9375 5.02418 9.9375 4.875V4.6875H9.75C9.60082 4.6875 9.45774 4.62824 9.35225 4.52275C9.24677 4.41726 9.1875 4.27418 9.1875 4.125C9.1875 3.97582 9.24677 3.83274 9.35225 3.72725C9.45774 3.62176 9.60082 3.5625 9.75 3.5625H9.9375V3.375C9.9375 3.22582 9.99677 3.08274 10.1023 2.97725C10.2077 2.87176 10.3508 2.8125 10.5 2.8125C10.6492 2.8125 10.7923 2.87176 10.8977 2.97725C11.0032 3.08274 11.0625 3.22582 11.0625 3.375V3.5625H11.25C11.3992 3.5625 11.5423 3.62176 11.6477 3.72725C11.7532 3.83274 11.8125 3.97582 11.8125 4.125Z" fill="#00A96E"/>
  </g>
  <defs>
    <clipPath id="clip0_29_193">
      <rect width="12" height="12" fill="white"/>
    </clipPath>
  </defs>
</svg>
                    ENHANCEMENT</p>
            `;
        }
        else{
            issueCard += `
            <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-semibold bg-[#FEECEC] text-[#EF4444]"><i class="fa-brands fa-readme"></i> ${label.toUpperCase()}</p>

            `;
        }
});

        const date = new Date(issue.createdAt);

       const formatted = date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        year: 'numeric'
            });


        issueCard += `
         </div>
            <div class="text-gray-600 space-y-2 text-sm px-4">

                <p>#${issue.id} by ${issue.author}</p>
                <p>${formatted}</p>
            </div>
         </div>
        `;

    });
     issueContainer.innerHTML = issueCard;
     manageSpinner(false);
}

const renderOpenIssue = (data) => {

    const openIssue = data.filter(issue => issue.status.toLowerCase() === 'open');
    // console.log(openIssue);
    renderTotalIssueNumber(openIssue.length);
    renderIssue(openIssue);

}

const renderClosedIssue = (data) => {
  
        const closedIssue = data.filter(issue => issue.status.toLowerCase() === 'closed');
        renderTotalIssueNumber(closedIssue.length);
        renderIssue(closedIssue);
}

document.getElementById('open-btn').addEventListener('click', async () => { 

    manageSpinner(true);
        removeActiveBtn();
    document.getElementById('open-btn').classList.add("btn-active");
    
     const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    renderOpenIssue(data.data);
});


document.getElementById('closed-btn').addEventListener('click', async () => { 
manageSpinner(true);
    removeActiveBtn();
    document.getElementById('closed-btn').classList.add("btn-active");
    
     const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    renderClosedIssue(data.data);
});


document.getElementById('search-btn').addEventListener('click', async () => {

    manageSpinner(true);
     removeActiveBtn();
    const searchString = document.getElementById('search');
    const search = searchString.value.toLowerCase().trim();
    searchString.value = '';
    console.log(search);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.length);
    if(search === '') {
        alert('Please enter a search term');
        manageSpinner(false);
        LoadData();
        return;
    }
        renderTotalIssueNumber(data.data.length);
        if(data.data.length === 0) {
            const issueContainer = document.getElementById('issue-container');
            issueContainer.innerHTML = '';
            manageSpinner(false);
            issueContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-3');
            
            issueContainer.innerHTML = '<p class=" text-2xl text-center text-gray-500">No issues found</p>';
            
            return;
        }
        renderIssue(data.data);
       
});

const infoLoad = async (id) => {
    
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const issueDetails = data.data;
    const issueDetailsContainer = document.getElementById('issue-details');
    let html = ``;
    html += `
    <h3 class="text-xl font-bold mb-2">${issueDetails.title}</h3>
    <div class="flex items-center gap-3">
    `;
    if(issueDetails.status.toLowerCase() === 'open') {
        html += `
    <p class="text-center bg-base-300 p-1.5 px-4 rounded-full text-xs text-white bg-green-600 font-normal">Opened</p> 
`;
    }
    else {
        html += `<p class="text-center bg-base-300 p-1.5 px-4 rounded-full text-xs text-white bg-purple-500 font-normal">Closed</p> 
    `;
    }

    const date = new Date(issueDetails.createdAt);

       const formatted = date.toLocaleDateString('en-GB', {
          month: '2-digit',
          day: '2-digit',
        year: 'numeric'
            });

            // console.log(formatted);
    html +=`
    <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
    <p class="text-gray-500">Opened by ${issueDetails.author}</p>
    <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
    <p class="text-gray-500">${formatted}</p>
    </div>
     <div class="flex gap-2 my-6">

     `;

        issueDetails.labels.forEach(label => { 
        if(label === 'bug') {
            html += `
             <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-semibold bg-[#FEECEC] text-[#EF4444]"><i class="fa-solid fa-bug"></i> BUG</p>
            `;
        }
        else if(label === 'help wanted') {
            html += `
            <p class="border border-[#FDE68A] rounded-full p-1.5 text-xs font-semibold bg-[#FFF8DB] text-[#D97706]"><i class="fa-regular fa-life-ring"></i> HELP WANTED</p>
            `;
        }
        else if(label === 'enhancement') {
            html += `
             <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-bold bg-[#DEFCE8] text-[#00A96E] flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g clip-path="url(#clip0_29_193)">
    <path d="M9.32813 5.87391L6.99 5.01188L6.1261 2.67188C6.06003 2.49271 5.94063 2.3381 5.78398 2.2289C5.62733 2.1197 5.44096 2.06116 5.25 2.06116C5.05904 2.06116 4.87268 2.1197 4.71603 2.2289C4.55937 2.3381 4.43997 2.49271 4.37391 2.67188L3.51188 5.01188L1.17188 5.87391C0.99271 5.93997 0.838106 6.05937 0.728905 6.21602C0.619704 6.37268 0.561157 6.55904 0.561157 6.75C0.561157 6.94096 0.619704 7.12732 0.728905 7.28398C0.838106 7.44063 0.99271 7.56003 1.17188 7.62609L3.51 8.48812L4.37391 10.8281C4.43997 11.0073 4.55937 11.1619 4.71603 11.2711C4.87268 11.3803 5.05904 11.4388 5.25 11.4388C5.44096 11.4388 5.62733 11.3803 5.78398 11.2711C5.94063 11.1619 6.06003 11.0073 6.1261 10.8281L6.98813 8.49L9.32813 7.62609C9.50729 7.56003 9.6619 7.44063 9.7711 7.28398C9.8803 7.12732 9.93885 6.94096 9.93885 6.75C9.93885 6.55904 9.8803 6.37268 9.7711 6.21602C9.6619 6.05937 9.50729 5.93997 9.32813 5.87391ZM6.35719 7.52203C6.28084 7.55017 6.2115 7.59454 6.15396 7.65208C6.09642 7.70962 6.05205 7.77896 6.02391 7.85531L5.25 9.95062L4.47797 7.85531C4.44983 7.77896 4.40546 7.70962 4.34792 7.65208C4.29038 7.59454 4.22104 7.55017 4.14469 7.52203L2.04938 6.75L4.14469 5.97797C4.22104 5.94983 4.29038 5.90546 4.34792 5.84792C4.40546 5.79038 4.44983 5.72104 4.47797 5.64469L5.25 3.54938L6.02203 5.64469C6.05017 5.72104 6.09454 5.79038 6.15208 5.84792C6.20962 5.90546 6.27896 5.94983 6.35531 5.97797L8.45063 6.75L6.35719 7.52203ZM6.5625 1.875C6.5625 1.72582 6.62177 1.58274 6.72725 1.47725C6.83274 1.37176 6.97582 1.3125 7.125 1.3125H7.6875V0.75C7.6875 0.600816 7.74677 0.457742 7.85225 0.352252C7.95774 0.246763 8.10082 0.1875 8.25 0.1875C8.39919 0.1875 8.54226 0.246763 8.64775 0.352252C8.75324 0.457742 8.8125 0.600816 8.8125 0.75V1.3125H9.375C9.52419 1.3125 9.66726 1.37176 9.77275 1.47725C9.87824 1.58274 9.9375 1.72582 9.9375 1.875C9.9375 2.02418 9.87824 2.16726 9.77275 2.27275C9.66726 2.37824 9.52419 2.4375 9.375 2.4375H8.8125V3C8.8125 3.14918 8.75324 3.29226 8.64775 3.39775C8.54226 3.50324 8.39919 3.5625 8.25 3.5625C8.10082 3.5625 7.95774 3.50324 7.85225 3.39775C7.74677 3.29226 7.6875 3.14918 7.6875 3V2.4375H7.125C6.97582 2.4375 6.83274 2.37824 6.72725 2.27275C6.62177 2.16726 6.5625 2.02418 6.5625 1.875ZM11.8125 4.125C11.8125 4.27418 11.7532 4.41726 11.6477 4.52275C11.5423 4.62824 11.3992 4.6875 11.25 4.6875H11.0625V4.875C11.0625 5.02418 11.0032 5.16726 10.8977 5.27275C10.7923 5.37824 10.6492 5.4375 10.5 5.4375C10.3508 5.4375 10.2077 5.37824 10.1023 5.27275C9.99677 5.16726 9.9375 5.02418 9.9375 4.875V4.6875H9.75C9.60082 4.6875 9.45774 4.62824 9.35225 4.52275C9.24677 4.41726 9.1875 4.27418 9.1875 4.125C9.1875 3.97582 9.24677 3.83274 9.35225 3.72725C9.45774 3.62176 9.60082 3.5625 9.75 3.5625H9.9375V3.375C9.9375 3.22582 9.99677 3.08274 10.1023 2.97725C10.2077 2.87176 10.3508 2.8125 10.5 2.8125C10.6492 2.8125 10.7923 2.87176 10.8977 2.97725C11.0032 3.08274 11.0625 3.22582 11.0625 3.375V3.5625H11.25C11.3992 3.5625 11.5423 3.62176 11.6477 3.72725C11.7532 3.83274 11.8125 3.97582 11.8125 4.125Z" fill="#00A96E"/>
  </g>
  <defs>
    <clipPath id="clip0_29_193">
      <rect width="12" height="12" fill="white"/>
    </clipPath>
  </defs>
</svg>
                    ENHANCEMENT</p>
            `;
        }
        else{
            html += `
            <p class="border border-[#FECACA] rounded-full p-1.5 text-xs font-semibold bg-[#FEECEC] text-[#EF4444]"><i class="fa-brands fa-readme"></i> ${label.toUpperCase()}</p>

            `;
        }
});
           html += ` </div>
            
            <p class="text-gray-600 ">${issueDetails.description}</p>

            <div class="grid grid-cols-2  text-left bg-base-300 p-4 rounded-lg my-6">
                <div class="flex flex-col gap-1">
                    <p class="text-[#64748B]">Assignee:</p>
                    `;
        if(issueDetails.assignee === "") {
            html += `<p class="font-semibold text-white"><span class=" bg-blue-700">No one assigned </span></p>`;
        } else {
           html += `<p class="font-semibold">${issueDetails.assignee}</p>`;
        }
                    html += `</div>
                <div class="flex flex-col text-left gap-1">
                    <p class="text-[#64748B]">Priority:</p>
`;

if(issueDetails.priority.toLowerCase() === 'high') {
            html += `<p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs text-white bg-[#EF4444] font-normal">HIGH</p>`;
        }
        else if(issueDetails.priority.toLowerCase() === 'medium') {
                html += ` <p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs text-white bg-[#F59E0B] font-semibold">MEDIUM</p>
            </div>`;
        }
        else {
            html += ` <p class="w-20 text-center bg-base-300 p-1.5 rounded-full text-xs text-white bg-[#9CA3AF] font-semibold">LOW</p>
            </div>`;
        }
                    html += `
                </div>
            </div>
            `;
    issueDetailsContainer.innerHTML = html;
    my_modal_1.showModal();
}

LoadData();