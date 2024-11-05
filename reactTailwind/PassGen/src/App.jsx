import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  //ref hook
  const passwordRef = useRef(null)

  const passGenerator = useCallback(() =>{
    let pass =  ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (char) str += "!@#$%^&*()_+={}[]~`" 

    for (let i = 1; i <= length; i++){
      let character = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(character)
    }

    setPassword(pass)

  }, [length, numAllowed, char, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGenerator()
    
  }, [length, numAllowed, char, passGenerator])

  return (
    <>

    <div className='w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-800'>
      <h1 className='flex text-white justify-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-300 text-white px-3 py-0.5 shrink-0'
        >Copy</button>

      </div>
      <div className='flex text-sm gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>

        
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked = {numAllowed}
        id='numberInput'
        onChange={() => {setNumAllowed((prev) => !prev)}}
        />
        <label htmlFor="numberInput">Numbers</label>

          
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked = {char}
        id='charInput'
        onChange={() => {setChar((prev) => !prev)}}
        />
        <label htmlFor="charInput">Character</label>
      </div>
      </div>
      </div>
      </div>  
    </>
  )
}

export default App
