import React, { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator = () => {
    const [length,setLength] = useState(8);
    const [numberAllow,setNumberAllow] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password,setPassword] = useState('');
    const passwordRef = useRef(null);


   const passwordGenerator = useCallback(()=>{ 
   
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllow){
          str +="0123456789";
      }
             
      if(charAllowed){
          str += "!@#$%^&*()[]{}~`";
      }
      for (let index = 0; index < length; index++) {
           let char = Math.floor(Math.random() * str.length + 1)
            pass +=str.charAt(char);
      }
      setPassword(pass);  
   },[length,numberAllow,charAllowed,setPassword])
  
    const passwordGenerators = useEffect(()=>{
         passwordGenerator();
    },[length,numberAllow,charAllowed,setPassword])


    const copyPasswordToClick = useCallback(()=>{
          passwordRef.current?.select();
          passwordRef.current?.setSelectionRange(0,10);
          window.navigator.clipboard.writeText(password);
    },[password])

   return (
    <>
          <div className='w-full max-w-md mx-auto shadow-md rounded-lg
          px-4 my-8 text-orange-600 bg-gray-600'>
            <h1 className='text-white text-center text-2xl'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4 px-4 py-5'>
                 <input 
                 type='text'
                 value={password}
                 className='outline-none w-full py-1 px-3'
                 placeholder='password'
                 onChange={(e)=>setPassword(e.target.value)}
                 readOnly
                 ref={passwordRef}
                  />   
                <button 
                  className='outline-none bg-blue-600 rounded-e-lg
                   text-white px-3 py-0.5 shrink-0 hover:bg-blue-300'
                    onClick={copyPasswordToClick}>
                    Copy
                </button> 
            </div>
            <div className='flex text-sm gap=x-2'>
              <div className='flex items-center gap-x-1'>
                  <input 
                   type='range'
                   max={100}
                   min={6}
                   value={length}
                   onChange={(e)=>setLength(e.target.value)}
                   className='cursor-pointer'
                  />
                  <label>Length {length}</label>
                  <div className='flex items-center gap-x-1'>
                        <input 
                        type='checkbox'
                        defaultChecked={numberAllow}
                        id='numberInput'
                        onChange={()=>{
                              setNumberAllow((prev) => !prev)
                           }}
                        />
                  </div>
                  <label>Numbers</label>
                  <div className='flex items-center gapx-1'>

                      <input 
                      type='checkbox'
                       defaultChecked={charAllowed}
                       id='charInput'
                       onChange={()=>{setCharAllowed((prev)=>!prev)}}
                      />
                    <label>Charactres</label>
                  </div>
               </div>                 
            </div>
          </div>
    </>
  )
}

export default PasswordGenerator;