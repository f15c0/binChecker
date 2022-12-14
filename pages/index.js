import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {

  const [input, setInput]= useState("");
  const [data, setData]= useState();
  const [obj, setObj]=useState()

 

  const handleSubmit=(e)=>{
     e.preventDefault(); 
     //console.log(input);
        axios.get(`https://api.paystack.co/decision/bin/${input}`)
        .then(res => {
          // console.log(res.data.data);
          setData(res.data.data);
          setInput("");  
          setObj(data)   
        })
        .catch(err => {
          console.error(err); 
        })
   
  }
  
      const handleInput=(e)=>{
            //console.log(e.target.value)
            setInput(e.target.value)
      }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>BinChecker | FisCod3r V 1.3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
              <header>
                  <h1>Bin-Checker</h1>
              </header>
              <form onSubmit={handleSubmit} className="bin-form">
                  <input className='bin' type="search" 
                     
                      onChange={(e)=>handleInput(e)}
                      value={input}
                      placeholder='Enter your bin' required
                      minLength={6}
                      maxLength={6}
                      />
                  <button type='submit'>Find</button>
                  <h5 >NB: <span style={{opacity:"50%"}}>First six digit of your card: eg: 414720</span> </h5>
              </form>

              <div>
                    {(obj)?(
                      
                        <div>
                          {console.log(obj)}
                            <table className='table-items'>
                              <thead className="table-head">
                                  <tr>
                                        <th>Bin</th>
                                        <th>Bank</th>
                                        <th>Brand</th>
                                        <th>Card Type</th>
                                        <th>Country</th>
                                        <th>Level</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                        <td>{obj.bin}</td>
                                        <td>{obj.bank}</td>
                                        <td>{obj.brand}</td>
                                        <td>{obj.card_type}</td>
                                        <td>{obj.country_name}</td>
                                        <td>{obj.sub_brand}</td>
                                </tr>
                              </tbody>
                             
                      
                            </table>
                        </div>
                          ):"Make a Search!"}
              </div>
             
        </div>
       
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.png" alt="Vercel Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
