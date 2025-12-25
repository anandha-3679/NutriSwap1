
import React, { useRef, useState, useCallback, useEffect } from 'react';

interface CameraScannerProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onCapture, onClose, isLoading }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setHasPermission(false);
      setError('Could not access camera. Please check permissions.');
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in">
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div className="px-4 py-2 bg-emerald-500/80 backdrop-blur-xl rounded-full text-white text-xs font-black uppercase tracking-widest">
          AI Food Scanner
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-slate-900 flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-10">
            <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-black mb-2">Analyzing Food Labels...</h3>
            <p className="text-emerald-300 font-medium">Checking ingredients for hidden sugars and chemicals.</p>
          </div>
        )}
        
        {hasPermission === false ? (
          <div className="text-white text-center p-10">
            <div className="text-6xl mb-6">📷</div>
            <h3 className="text-xl font-bold mb-4">{error}</h3>
            <button onClick={startCamera} className="px-6 py-3 bg-emerald-600 rounded-full font-bold">Try Again</button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            {/* Scanner UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-emerald-500/50 rounded-[3rem] relative">
                <div className="absolute inset-[-2px] border-4 border-emerald-500 rounded-[3rem] animate-pulse opacity-40"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl"></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-10 bg-gradient-to-t from-black to-transparent flex justify-center items-center gap-10">
        <button
          onClick={captureFrame}
          disabled={isLoading || hasPermission !== true}
          className="w-20 h-20 bg-white rounded-full p-1.5 border-4 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-90 transition-all disabled:opacity-50"
        >
          <div className="w-full h-full bg-white border-2 border-slate-900/10 rounded-full flex items-center justify-center">
             <div className="w-12 h-12 bg-slate-900/5 rounded-full"></div>
          </div>
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraScanner;
