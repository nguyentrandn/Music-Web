const $$ = document.querySelector.bind(document)
const $$$ = document.querySelectorAll.bind(document)

const heading = $$(".music-name label")
const imgThumb = $$(".img_backgound")
const audio = $$("#audio")
const playBtn = $$(".btn-play")
const player = $$("#player")
const progress = $$("#range")
const next = $$(".btn-next")
const prev = $$(".btn-prev")
const time = $$("#time")
const playList = $$(".menu-list")

const app = {
    currentIndex: 0,
    isPlay: false,
    songs: [
        {
            name: "Lemon Tree",
            path: "./song/lemontree.mp3",
            img: "./img/gif.gif"
        },
        {
            name: "Party",
            path: "./song/party.mp3",
            img: "./img/Waterfall.gif"
        },
        {
            name: "Cant help falling in love",
            path: "./song/canthelpfallinginlove.mp3",
            img: "./img/rain.gif"
        },
        {
            name: "Head In The Clouds",
            path: "./song/HeadInTheClouds.mp3",
            img: "./img/cat.gif"
        },
        {
            name: "Pope is a Rockstar",
            path: "./song/PopeisaRockstar.mp3",
            img: "./img/water.gif"
        },
        {
            name: "To the Moon",
            path: "./song/TOTHEMOON.mp3",
            img: "./img/moon.gif"
        },
    ],
    render: function () {
        const htmls = this.songs.map( (song, index) => {
            return `
                <li class="song-item ${index === this.currentIndex ? 'song-active' : ""}" data-index="${index}"> 
                    <img src="${song.img}" alt="" id="img" class="col col-1">
                    <label for="img"  class="col col-lg-8">${song.name}</label>
                    <div class="decription col-2"><ion-icon name="more"></ion-icon></div>
                </li>
            `
        })
        playList.innerHTML = htmls.join("")
    },
    defineProperties: function () {
        Object.defineProperty(this, 'curentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        }) //search defineProperty
    },

    loadcurrenSong: function () {
        heading.textContent = this.curentSong.name;
        imgThumb.style.backgroundImage = `url('${this.curentSong.img}')`;
        audio.src = this.curentSong.path;
    },
    handleEvents: function(){
        // Xu ly khi click Play
        playBtn.onclick = function(){
            if (app.isPlay) {
                audio.pause()
            } else {
                audio.play()
            }  
        }
        // Xử lí khi click vào dấu Space
        $(document).on('keypress', function(e) {
            if (e.which == 32) {
                if (app.isPlay) {
                    audio.pause()
                } else {
                    audio.play()
                }  
            }
        })
        // Khi bai Hat dc Play
        audio.onplay = function(){
            app.isPlay = true
            player.setAttribute("name", "pause");
        }
        // Khi bai Hat bi Pause
        audio.onpause = function(){
            app.isPlay = false
            player.setAttribute("name", "play-circle");
        }
        // thanh Range
        audio.ontimeupdate = function () {
            if (audio.duration) {
                // làm tròn theo %
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                
                time.innerHTML = Math.floor(audio.duration / 60) + ":00"
            }
        }
        
        //Xử lý khi tua 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        //khi Next Song 
        next.onclick = function(){
            app.nextSong()
            audio.play()
            app.render() // render lại để Active song trong List
        }
        //Khi Prev Song
        prev.onclick = function () {
            app.prevSong()
            audio.play()
            app.render() // render lại để Active song trong List

        }
        //Khi end song 
        audio.onended = function () {
            next.onclick()
        }
        // Click vào List Song
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song-item:not(.song-active)')
          if( songNode|| e.target.closest('.decription ')){
             
              // Xử lí khi click vào Song
              if (songNode) {
                  console.log(songNode.getAttribute('data-index'));
                  app.currentIndex = Number(songNode.getAttribute('data-index'))
                  app.loadcurrenSong()
                  app.render()
                  audio.play()
              }
              //Xử lí khi click vào dấu "..."
              if (e.target.closest('.decription ')) {
                  
              }
          };
        }

    },
    
    nextSong: function () {
        this.currentIndex ++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadcurrenSong()
    },
    prevSong: function () {
        this.currentIndex --
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1
        }
        this.loadcurrenSong()
    },
    start: function(){
        // Render Playlist
        this.render()

        this.defineProperties() // định nghĩa các thuộc tính trong Object

        //tải thông tin bài hát đầu tiên vào UI khi chạy Web
        this.loadcurrenSong()

        // Xu ly su kien
        this.handleEvents()
    }
}

app.start()