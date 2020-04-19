const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache:true
})

server.get("/", function(req, res) {
    const about = {
      avatar_url: "https://avatars3.githubusercontent.com/u/6820969?s=400&u=a047032c5a2861280ac00929a45296dc9b1884b7&v=4",
      name: "Jeriel Zinga",
      role: "Developer Student",
      description: 'Programador em JavaScript e PHP e amante de tecnológia. Veja meus projetos em meu <a href="http://github.com/JerielZi" target="_blank" rel="noopener noreferrer">GitHub</a>',
      links: [
        {
          name:"Youtube", url :"https://www.youtube.com/channel/UCf-5IY2pq-M8ND-BBxbjB2w?view_as=subscriber"
        },
        {
          name:"Facebook", url:"https://www.facebook.com/jeriel.zinga"
        },
        {
          name:"LinkedIn", url:"https://www.linkedin.com/in/jeriel-zinga-198636176/"
        }
      ]
    }

  return res.render("about", {about})
})

server.get("/portfolio", function(req, res) {
  return res.render("portfolio", {items: videos })
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id    
  })

  if (! video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video})

})

server.listen(5000, function(){
  console.log("Server is running")
})