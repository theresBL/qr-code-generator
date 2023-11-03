// This React component, specifically a custom hook named useQRCodeGenerator, is designed to facilitate the generation and downloading of QR codes. Initially, it utilizes the useState hook from React to manage three pieces of state: url (to store the input URL that will be converted into a QR code), qr (to store the generated QR code data URL), and showInput (a boolean to toggle the visibility of an input element in the UI). The hook exposes a method generateQRCode which utilizes the QRCode.toDataURL method to convert the provided URL into a QR code, applying specific styling options, and then updates the state with the generated QR code and hides the input. The downloadQRCode method allows users to download the generated QR code as a PNG file, prompting them to provide a filename and handling the download process via creating an anchor element in the DOM. Lastly, the repeatAction method resets the state to allow users to generate a new QR code. The hook returns an object containing the state variables and methods, enabling them to be utilized in the component where the hook is used.
import QRCode from 'qrcode'
import { useState } from 'react'

// Define a custom hook named useQRCodeGenerator
export const useQRCodeGenerator = () => {
  // Reactive State variable to store the input URL
  const [url, setUrl] = useState('')

  // Reactive State variable to store the generated QR code data URL
  const [qr, setQr] = useState('')

  // Reactive State variable to toggle the visibility of the input element - boolean value
  const [toggleInput, setToggleInput] = useState(true)



  // Function to generate a QR code from the input URL
  const generateQRCode = () => {
    if (url.trim() === '') {
      alert('Please enter a URL to create a QR code')
    } else {
      const options = {
        errorCorrectionLevel: 'H',
        color: {
          dark: '#333',
          light: '#f0ece2',
        },
      }
      QRCode.toDataURL(url, options, (error, dataUrl) => {
        if (error) {
          console.error(error)
        } else {
          setQr(dataUrl)
          setToggleInput(false)
        }
      })
    }
  }

  // Function to download the generated QR code as a PNG file
  const downloadQRCode = () => {
    if (qr) {
      const formattedFileName = formatFileName(urlToFileName(url))

      const downloadLink = createDownloadLink(formattedFileName, qr)
      document.body.appendChild(downloadLink)
      initiateDownload(downloadLink)
    }
  }

  const urlToFileName = (url) => {
    // Use a regex or any other method to extract a clean filename from the URL
    const filename = url.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()
    return filename + '.png'
  }

  // HINT 6: Format the filename to ensure it is filesystem-friendly.
  const formatFileName = (fileName) => {
    return fileName.replace(/\s/g, '_') + '.png'
  }
  // HINT 7: Create an anchor element to facilitate the download.
  const createDownloadLink = (formattedFileName, dataUrl) => {
    const downloadLink = document.createElement('a')

    // HINT 8: Set the necessary attributes on the anchor element to prepare it for download.
    downloadLink.href = dataUrl
    downloadLink.download = formattedFileName
    return downloadLink
  }

  // HINT 9: Append the anchor element to the document to make it interactable.
  const initiateDownload = (downloadLink) => {
    document.body.appendChild(downloadLink)

    // HINT 10: Programmatically trigger a click on the anchor element to initiate the download.
    downloadLink.click()

    // HINT 11: Remove the anchor element from the document after the download has been initiated.
    document.body.removeChild(downloadLink)
  }

  // Function to reset the state and allow generating a new QR code
  const repeatAction = () => {
    // Reset the url state to an empty string
    setUrl('')
    // Reset the qr state to an empty string
    setQr('')
    // Show the input element back to true :)
    setToggleInput(true)
  }


  // Return the state variables and functions to be used in the component
  return { url, setUrl, qr, toggleInput, generateQRCode, downloadQRCode, repeatAction }
}