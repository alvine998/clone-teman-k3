import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="TemanK3" />
        <meta name="author" content="Sandri Ranto" />
        <meta name="generator" content="Sancode" />
        <link rel="shortcut icon" href="https://temank3.kemnaker.go.id/public/images/logo-kemnaker.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="https://temank3.kemnaker.go.id/public/themes/website/asset/favicons/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="https://temank3.kemnaker.go.id/public/themes/website/asset/favicons/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="https://temank3.kemnaker.go.id/public/themes/website/asset/favicons/favicon-16x16.png" />
        <link rel="mask-icon" href="https://temank3.kemnaker.go.id/public/themes/website/asset/favicons/safari-pinned-tab.svg" color="#2b5797" />
        <title>Beranda TemanK3</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
