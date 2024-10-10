
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const voiceBtn = document.querySelector('.voiceBtn');
    const inputField = document.querySelector('.searchInput');

    recognition.interimResults = true
    recognition.lang = 'zh-CN'

    voiceBtn.addEventListener('click', () => {
        if (recognition.isRecognizing) {
            recognition.stop()
        } else {
            recognition.start()
            voiceBtn.classList.add('active')
        }
    });

    recognition.addEventListener('start', () => {
        recognition.isRecognizing = true
    });

    recognition.addEventListener('end', () => {
        recognition.isRecognizing = false
        voiceBtn.classList.remove('active')
    });

    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (event.results[0].isFinal) {
            // 去掉最后的标点符号
            inputField.value = transcript.replace(/[。！？]$/, '')
            voiceBtn.classList.remove('active')
        }
    });

    recognition.addEventListener('error', (event) => {
        console.error('Recognition error:', event.error)
        voiceBtn.classList.remove('active')
    });
} else {
    console.error("该浏览器不支持语音识别功能")
}

document.querySelectorAll('.heart').forEach(item=>{
    item.addEventListener('click',()=>{
        item.classList.toggle('active')
    })
})

document.querySelector('.voiceSearchBtn').addEventListener('click',()=>{
    if(document.querySelector('.searchInput').value == "兰大文创笔记本"){
        location.href = "notebook.html"
    }
})