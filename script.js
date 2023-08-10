const track = document.getElementById("slider");

const handleOnDown = (e) => 
    track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = 
        parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = 
            parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage =
            Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translateX(${nextPercentage}%)`
    }, { duration: 1200, fill: "forwards" });
}

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
