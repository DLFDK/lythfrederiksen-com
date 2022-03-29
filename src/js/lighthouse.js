// console.log("Hello");
// lighthouse();
async function lighthouse(){
    const apiKey = "AIzaSyBHIHk-588ybweDebHePyn-oMyVmQUe1xU"
    const result = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=${apiKey}&url=https://www.mittinyhouse.dk/&strategy=mobile`).then(response => response.json());
    console.log(result);
}

// console.log(document.getElementById("perf-phone__ring-overlay").getTotalLength());
