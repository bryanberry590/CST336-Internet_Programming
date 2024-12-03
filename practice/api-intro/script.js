displayMovieData();

async function displayMovieData() {
    let url = "https://www.omdbapi.com/?apikey=12215ee6&s=beetlejuice";

    let response = await fetch(url);
    
    let data = await response.json();

    // for(let i of data.Search) {
    //     let h1Element = document.createElement("h1");
    //     h1Element.innerText = i.Title;

    //     document.querySelector("#movies").appendChild(h1Element);

    //     let imgElement = document.createElement("img");
    //     imgElement.src = i.Poster;

    //     document.querySelector("#movies").appendChild(h1Element);
    //     document.querySelector("#movies").appendChild(imgElement);
    // }
    for(let i = 0; i < data.Search.length; i++) {
        let h1Element = document.createElement("h1");
        h1Element.innerText = data.Search[i].Title;

        document.querySelector("#movies").appendChild(h1Element);

        let imgElement = document.createElement("img");
        imgElement.src = data.Search[i].Poster;

        document.querySelector("#movies").appendChild(h1Element);
        document.querySelector("#movies").appendChild(imgElement);
    }
}