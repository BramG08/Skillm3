
 const text = document.getElementById("js-text");
 const img = document.getElementById("js-img");

    let data = fetch("JsonFiles/gegevens.json").then(
        function(binnenGekomenData){
            return binnenGekomenData.json();
        }).then(function(echteData){
            console.log(echteData);
            text.innerHTML = echteData.text;
            img.src = echteData.img;
        }
    );
    console.log(data);