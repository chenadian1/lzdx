
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const voiceBtn = document.querySelector('.voiceBtn');
    const inputField = document.querySelector('.searchInput');
    let isRecording = false; // 添加一个变量来跟踪录音状态

    recognition.interimResults = true; // 这里应该是 interimResults -> interimResults
    recognition.lang = 'zh-CN';

    voiceBtn.addEventListener('click', () => {
        if (isRecording) { // 使用 isRecording 变量来检查是否正在录音
            recognition.stop();
            isRecording = false; // 更新录音状态
        } else {
            recognition.start();
            isRecording = true; // 更新录音状态
        }
        console.log('点击了语音按钮');
        voiceBtn.classList.toggle('active');

    });

    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (event.results[0].isFinal) {
            inputField.value = transcript.replace(/[。！？]$/, '');
            // 这里不需要再次移除 'active' 类，因为点击按钮时已经处理过了
        }
    });

    recognition.addEventListener('error', (event) => {
        console.error('Recognition error:', event.error);
        isRecording = false; // 如果发生错误，确保更新录音状态为 false
        voiceBtn.classList.remove('active');
    });
} else {
    console.log('该浏览器不支持语音识别功能');
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
