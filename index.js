const viewer = new Marzipano.Viewer(document.querySelector("#pano"))

const source = Marzipano.ImageUrlSource.fromString(
  "tiles/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: "tiles/preview.jpg" })

const levels = [
  { tileSize: 256, size: 256, fallbackOnly: true },
  { tileSize: 512, size: 512 },
  { tileSize: 512, size: 1024 },
  { tileSize: 512, size: 2048 }
]

const geometry = new Marzipano.CubeGeometry(levels)

const limiter = Marzipano.RectilinearView.limit.traditional(4096, 100*Math.PI/180)
const view = new Marzipano.RectilinearView(null, limiter)

const scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
})

scene.switchTo()


const container = scene.hotspotContainer()
const iframe = document.querySelector(".iframe")

container.createHotspot(
  iframe,
  { yaw: 0, pitch: -0.15 },
  { perspective: { radius: 1750, extraTransforms: "rotateX(4deg)" }}
)


const content = document.querySelector(".content")
const messageStart = document.querySelector(".message-start")
const messageContinue = document.querySelector(".message-continue")
const messageHiding = document.querySelector(".message-hiding")

let isContentVisible = false
let hideTimeout
var total = 15

function toggleContent() {
  if (messageStart.classList.contains("hidden")) {
    messageContinue.classList.toggle("hidden")
  }
  isContentVisible = true
  messageStart.classList.add("hidden")
  content.classList.toggle("hidden")
}

function hideContent() {
  if (isContentVisible) {
    hideTimeout = setTimeout(() => {
      messageHiding.classList.toggle("hidden")
      messageContinue.classList.toggle("hidden")
      content.classList.toggle("hidden")
      isContentVisible = false
    }, 1500)

    messageHiding.classList.toggle("hidden")

    var sec = 15
    var countDown = setInterval(function() {
      sec--
      messageHiding.innerHTML = `ПАУЗА ЧЕРЕЗ: ${sec}`
      if (sec === 0) { clearInterval(countDown) }
    }, 100)

  }
}

function unideContent() {
  clearTimeout(hideTimeout)
  if (!messageHiding.classList.contains("hidden")) {
    messageHiding.classList.toggle("hidden")
  }
}


iframe.addEventListener("click", toggleContent)
iframe.addEventListener("mouseleave", hideContent)
iframe.addEventListener("mouseover", unideContent)
