import React from 'react'
import {  Html5QrcodeScanType, Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState } from 'react';
const Html5 =() =>{
    const [scanResult,setScanResult] = useState(null)
    const formatsToSupport = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.CODE_128
    ];
    useEffect(()=>{
      const success = (result:any) =>{
        html5QrcodeScanner.clear();
        setScanResult(result);
      }
    
      const error = (err:any) =>{
        console.warn(err)
      }
    
      const html5QrcodeScanner = new Html5QrcodeScanner( "reader",  
      {
        fps: 10,
        qrbox: {width: 250, height: 250},
        rememberLastUsedCamera: true,
        formatsToSupport:formatsToSupport
      },false);
      html5QrcodeScanner.render(success,error);
    
    },[])
  
  
  return (
    <div> 
        {scanResult 
        ? <div>Success: <a>{scanResult}</a></div>
        : <div id ="reader"></div>
        }
    </div>
  )
}

export default Html5;