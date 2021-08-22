let vue = new Vue({
    el: '#app',
    data: {
        arrayStories: [
            {
                name: 'Очень страшная история',
                description: 'Очень страшная история. Не рекомендуется к прослушиванию беременным детям и их внукам.',
                duration: '10:10',
                rating: 4.57,
                id: 1,
                todolist: [
                    'Дойти до стадиона "Торпедо"',
                    'Идти в парк "Топольки"',
                    'Дойти до школы №192',
                ],

                locations: [
                    'Амурская область, Свободный Орджоникидзе 73', 'Амурская область, Свободный, Орджоникидзе 53',
                    'Амурская область, Свободный, Орджоникидзе 53', 'Амурская область, Свободный, Октябрьская 33',
                    'Амурская область, Свободный, Октябрьская 33', 'Амурская область, Свободный, Матросова 50',
                ],
            },
        ],
    },

    methods: {
        signOut: function() {
            firebase.auth().signOut().catch((error) => { return error; });  
            
            location.href = 'reg.html'
        },
    }
})

firebase.auth().onAuthStateChanged((user) => {
    if (user) {}
});

const swiper = new Swiper('.swiper-container', { direction: 'horizontal', });

let podcastPlay = () => document.getElementById('podcast').play();
let podcastPause = () => document.getElementById('podcast').pause();

setTimeout(() => {
    for (let i = 0; i < vue.arrayStories.length; i++) {
        let story = vue.arrayStories[i];

        /*html*/
        swiper.appendSlide(`
            <div class="swiper-slide" id="history-cards">
                    <div class="div-stat-txt img-pod">
                        <h1 class="txt-title-1-p">${story.name}</h1>
                        <p class="txt-desc-2-p">${story.description}</p>
            
                        <div class="columns">
                            <div class="column div-time-st">
                                <div>
                                    <ion-icon name="time-outline" class="icon-st"></ion-icon>
                                    <br>
                                    <span class="txt-time-st">${story.duration}</span>
                                </div>
                            </div>
            
                            <div class="column div-rat-st">
                                <div>
                                    <ion-icon name="analytics-outline" class="icon-st"></ion-icon>
                                    <br>
                                    <span class="txt-rat-st">${story.rating}</span> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box butt-box-p"> 
                        <a class="a-butt-box-p-pl" onclick="openStory(${story.id})"><ion-icon name="play-circle-outline" class="icon-butt-box"></ion-icon></a>
                        <a class="a-butt-box-p-st"><ion-icon name="star-outline" class="icon-butt-box"></ion-icon></a>
                    </div> 
                </div>
            </div> 
        `);

        document.getElementById('stories-content').innerHTML += /*html*/`
            <div class="story" id="story${story.id}" style="color: #fff; display: none;">
                <h3 class="text-center">${story.name}</h3>

                <div id="map" style="height: 400px"></div>

                <div id="podcast-audio">
                    <audio preload="auto" controls id="podcast">
                        <source src="podcasts/podcast.mp3" />
                    </audio>
                </div>

                <div class="todo" id="todo-list">
                    <ul class="list-group" id="todo-list-content-${story.id}">
                        
                    </ul>
                </div>
            </div>
        `;

        for (let i = 0; i < story.todolist.length; i++) {
            if (i == 0) {
                document.getElementById(`todo-list-content-${story.id}`).innerHTML += `<li class="list-group-item active todo-${story.id}">${story.todolist[i]} <button class="btn btn-success check-btn" onclick="checkTask('todo-${story.id}')"><i class="fas fa-check"></i></button></li>`;
            } else {
                document.getElementById(`todo-list-content-${story.id}`).innerHTML += `<li class="list-group-item todo-${story.id}">${story.todolist[i]}</li>`;
            }
        }
    } 
}, 2000);

numberNext = 0;

function infoWay(text) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
      
    Toast.fire({
        icon: 'info',
        title: `${text}`
    });
}

function checkTask (classTask) {
    numberNext++;
    let task = document.getElementsByClassName(classTask)[0];
    task.parentNode.removeChild(task);


    let nextTask = document.getElementsByClassName(classTask)[0];
    try {
        nextTask.className = `list-group-item ${classTask} active`;
        nextTask.innerHTML += `<button class="btn btn-success check-btn" onclick="checkTask('${classTask}')"><i class="fas fa-check"></i></button>`;    
    } catch {
        podcastPlay();
    }

    switch (numberNext) {
        case 1: setTimeout(() => { infoWay(vue.arrayStories[0].todolist[1]); podcastPause(); changeLocation(vue.arrayStories[0].locations[2], vue.arrayStories[0].locations[3]); }, 37000); break;
        case 2: setTimeout(() => { infoWay(vue.arrayStories[0].todolist[2]); podcastPause(); changeLocation(vue.arrayStories[0].locations[4], vue.arrayStories[0].locations[5]); }, 49000); break;
    }

    podcastPlay();
}

function openStory(id) {
    document.getElementById(`story${id}`).style.display = "block";
    document.getElementById(`stories`).style.display = "none";

    ymaps.ready(init);

    setTimeout(() => { podcastPlay() }, 3000);
    setTimeout(() => { infoWay(vue.arrayStories[0].todolist[0]); podcastPause() }, 19000);
}