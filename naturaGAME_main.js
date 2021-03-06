// Slider(all Slides in a container)
const slider = document.querySelector(".slider")
// All trails 
const trail = document.querySelector(".trail").querySelectorAll("div")
// const trail = new Array(8);

// Transform value
let value = 0
// trail index number
let trailValue = 0
// interval (Duration)
let interval = 4000

//////////////////////////////////////////////////////////////
// Testing Inaturalist API 
///////////////////////////////////////////////////////////////

const observations = new Array();

const observation_urls = [
    "https://api.inaturalist.org/v1/observations/59624529",
    "https://api.inaturalist.org/v1/observations/122860819",
    "https://api.inaturalist.org/v1/observations/122860887",
    "https://api.inaturalist.org/v1/observations/112780889",
    "https://api.inaturalist.org/v1/observations/122850889",
    "https://api.inaturalist.org/v1/observations/122760889",
    "https://api.inaturalist.org/v1/observations/122850829",
    "https://api.inaturalist.org/v1/observations/122861889",
];

observation_urls.forEach( (url, index) => {
    fetch(url)
    .then( response => response.json())
    .then( new_observation_json => {
        observations.push(new_observation_json);
        createCard(new_observation_json, index + 1);
    });
});

const createCard = (observation, card_position) =>
{
    // console.log(observation)
    const card = document.querySelector(".box" + card_position);
    // card.querySelector(".illustration > .inner").style.backgroundImage = "url('" + observation.results[0].community_taxon.default_photo.medium_url + "'";
    // card.querySelector(".illustration > .inner").insertAdjacentHTML("afterbegin", "<img src='" + observation.results[0].community_taxon.default_photo.medium_url + "'>");
    const obs_img = document.createElement("img");
    obs_img.src = observation.results[0].community_taxon.default_photo.medium_url;
    // obs_img.classList.add("inner");
    card.querySelector(".illustration > .inner").insertAdjacentElement("afterbegin", obs_img);
    // card.querySelector(".illustration > .inner").replaceWith(obs_img);
    // card.querySelector(".illustration > .inner").style.backgroundSize = "cover";
    card.querySelector(".details > h1").innerText = observation.results[0].community_taxon.name;
    card.querySelector(".details > p").innerText = observation.results[0].place_guess;
}

//////////////////////////////////////////////////////////////
// 
///////////////////////////////////////////////////////////////

// Function to slide forward
const slide = (condition) => {
    // CLear interval
    clearInterval(start)
    // update value and trailValue
    condition === "increase" ? initiateINC() : initiateDEC()
    // move slide
    move(value, trailValue)
    // Restart Animation
    animate()
    // start interal for slides back 
    start = setInterval(() => slide("increase"), interval);
}

// function for increase(forward, next) configuration
const initiateINC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // increase transform value
    value === 87.5 ? value = 0 : value += 12.5
    // update trailValue based on value
    trailUpdate()
}

// function for decrease(backward, previous) configuration
const initiateDEC = () => {
     // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // decrease transform value
    value === 0 ? value = 87.5 : value -= 12.5
     // update trailValue based on value
    trailUpdate()
}

// function to transform slide 
const move = (S, T) => {
    // transform slider
    slider.style.transform = `translateX(-${S}%)`
    //add active class to the current trail
    trail[T].classList.add("active")
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".bg", {x: "-100%", opacity: 0})
  .from("p", {opacity: 0}, "-=0.3")
  .from("h1", {opacity: 0, y: "30px"}, "-=0.3")
  .from("button", {opacity: 0, y: "-40px"}, "-=0.8")

// function to restart animation
const animate = () => tl.restart()

// function to update trailValue based on slide value
const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 12.5) {
        trailValue = 1
    } else if (value === 25) {
        trailValue = 2
    } else if (value === 37.5) {
        trailValue = 3
    } else if (value === 50) {
        trailValue = 4
    } else if (value === 62.5) {
        trailValue = 5
    } else if (value === 75) {
        trailValue = 6
    } else {
        trailValue = 7
    }
}   

// Start interval for slides
let start = setInterval(() => slide("increase"), interval)

// Next  and  Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name("next" and "prev")
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
})

// function to slide when trail is clicked
const clickCheck = (e) => {
    // CLear interval
    clearInterval(start)
    // remove active class from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // Get selected trail
    const check = e.target
    // add active class
    check.classList.add("active")

    // Update slide value based on the selected trail
    if(check.classList.contains("box1")) {
        value = 0
    } else if (check.classList.contains("box2")) {
        value = 12.5
    } else if (check.classList.contains("box3")) {
        value = 25
    } else if (check.classList.contains("box4")) {
        value = 37.5
    } else if (check.classList.contains("box5")) {
        value = 50
    } else if (check.classList.contains("box6")) {
        value = 62.5
    } else if (check.classList.contains("box7")) {
        value = 75
    } else {
        value = 87.5
    }
    // update trail based on value
    trailUpdate()
    // transfrom slide
    move(value, trailValue)
    // start animation
    animate()
    // start interval
    start = setInterval(() => slide("increase"), interval)
}

// Add function to all trails
trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth/trail.length
    })
    
    // Do this on touchDrag on screen
    slider.addEventListener("touchmove", (e) => {
        // prevent default function
        e.preventDefault()
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move
    })

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > (sliderWidth/4)  ? slide("increase") : null;
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    // call mobile on touch end
    slider.addEventListener("touchend", mobile)
})()