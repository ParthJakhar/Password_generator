import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberallowed,setNumberallowed]=useState(false);
  const [charallowed,setCharallowed]=useState(false);

  let [password,setPassword]=useState("");
//useRef hook
const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*(){}"
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
      
    }
    setPassword(pass);



  },[length,charallowed,numberallowed,setPassword])

 const copypasswordtoClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,999);
  // window.navigator.clipboard.writeText(password)
 },[password])

//useEffect Hook

useEffect(()=>{
  passwordGenerator()
},[length,numberallowed,charallowed,passwordGenerator])//dependency array of useEffect m vo methods jinme kuch bhi change hoga to rerun ho jaye method 
  
const copied=()=>{
  alert('copied');
}

return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-1 py-8 my-9 bg-gray-800 text-orange-500">
      <h2 className='text-white text-center my-3 '>Password generator</h2>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={copypasswordtoClipboard}
            className='outline-none bg-blue-700 '>  
              copy  
            </button>
         </div>
         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
            </div>
            <input
            type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={()=>{
              setNumberallowed((prev)=>!prev)
            }}
            />
            <label className='text-white'>Number</label>
            <input
            type="checkbox"
            defaultChecked={charallowed}
            id="charInput"
            onChange={()=>{
              setCharallowed((prev)=>!prev)
            }}
            
            />
            <label className='text-white'>Special Character</label>

         </div>
         
      </div>
     
     
    </>
    
  )
}

export default App
