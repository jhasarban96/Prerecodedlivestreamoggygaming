import React, { useState, useRef, useEffect } from 'react';
import { Upload, Link, Play, StopCircle } from 'lucide-react';

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStatus, setStreamStatus] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const startStream = () => {
    if (videoFile && streamUrl && streamKey) {
      setIsStreaming(true);
      setStreamStatus('Connecting to server...');
      simulateStreaming();
    } else {
      alert('Please fill in all fields before starting the stream.');
    }
  };

  const stopStream = () => {
    setIsStreaming(false);
    setStreamStatus('Stream stopped');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const simulateStreaming = () => {
    setTimeout(() => {
      setStreamStatus('Connected to server');
    }, 2000);

    setTimeout(() => {
      setStreamStatus('Stream started');
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 4000);
  };

  useEffect(() => {
    if (isStreaming && videoRef.current) {
      videoRef.current.play();
    }
  }, [isStreaming]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">24/7 Livestream</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Video
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="video/*" />
                </label>
              </div>
              {videoFile && <p className="mt-2 text-sm text-gray-500">{videoFile.name}</p>}
            </div>
            
            <div>
              <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Stream URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <Link className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="streamUrl"
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="rtmp://example.com/live"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="streamKey" className="block text-sm font-medium text-gray-700 mb-1">
                Stream Key
              </label>
              <input
                type="text"
                id="streamKey"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="your-stream-key"
                value={streamKey}
                onChange={(e) => setStreamKey(e.target.value)}
              />
            </div>
            
            {!isStreaming ? (
              <button
                onClick={startStream}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Stream
                <Play className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Stop Stream
                <StopCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          {streamStatus && (
            <div className="mt-4 p-2 bg-gray-100 rounded-md">
              <p className="text-sm font-medium text-gray-700">{streamStatus}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 p-4 flex items-center justify-center">
        {isStreaming && videoFile && (
          <div className="w-full h-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto max-h-full object-contain"
              src={URL.createObjectURL(videoFile)}
              loop
              muted
              playsInline
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;