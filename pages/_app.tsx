import '../styles/main.css'

import App from 'next/app'

export default class MyApp extends App
{
  public render(): JSX.Element
  {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}