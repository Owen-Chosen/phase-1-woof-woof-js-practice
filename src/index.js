let globalData = []
fetch ('http://localhost:3000/pups')
.then(res => res.json())
.then(data => {
    globalData = data.slice()
    data.forEach(element => {
        const span = document.createElement ('span');
        span.innerHTML = element.name;
        document.querySelector('#dog-bar').append(span)
    });
})

const dogBar = document.querySelector ('#dog-bar')
dogBar.addEventListener ('click', (event) => {
    globalData.forEach (element => {
        if (element.name === event.target.textContent) {
            const imgTag = document.createElement ('img');
            imgTag.src = element.image;
            const dogName = document.createElement ('h2');
            dogName.textContent = element.name;
            const dogButton = document.createElement ('button');
            dogButton.id = element.name; dogButton.classList.add('good-bad-button')
            if (element.isGoodDog) dogButton.innerHTML = 'Good Dog!';
            else dogButton.innerHTML = 'Bad Dog!';
            const dogInfo = document.querySelector('#dog-info');
            dogInfo.append (imgTag);
            dogInfo.append (dogName);
            dogInfo.append (dogButton);
        }
    })
})

const dogInfo = document.querySelector ('#dog-info')
dogInfo.addEventListener ('click', (event) => {
    if (event.target.className === 'good-bad-button') {
        if (event.target.textContent === 'Good Dog!') {
            let fetchId;
            for (const element of globalData) {
                if (event.target.id === element.name) {
                    fetchId = element.id; 
               }
            }
            fetch(`http://localhost:3000/pups/${fetchId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({isGoodDog: false})
            })
            .then (res => res.json()).then (data => {
                globalData = data.slice()
                console.log (globalData)
                for (const element of globalData) {
                    if (fetchId === element.name) event.target.textContent = element.isGoodDog
                }
            })
        }
        else {
            let fetchId;
            for (const element of globalData) {
                if (event.target.id === element.name) {
                    fetchId = element.id; 
               }
            }
            fetch(`http://localhost:3000/pups/${fetchId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({isGoodDog: true})
            })
            .then (res => res.json()).then (data => {
                globalData = data.slice()
                console.log (globalData)
                for (const element of globalData) {
                    if (fetchId === element.name) event.target.textContent = element.isGoodDog
                }
            })
        }
    }
})

const filterButton = document.querySelector ('#good-dog-filter');
filterButton.addEventListener ('click', (event) => {
    document.querySelector('#dog-bar').textContent = ''
    filterButton.innerHTML = 'Filter good dogs: ON'
    fetch ('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            const span = document.createElement ('span');
            span.innerHTML = element.name;
            if (element.isGoodDog) document.querySelector('#dog-bar').append(span)
        });
    })
})