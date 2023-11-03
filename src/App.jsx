// App Component Explanation
// The App component serves as a user interface for generating and downloading QR codes, utilizing the custom hook useQRCodeGenerator which encapsulates the logic for QR code generation and management. When rendered, the component displays a title ("Technigo QR Code Generator") and conditionally renders either an input field and a "Generate" button or a generated QR code image, a "Download" button, and a "Repeat" button, based on the showInput state variable. If showInput is true, users can input a URL and generate a QR code by clicking the "Generate" button. Once generated, the input field and "Generate" button are replaced by the QR code image and additional buttons. The "Download" button triggers a download of the QR code image, and the "Repeat" button resets the UI to allow for generating a new QR code. The url, setUrl, qr, showInput, generateQRCode, downloadQRCode, and repeatAction variables and functions are derived from the useQRCodeGenerator hook, providing the necessary state and actions to manage the QR code generation process.
import { useQRCodeGenerator } from "./hooks/useQRCodeGenerator"

// Define the App component
export const App = () => {
  // Destructure variables, properties and methods from the useQRCodeGenerator hook that you imported above here :)
  const {
    url,
    setUrl,
    qr,
    toggleInput,
    generateQRCode,
    downloadQRCode,
    repeatAction,
  } = useQRCodeGenerator()

  // Return the JSX to render the component
  return (
    <div className='app'>
      {toggleInput ? (
        <div className='app-content'>
          <h1>Generate your own QR code</h1>
          <input
            type='text'
            placeholder='Enter URL: e.g http://www...'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={generateQRCode}>Generate Code</button>
        </div>
      ) : (
        <div className='img-and-buttons'>
          <h1>Your QR code:</h1>
          <img className='logo' src={qr} alt='QR Code' />
          <div className='buttons-div'>
            <button onClick={downloadQRCode}>Download QR code</button>
            <button onClick={repeatAction}>Generate new code</button>
          </div>
        </div>
      )}
    </div>
  )
}
