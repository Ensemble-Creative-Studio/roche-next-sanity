import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '../app/(user)/components/header'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/transition.css';

import Transition from '../components/transition';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>

          <Header /> 
          <Transition>
          <Component {...pageProps} />
          </Transition>

    </div>

  )
 
}

export default MyApp
