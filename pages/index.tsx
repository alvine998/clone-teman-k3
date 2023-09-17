import Image from 'next/image'
import { Inter } from 'next/font/google'
import {redirect} from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react';


export default function Home() {
    const router = useRouter();

    useEffect(()=>{
      if(router.pathname == "/"){
        router.push("/page/cek_personel")
      }
    },[])
}
