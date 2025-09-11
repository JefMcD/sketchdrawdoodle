import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { fileURLToPath, URL } from 'node:url'
import {dirname, resolve} from "path"

// Create __dirname manually (since we're in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`__dirname = ${__dirname}`)

/*
Goals

    Serve the React SPA (index.html) via a Django view 
    (so URL routing works and it can live under your normal / path).

    Let Django’s staticfiles system serve the built JS/CSS/fonts/etc.

    Avoid hardcoding build output paths that break 
    once you run collectstatic in Django
*/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5734, // The port number to serve Vue
    host: true, // Listen on all addresses
    open: true, // Auto-open browser
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django
        changeOrigin: true,
        secure: false
      }
    },
  },

  // Configure Vite so asset URLs are relative to where Django will serve them
  /*
  base: "/static/doodle_app/",  ??????
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  */
  
  resolve: {
    alias: {
      // src folder
      "@"           : resolve(__dirname, "./src"),

      // images and fonts are on absolute paths that mirror the Django static data file structure
      "@images"     : "/static/doodle_app/images", 
      "@fonts"      : "/static/doodle_app/fonts", 
 
      // styles
      "@scss"    : resolve(__dirname, "./src/static/doodle_app/scss"), // React components use scss partials
      "@css"     : resolve(__dirname, "./src/static/doodle_app/css"), // React components use scss partials

      // components
      "@components" : resolve(__dirname, "./src/components"),
      "@panels"     : resolve(__dirname, "./src/components/panels"),

      "@sections"   : resolve(__dirname, "./src/components/sections"),
      "@auth"       : resolve(__dirname, "./src/components/sections/authentication"),
      "@draw"       : resolve(__dirname, "./src/components/sections/draw"),
      "@profile"    : resolve(__dirname, "./src/components/sections/profile"),

      // svg icons
      "@svgIcons"   : resolve(__dirname, "./src/components/svgIcons"),
      "@navLinks"   : resolve(__dirname, "./src/components/svgIcons/navLinks"),
      "@socialIcons": resolve(__dirname, "./src/components/svgIcons/socialMedia"),

      // Forms
      "@forms"      : resolve(__dirname, "./src/components/forms"),
      "@authForms"  : resolve(__dirname, "./src/components/forms/authentication"),
      "@drawForms"  : resolve(__dirname, "./src/components/forms/draw"),
      "@profForms"  : resolve(__dirname, "./src/components/forms/profile"),
      
      "@tabs"       : resolve(__dirname, "./src/components/tabs"),

      // Context Providers
      "@providers"   : resolve(__dirname, "./src/providers"),
      
      // modules
      "@modules"    : resolve(__dirname, "./src/modules"),
    }
  },


  css: {
    preprocessorOptions: {
      scss: {
        // Every Daddy scss file in your app will automatically 
        // have these @use statements added before it's compiled.
        // as * means they're not namespaced so $turq-001 not theme.$turq-001
        //additionalData: `
        //  @use "@scss/_fonts.scss" as fonts;
        //  @use "@scss/_theme.scss" as theme;
        //`
      }
    }
  }
})
