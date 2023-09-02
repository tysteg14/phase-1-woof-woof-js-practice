document.addEventListener("DOMContentLoaded", (e) => {
    
    let pups = [];
    let filterOn = false;

    const filterButton = document.querySelector("#good-dog-filter");
    filterButton.addEventListener("click", () => {
        filterOn = !filterOn
        if (filterOn) {
            filterButton.innerText = "Filter good dogs: On"
        } else {
            filterButton.innerText = "Filter good dogs: OFF"
        }
        const filteredPups = pups.filter(pup => {
            if (filterOn) {
                return pup.isGoodDog
            } else {
                return true;
            }
        })
        
        let pupsList = document.querySelector("#dog-bar")
        pupsList.innerHTML = ""
        renderPups(filteredPups)
    })


    fetch("http://localhost:3000/pups") 
        .then(resp => resp.json())
        .then(data => {
            pups = data
            renderPups(data)
        })

    function renderPups(pupsArray) {
            
        let pupsList = document.querySelector("#dog-bar")
          
            
        pupsArray.forEach(pup => {
            let pupsSpan = document.createElement("span")
            pupsSpan.innerText = pup.name
              
            pupsList.append(pupsSpan)
          
            pupsSpan.addEventListener('click', () => {
          
                let dogInfo = document.querySelector("#dog-info")
          
                dogInfo.innerHTML = `
                  <img src=${pup.image}>
                  <h2>${pup.name}</h2>
                  <button>${pup.isGoodDog} Dog!</button>
                `
                const button = dogInfo.querySelector("button")
          
                if (pup.isGoodDog === true) {
                  button.innerText = "Good Dog!"
                } else {
                  button.innerText = "Bad Dog!"
                }
          
                
                button.addEventListener("click", () => {
                  pup.isGoodDog = !pup.isGoodDog
                  const updatedDogInfo = { isGoodDog: pup.isGoodDog }
          
                  
                  fetch(`http://localhost:3000/pups/${pup.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                    },
                    body: JSON.stringify(updatedDogInfo)
                  })
                    .then(r => r.json())
                    .then(newPupInfo => {
                      if (newPupInfo.isGoodDog === true) {
                        button.innerText = "Good Dog!"
                      } else {
                        button.innerText = "Bad Dog!"
                      }
                    })
          
                })
          
          
            })
        })
    }
})