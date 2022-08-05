class UI{

    reserveParagraph(){
        const resPara = [
            `
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non blanditiis error obcaecati. Debitis eveniet, iste eius, hic amet omnis provident ratione nostrum dolor placeat saepe sit suscipit, aperiam nihil libero assumenda quis modi itaque optio perferendis laboriosam! Tenetur quod possimus cumque fugiat ducimus. Atque recusandae natus cum eaque saepe aut voluptate! Dolore rem quae dignissimos adipisci quibusdam possimus doloribus deleniti Lorem ipsum dolor sit amet consectetur adipisicing elit. At illo quibusdam quasi, voluptas in dolor quo obcaecati et quaerat veniam ea illum commodi eius doloremque vitae molestias, iure corporis optio aspernatur id! Repudiandae ab incidunt molestias inventore pariatur odio illo velit temporibus quo, quos assumenda, neque cumque iusto debitis aperiam fugit laborum illum, officia praesentium suscipit ducimus dolorem veritatis. Facilis.
            `,
            `
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic debitis cum porro odio facere numquam voluptates voluptatibus voluptatem. Obcaecati voluptates odio nam vero repellendus magnam iure, doloribus ipsum dolore ex delectus hic blanditiis voluptatem laudantium at deserunt ea sunt veritatis praesentium dolorum iste. Quisquam, soluta distinctio fugit maiores ducimus hic at nemo, expedita voluptates veritatis, deserunt suscipit quae autem aut quis nesciunt perferendis! Corporis excepturi quaerat, repellat numquam vero tempore esse sit?
            `,
            `
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti, cum eaque corrupti aperiam alias quasi non sapiente reiciendis beatae sunt quam blanditiis, dolor repellat atque cumque reprehenderit. Magni, asperiores maxime! In minima soluta quos dolor voluptatem aliquam dolore? Recusandae eius quia quos quidem corporis laborum totam, inventore suscipit voluptatem facilis consequuntur porro neque nostrum?
            `
        ]

        return resPara
    }

    allSelectors(){
        const greetingsCard = document.querySelector('.grettingsCard')
        const startBtnElem = document.querySelector('#startBtn')
        const completeLineElm = document.querySelector('.completeLine')
        const typingCardElm = document.querySelector('.typingCard')
        const typingWordElm = document.querySelector('.typingWords')
        const typedWordElm = document.querySelector('#typedWord')
        const mistakesElm = document.querySelector('.mistake')
        const typingTime = document.querySelector('.typeTime')
        const typingRes = document.querySelector('.typingRes')
        const accurateWord = document.querySelector('.accurateWrd')

        return{
            greetingsCard,
            startBtnElem,
            completeLineElm,
            typingWordElm,
            typedWordElm,
            mistakesElm,
            typingTime,
            typingCardElm,
            typingRes,
            accurateWord
        }
    }

    init(){
        
        
        const {startBtnElem, greetingsCard, typingCardElm, typedWordElm, typingWordElm, typingRes, mistakesElm, typingTime} = this.allSelectors()
        let type = 0
        let timer = ''
        let time = 0
        let quote = ''
        let mistakes = 0
        
            
                // this.calCulateTime(time)
            

        startBtnElem.addEventListener('click', () => {
            document.querySelector('.completeLine').style.width = `0%`
            greetingsCard.style.display = 'none'
            typingCardElm.style.display = 'block'
            const newPara = this.getRandomPara()
            // console.log(newPara);

            
            
            // console.log(newPara);
            let arr = newPara.map( elem => {
                return "<span class='wordChar'>" + elem + "</span>"
            })
            typingWordElm.innerHTML = arr.join('')

                const date = new Date()
                const startMin = date.getMinutes()
                const startSec = date.getSeconds()
                // console.log(startMin, startSec);

            typedWordElm.addEventListener('input', () => {
                
                let wordCharsElm = document.querySelectorAll('.wordChar');
                wordCharsElm = Array.from(wordCharsElm)
                let userWord = typedWordElm.value.split('')
                wordCharsElm.forEach( (word, i) => {
                    if(word.textContent == userWord[i]){
                        word.classList.add('success')
                    }else if(userWord[i] == null){
                        if(word.classList.contains('success')){
                            word.classList.remove('success')
                        }else{
                            word.classList.remove('fail')
                        }
                    }else{
                        if(!word.classList.remove('fail')){
                            word.classList.add('fail')
                            mistakes += 1
                        }
                        mistakesElm.textContent = `${mistakes} times`
                    }

                })
                let checkAllWord = wordCharsElm.every( elem => {
                    return elem.classList.contains('success')
                })
                if(checkAllWord){
                    const eDate = new Date()
                    const endMin = eDate.getMinutes()
                    const endSec = eDate.getSeconds()
                    // console.log(endMin, endSec);
                    typingRes.style.display = 'block'
                    const {
                        minDiff,
                        secDiff
                    } =this.calculateTimeDiff(startMin, startSec, endMin, endSec)
                    document.querySelector('.typeTime').textContent = `${minDiff} mins ${secDiff} s`
                    document.querySelector('#close').addEventListener('click', () => {
                        document.querySelector('.typingRes').style.display = 'none'
                    })
                }
                // this.calCulateTime()
                
            })

            typedWordElm.addEventListener('keyup', () => {
                this.calculateWordCompare()
            })
                
            // this.calCulateTime(time, timer)
        })
      
        
    }


   calculateWpn(minDiff, secDiff){
        let totalSecs = 0
        let minToSecs = 0
        let secsToMins = 0
        if(minDiff > 0){
            minToSecs = minDiff*60
            totalSecs = minToSecs+secDiff
            secsToMins = totalSecs/60
        }else{
            totalSecs = secDiff
            secsToMins = totalSecs/60
        }

        // let secsToMins = minToSecs/60
        console.log(totalSecs);
        console.log(`secstomin ${secsToMins}`);
        const succsTextLength = document.querySelector('.typingWords').textContent.split(' ').length
        const wpm = succsTextLength / secsToMins
        document.querySelector('.accurateWrd').textContent = wpm
   }
    
    calculateTimeDiff(startMin, startSec, endMin, endSec){
        let minDiff = 0
        let secDiff = 0
        // calculating different of minutes
        if(startMin > endMin){
            minDiff = startMin-endMin
        }else{
            minDiff = endMin-startMin
        }
        // calculating different of seconds
        if(startSec > endSec){
            secDiff = startSec-endSec
        }else{
            secDiff = endSec-startSec
        }
        this.calculateWpn(minDiff, secDiff)
        return {
            minDiff,
            secDiff,
            
        }
    }
    

    getRandomPara(){
        const resPara = this.reserveParagraph()
        let randNum = 0
        let randPara = resPara[randNum].split('')
        // console.log(randPara);
        let newPara = randPara.slice(13, 1197)
        // console.log(newPara);

        for(let i = 0; i < resPara.length; i++){
            randNum = Math.floor(Math.random() * resPara.length)
        }
        
        return newPara
    }

    calculateWordCompare(){
        const wordLength = document.querySelector('.typingWords').textContent.split(' ').length
        const typedWordLength = document.querySelector('#typedWord').value.split(' ').length
        const parcent = (typedWordLength*100)/wordLength
        document.querySelector('.completeLine').style.width = `${parcent}%`
    }

}

const ui = new UI()

export default ui