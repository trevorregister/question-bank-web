import { defineConfig } from '#q-app/wrappers'

export default defineConfig((ctx) => { // can be async too
  console.log(ctx)

  // Example output on console:
  /*
  {
    dev: true,
    prod: false,
    mode: { spa: true },
    modeName: 'spa',
    target: {},
    targetName: undefined,
    arch: {},
    archName: undefined,
    debug: undefined
  }
  */

  // context gets generated based on the parameters
  // with which you run "quasar dev" or "quasar build"

  return {
    framework: {
      config: {
        brand: {
          primary: '#1976d2',
          secondary: '#26A69A',
          accent: '#9C27B0',
  
          dark: '#1d1d1d',
          'dark-page': '#121212',
  
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037'
        }
      }
    }
  }
})