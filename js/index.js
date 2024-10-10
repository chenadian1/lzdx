
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// if (SpeechRecognition) {
//     const recognition = new SpeechRecognition();
//     const voiceBtn = document.querySelector('.voiceBtn');
//     const inputField = document.querySelector('.searchInput');
//     let isRecording = false; // 添加一个变量来跟踪录音状态

//     recognition.intermediateResults = true; // 这里应该是 interimResults -> interimResults
//     recognition.lang = 'zh-CN';

//     voiceBtn.addEventListener('click', () => {
//         if (!isRecording) { // 使用 isRecording 变量来检查是否正在录音
//             recognition.start();
//             isRecording = true; // 更新录音状态
            
//             // 设置定时器，在三秒后停止语音识别
//             setTimeout(() => {
//                 recognition.stop();
//                 isRecording = false; // 更新录音状态
//                 voiceBtn.classList.remove('active'); // 移除按钮的激活状态
//             }, 3000); // 3000毫秒后执行
            
//             console.log('点击了语音按钮');
//             voiceBtn.classList.add('active'); // 添加按钮的激活状态
//         } else {
//             recognition.stop();
//             isRecording = false; // 更新录音状态
//             voiceBtn.classList.remove('active'); // 如果正在录音，则停止并移除激活状态
//         }
//     });

//     recognition.addEventListener('result', (event) => {
//         const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');

//         if (event.results[0].isFinal) {
//             inputField.value = transcript.replace(/[。！？]$/, '');
//             // 这里不需要再次移除 'active' 类，因为点击按钮时已经处理过了
//         }
//     });

//     recognition.addEventListener('error', (event) => {
//         console.error('Recognition error:', event.error);
//         isRecording = false; // 如果发生错误，确保更新录音状态为 false
//         voiceBtn.classList.remove('active');
//     });
// } else {
//     console.log('该浏览器不支持语音识别功能');
// }

document.querySelectorAll('.heart').forEach(item=>{
    item.addEventListener('click',()=>{
        item.classList.toggle('active')
    })
})

document.querySelector('.voiceSearchBtn').addEventListener('click',()=>{
    if(document.querySelector('.searchInput').value == "兰州大学文创笔记本"){
        location.href = "notebook.html"
    }
})




window.onload = function () {
    const voiceTxt = document.querySelector('#voice-txt');
    const startBtn = document.querySelector('#start-btn');
    // const fixedBox = document.querySelector('#fixed-box');
    // const fixedTxt = document.querySelector('#fixed-txt');
    // const closeBtn = document.querySelector('#close-btn');
    let times = null;

    // 实例化迅飞语音听写（流式版）WebAPI
    const xfVoice = new XfVoiceDictation({

        // 服务接口认证信息 注：APISecret 和 APIKey 的长度都差不多，请要填错哦，！
        APPID: '38cf7705',
        APISecret: 'YWJjYThiMzgwYzNkZWJiNjQzMDBjZTdi', 
        APIKey: '47988d3fdd3e463603494abbbf0b549c',
        // 注：要获取以上3个参数，请到迅飞开放平台：https://www.xfyun.cn/services/voicedictation 【注：这是我的迅飞语音听写（流式版）每天服务量500（也就是调500次），如果你需求里大请购买服务量：https://www.xfyun.cn/services/voicedictation?target=price】

        // webSocket请求地址 非必传参数，默认为：wss://iat-api.xfyun.cn/v2/iat
        // url: '',


        onWillStatusChange: function (oldStatus, newStatus) {
            //可以在这里进行页面中一些交互逻辑处理：注：倒计时（语音听写只有60s）,录音的动画，按钮交互等！
            // fixedBox.style.display = 'block';
        },
        onTextChange: function (text) {
            //监听识别结果的变化
            voiceTxt.value = text.replace(/[。！？]$/, '');
            // fixedTxt.innerText = text;

            // 3秒钟内没有说话，就自动关闭
            if (text) {
                clearTimeout(times);
                times = setTimeout(() => {
                    this.stop(); // xfVoice.stop();
                    startBtn.classList.remove("active")
                }, 3000);
            };
        }
    });

    // 开始识别
    startBtn['onclick'] = function () {
        xfVoice.start();
        startBtn.classList.add("active")
    };

    // // 关闭识别
    // closeBtn['onclick'] = function () {
    //     xfVoice.stop();
    //     fixedBox.style.display = 'none';
    // };
};
