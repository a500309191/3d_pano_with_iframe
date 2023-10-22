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
const iframe = document.querySelector("#iframe")

container.createHotspot(
  iframe,
  { yaw: 0, pitch: -0.15 },
  { perspective: { radius: 1750, extraTransforms: "rotateX(4deg)" }}
)

const src = "https://www.youtube.com/embed/k-ZXEDMEaew"
const content = `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`

function loadContent() {
  console.log("content loaded")
  iframe.innerHTML = content
}

iframe.addEventListener("click", loadContent)