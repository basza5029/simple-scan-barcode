import  {useRef, useState } from 'react'
import { BarcodeDetector } from "barcode-detector/pure";




const  Scaner = () => {
    
    const video = useRef(null);
    const canvas = useRef(null);
    const [barcode,setBarcode] = useState("");
    const openCamera = () =>{
        navigator.mediaDevices.getUserMedia({video:{width:1280,height:720}})
        .then((stream)=>{
            video.current.srcObject= stream;
            video.current.play();

            const ctx = canvas.current.getContext('2d');
            const barcodeDetector = new BarcodeDetector({formats: ["qr_code","code_39","code_128","ean_13","upc_a"]});

            setInterval(()=>{
                canvas.current.width= video.current.videoWidth;
                canvas.current.height = video.current.videoHeight;
                ctx.drawImage(video.current,0,0,video.current.videoWidth,video.current.videoHeight);
                barcodeDetector.detect(canvas.current)
                .then(([data])=>{
                    if (data) {
                        setBarcode(data.rawValue);
                    }
                });
            },100);
        })
        .catch((err) => console.log(err))
    };


  return (
    <div>
        <button onClick={openCamera}>Open Camera</button>
        <div>
            <a>barcode = {barcode}</a>
        </div>
        <div>    
            <video ref={video} autoPlay muted hidden/>
            <canvas ref={canvas}/>
        </div>

        
    </div>
  )
}

export default Scaner;
