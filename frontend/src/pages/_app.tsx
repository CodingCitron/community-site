import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Axios from 'axios'
import { AuthProvider } from '@/context/auth'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import { SWRConfig } from 'swr'
import axios from 'axios'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api"
  Axios.defaults.withCredentials = true

  const { pathname } = useRouter()
  const authRoutes = ["/register", "/login"]
  const authRoute = authRoutes.includes(pathname)

  const fetcher = async (url: string) => {
      try {
          const res = await axios.get(url)

          return res.data
      } catch (error: any) {
          throw error.response.data
      }
  }

  return (
    <>
      <Head>
        
      </Head>
      <SWRConfig
        value={{
          fetcher
        }}
      >
        <AuthProvider>
          {!authRoute && <Navbar />}
          <div className={authRoute ? "" : "pt-12 bg-gray-200 min-h-screen"}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </SWRConfig>
    </>
  )
}
 